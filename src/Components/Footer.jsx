import React from "react";
import logo from "../assets/gomzi.webp";

const Footer = () => {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Story", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ]
    },
    {
      title: "Programs",
      links: [
        { label: "Weight Loss", href: "#" },
        { label: "Yoga & Meditation", href: "#" },
        { label: "Personal Training", href: "#" },
        { label: "Group Classes", href: "#" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "FAQ", href: "#" },
      ]
    }
  ];

  const socials = [
    { icon: "bi-instagram", label: "Instagram" },
    { icon: "bi-facebook", label: "Facebook" },
    { icon: "bi-twitter-x", label: "Twitter" },
    { icon: "bi-youtube", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-10 px-6 font-body overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&q=80" 
          alt="Gym Footer Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA Section */}
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <img src={logo} alt="Gomzi Gym" className="h-12 mb-8" />
            <p className="text-gray-500 max-w-xs mb-8 leading-relaxed">
              Empowering individuals to reach their peak physical and mental condition through expert coaching and world-class facilities.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1">
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-orange-500">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm">
            &copy; {year} Gomzi Gym. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;