import { useState, useEffect } from "react";
import logo from "../assets/gomzi.webp";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Optional Top Info Bar */}
      <div className={`transition-all duration-300 overflow-hidden bg-orange-500 text-white font-body text-xs font-semibold flex items-center justify-between px-6 sm:px-10 ${scrolled ? "h-0 opacity-0 py-0" : "h-10 opacity-100 py-2"}`}>
        <span className="truncate">📍 123 Fitness Street, Gym City, India &nbsp;|&nbsp; Mon–Sat: 6AM–10PM</span>
        <div className="hidden sm:flex gap-4">
          <a href="#" className="hover:text-white text-white/80 transition-colors">📞 +91 98765 43210</a>
          <a href="#" className="hover:text-white text-white/80 transition-colors">✉ info@gomzigym.com</a>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed left-0 w-full z-50 transition-all duration-500 ${scrolled ? "top-0 bg-white/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.06)] py-2" : "top-10 bg-transparent py-4"}`}>
        <div className="max-w-[1340px] mx-auto px-6 sm:px-10 flex items-center justify-between xl:justify-center">
          <a href="#" className="flex items-center">
            <img
              src={logo}
              alt="Gomzi Gym"
              className={`w-auto object-contain transition-all duration-400 ${scrolled ? "h-10" : "h-14"}`}
            />
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;