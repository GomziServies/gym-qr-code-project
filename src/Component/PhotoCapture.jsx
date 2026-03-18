import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/api";

export default function PhotoCapture({ onNext, onBack, initialImage }) {
    const getFullImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith("data:") || path.startsWith("http")) return path;
        return `https://files.fggroup.in/${path}`;
    };

    const [image, setImage] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [stream, setStream] = useState(null);
    const [streamActive, setStreamActive] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.onloadedmetadata = () => setStreamActive(true);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            if (err.name === "NotAllowedError") {
                console.warn("Camera permission denied.");
            } else if (err.name === "NotFoundError") {
                toast.error("No camera found on this device.");
            } else {
                toast.error("Error accessing camera: " + err.message);
            }
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setStreamActive(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const dataUrl = canvasRef.current.toDataURL("image/jpeg");
            setImage(dataUrl);
            stopCamera();
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                stopCamera();
            };
            reader.readAsDataURL(file);
        }
    };

    const reset = () => {
        setImage(null);
        setTimeout(() => {
            startCamera();
        }, 100);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoadingProfile(true);
                const response = await axiosInstance.get("/account/profile");
                const userData = response.data.data;
                if (userData && userData.user && userData.user.profile_image) {
                    setImage(getFullImageUrl(userData.user.profile_image));
                } else if (initialImage) {
                    setImage(getFullImageUrl(initialImage));
                } else {
                    startCamera();
                }
            } catch (error) {
                console.error("[PhotoCapture] Error fetching profile:", error);
                if (initialImage) {
                    setImage(getFullImageUrl(initialImage));
                } else {
                    startCamera();
                }
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
        return () => stopCamera();
    }, []);

    return (
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8">
            <style>{`
                .btn-primary { background: #2563eb; color: white; padding: 10px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
                .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
                .btn-secondary { background: white; color: #1e293b; padding: 10px 24px; border-radius: 12px; font-weight: 600; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s; }
            `}</style>

            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-[2rem] shadow-2xl border border-white/50 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Step 2: Photo Capture</h2>
                <p className="text-slate-500 text-xs sm:text-sm mb-6 sm:mb-8">Please take a selfie or upload a photo to continue</p>

                <div className="relative w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden mb-8 shadow-inner flex items-center justify-center">
                    {!image ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 ${streamActive ? "opacity-100" : "opacity-0 absolute"}`}
                            />
                            {!streamActive && (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                        fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                    <p className="text-slate-500 text-sm">
                                        {loadingProfile ? "Fetching profile photo..." : "Starting camera..."}
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <img src={image} alt="Captured" className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={reset} className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-700 hover:bg-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                        <path d="M3 3v5h5" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => {
                                if (image) {
                                    setImage(null);
                                    setTimeout(() => startCamera(), 100);
                                } else {
                                    capturePhoto();
                                }
                            }} 
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            {image ? "Retake Photo" : "Capture Photo"}
                        </button>

                        <button 
                            onClick={() => {
                                if (image) setImage(null);
                                fileInputRef.current.click();
                            }} 
                            className="btn-secondary flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Upload Photo
                        </button>

                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <button onClick={onBack} className="btn-secondary">Back</button>
                            <button
                                onClick={() => onNext(image)}
                                disabled={!image}
                                className="btn-primary"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}