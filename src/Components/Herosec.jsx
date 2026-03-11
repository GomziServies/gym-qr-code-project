import { useEffect, useRef } from "react";
import heroImg from "../assets/hero-orange.png";

const HeroSec = () => {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current.querySelectorAll(".animate-item");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = `all .8s cubic-bezier(0.22, 1, 0.36, 1) ${i * .1}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center pt-24" ref={ref}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"}
          alt="Gym Background"
          className="w-full h-full object-cover"
        />
        {/* Modern Gradient Overlay: White on left for text legibility, fading to slight orange tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-orange-500/10" />
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full mb-20">
        <div className="max-w-3xl flex flex-col gap-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-4 py-2 w-fit animate-item">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Train. Transform. Triumph.</span>
          </div>

          <h1 className="flex flex-col leading-[0.9] animate-item">
            <span className="font-hero text-7xl md:text-[120px] text-neutral-900 uppercase tracking-tighter">Forge</span>
            <span className="font-hero text-7xl md:text-[120px] text-neutral-900 uppercase tracking-tighter">Your</span>
            <div className="relative inline-block w-fit">
              <span className="font-hero text-7xl md:text-[120px] text-orange-500 uppercase tracking-tighter">Body</span>
              <div className="absolute bottom-4 left-0 w-full h-3 bg-orange-500/20 rounded-full" />
            </div>
          </h1>

          <p className="text-gray-600 text-xl max-w-lg leading-relaxed animate-item font-medium">
            State-of-the-art equipment, elite trainers, and a community that pushes you beyond your limits.
            Your transformation starts today.
          </p>

         

          <div className="grid grid-cols-3 gap-12 pt-12 border-t border-neutral-200 animate-item mt-4">
            {[
              { val: "5k+", label: "Members" },
              { val: "50+", label: "Trainers" },
              { val: "10y", label: "Years Exp" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-hero text-5xl text-neutral-900">{stat.val}</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-black mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Badges */}
  
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-10 flex flex-col items-center gap-3 opacity-30">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[1px] h-12 bg-orange-500" />
      </div>
    </section>
  );
};

export default HeroSec;