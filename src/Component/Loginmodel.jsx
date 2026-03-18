import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { axiosInstance } from "../config/api";
import logo from "../assets/gomzi.webp";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState("mobile"); // "mobile" | "otp"
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleClose = () => {
    setStep("mobile");
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    onClose();
  };

  if (!isOpen) return null;

  const getUserData = async () => {
    try {
      console.log("[LoginModal] Fetching user profile...");
      const response = await axiosInstance.get("/account/profile");
      if (response.data && response.data.data) {
        const userData = response.data.data;
        localStorage.setItem("user_info", JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      console.error("[LoginModal] getUserData error:", error);
    }
    return null;
  };

  const handleSendOtp = async () => {
    if (mobile.length === 10) {
      setLoading(true);
      console.log("[LoginModal] Sending OTP identifying mobile:", mobile);
      try {
        const response = await axiosInstance.post("/account/authorization", {
          mobile: mobile,
        });

        if (response.data && response.data.data) {
          setStep("otp");
          // If OTP is returned in response (common for testing/dev)
          if (response.data.data.OTP) {
            const otpStr = String(response.data.data.OTP);
            if (otpStr.length === 6) {
              setOtp(otpStr.split(""));
            }
          }
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("[LoginModal] handleSendOtp error:", error.response?.data || error.message);
        toast.error(`Error: ${error.response?.data?.message || "Something went wrong."}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyAndLogin = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setLoading(true);
      console.log("[LoginModal] Verifying OTP:", otpCode);
      try {
        const response = await axiosInstance.post("/account/authorization/verify", {
          mobile: mobile,
          otp: otpCode,
        });

        // Some APIs return 201 for successful verification/creation
        if ((response.status === 200 || response.status === 201) && response.data.data.authorization) {
          localStorage.setItem(
            "fg_group_user_authorization",
            response.data.data.authorization
          );

          await Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome back!",
            timer: 2000,
            showConfirmButton: false,
            background: "#fff",
            color: "#1e293b",
            customClass: {
              popup: "rounded-3xl border-none shadow-2xl",
              title: "font-bold text-2xl px-6 pt-6",
            },
          });

          const userData = await getUserData();
          if (onLoginSuccess) {
            onLoginSuccess(userData);
          } else {
            // Fallback if prop not provided
            window.location.reload();
          }
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error("[LoginModal] handleVerify error:", error.response?.data || error.message);
        toast.error(`Verification Error: ${error.response?.data?.message || "Something went wrong."}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-50 px-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── STEP 1: Mobile ── */}
        {step === "mobile" && (
          <>
            <div className="flex flex-col items-center mb-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl leading-none cursor-pointer bg-transparent border-none p-2"
              >
                &times;
              </button>
              <img src={logo} alt="Gomzi Logo" className="h-16 w-auto object-contain mb-4" />
              <h2 className="text-slate-800 font-bold text-xl">Welcome back</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6 text-center">Enter your mobile number to continue</p>

            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mobile Number
              </label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <span className="px-3 py-2.5 text-sm text-slate-500 bg-slate-50 border-r border-slate-300">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="00000 00000"
                  className="flex-1 px-3 py-2.5 text-sm text-slate-800 outline-none placeholder-slate-400 bg-white"
                />
              </div>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={mobile.length !== 10 || loading}
              className="w-full bg-blue-600 text-white text-sm font-semibold rounded-lg py-3 hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <p className="text-center text-xs text-slate-400 mt-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
            </p>
          </>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === "otp" && (
          <>
            <div className="flex items-center justify-between mb-1">
              <button
                onClick={() => setStep("mobile")}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer bg-transparent border-none flex items-center gap-1"
              >
                ← Back
              </button>
              <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none cursor-pointer bg-transparent border-none p-2">
                &times;
              </button>
            </div>

            <div className="mt-4 mb-1">
              <h2 className="text-slate-800 font-bold text-xl">Verify OTP</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              OTP sent to <span className="text-slate-600 font-medium">+91 {mobile}</span>
            </p>

            {/* 6 OTP Boxes */}
            <div className="flex gap-2 justify-between mb-5">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-11 h-12 text-center text-lg font-semibold text-slate-800 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyAndLogin}
              disabled={otp.join("").length !== 6 || loading}
              className="w-full bg-blue-600 text-white text-sm font-semibold rounded-lg py-3 hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <p className="text-center text-xs text-slate-400 mt-4">
              Didn't receive OTP?{" "}
              <button
                onClick={() => {
                  setOtp(["", "", "", "", "", ""]);
                  handleSendOtp();
                }}
                className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer text-xs font-semibold"
              >
                Resend OTP
              </button>
            </p>
          </>
        )}

      </div>
    </div>
  );
}