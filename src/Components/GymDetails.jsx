import { useEffect, useRef } from "react";
import img1 from "../assets/hero-orange.png";
import img2 from "../assets/eq-orange.png";
import img3 from "../assets/trainer-orange.png";

const rows = [
  {
    image: img1, alt: "Gym Atmosphere",
    tag: "Transform Your Body", num: "01",
    title: "World-Class", accent: "Atmosphere",
    desc: "Experience a premium workout environment designed to keep you motivated and focused. Spacious training floors, high-energy music, and a community that never settles for less.",
    items: ["Motivation-driven community", "Fully air-conditioned floors", "Locker rooms & showers"],
    reverse: false,
  },
  {
    image: img2, alt: "Equipment",
    tag: "Modern Technology", num: "02",
    title: "State-of-the-Art", accent: "Equipment",
    desc: "We invest in the latest top-tier cardio and strength training machines so you always have access to the tools that deliver real, measurable results.",
    items: ["Advanced cardio machines", "Free weights & Olympic plates", "Heavy-duty power racks"],
    reverse: true,
  },
  {
    image: img3, alt: "Personal Trainers",
    tag: "Expert Guidance", num: "03",
    title: "Certified", accent: "Personal Trainers",
    desc: "Our professional trainers build customized workout and nutrition plans specifically for your body and goals — because generic programmes don't create extraordinary results.",
    items: ["One-on-one coaching sessions", "Customized diet programs", "Weekly progress tracking"],
    reverse: false,
  },
];

const GymDetails = () => {
  const rowRefs = useRef([]);

  useEffect(() => {
    rowRefs.current.forEach(el => {
      if (el) { el.style.opacity = "0"; el.style.transform = "translateY(48px)"; }
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)";
          en.target.style.opacity = "1";
          en.target.style.transform = "translateY(0)";
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });

    rowRefs.current.forEach(el => el && obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-12 px-10 pb-28 overflow-hidden">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-24">
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-11 lg:gap-18 items-center ${row.reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''}`} ref={el => rowRefs.current[i] = el}>

            <div className="relative">
              <div className="absolute -top-5 -right-2.5 z-0 font-hero text-[180px] text-orange-500/[0.06] leading-none tracking-[-0.05em] pointer-events-none select-none hidden md:block">
                {row.num}
              </div>
              <div className="absolute top-[8%] bottom-[8%] -left-2.5 w-1 bg-gradient-to-b from-orange-500 to-transparent rounded z-10" />
              <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12)] z-20 cursor-default group after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-orange-500">
                <img
                  src={row.image}
                  alt={row.alt}
                  className="w-full h-[300px] md:h-[460px] object-cover block transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute -top-4 -right-4 z-30 w-15 h-15 bg-orange-500 rounded-2xl flex items-center justify-center font-hero text-[26px] text-white shadow-[0_8px_28px_rgba(249,115,22,0.4)]">
                {row.num}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 font-body text-[11px] font-extrabold text-orange-500 tracking-[0.25em] uppercase mb-4 before:content-[''] before:w-5 before:h-0.5 before:bg-orange-500 before:rounded">
                {row.tag}
              </div>
              <h2 className="font-hero text-[clamp(40px,5vw,58px)] text-neutral-900 leading-[0.92] tracking-[-0.02em] uppercase mb-5">
                {row.title}
                <span className="block text-gray-300">{row.accent}</span>
              </h2>
              <p className="font-body text-base text-gray-500 leading-relaxed font-medium mb-9 max-w-[460px]">
                {row.desc}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
                {row.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3.5 font-body text-[15px] font-bold text-gray-700 cursor-default group">
                    <span className="w-7.5 h-7.5 min-w-[30px] rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 text-[15px] transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6">
                      <i className="bi bi-check-lg" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default GymDetails;