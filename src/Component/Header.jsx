import React, { useState } from "react";
import logo from "../assets/gomzi.webp";
import LoginModal from "./Loginmodel";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 h-16 flex items-center justify-between shadow-sm">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline">
          <img src={logo} alt="Gomzi Logo" className="h-10 w-auto object-contain " />
        </a>

        {/* Login Button */}
        <button
          onClick={() => setShowLogin(true)}
          className="text-sm font-medium text-white bg-blue-600 rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-700 transition-colors shadow-sm"
        >
          Login
        </button>

      </header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}