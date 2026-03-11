import { useState, useEffect, useRef } from "react";
import gymImg from "../assets/hero-orange.png";

const plans = [
  { label: "1 Month", price: "₹1,500", val: "1", popular: false },
  { label: "3 Months", price: "₹4,000", val: "3", popular: true },
  { label: "12 Months", price: "₹14,000", val: "12", popular: false },
];

const PaymentForm = () => {
  const [isModal, setModal] = useState(false);
  const [scrolled, setScrolledT] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selPlan, setSelPlan] = useState("3");
  const [agreed, setAgreed] = useState(false);
  const [planConfirmed, setPlanConfirmed] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.07 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const selectedPlanInfo = plans.find(p => p.val === selPlan);

  const handleSubmit = e => { e.preventDefault(); setModal(true); setScrolledT(false); setAgreed(false); setPlanConfirmed(false); };
  const handleScroll = e => {
    if (!planConfirmed) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 10) setScrolledT(true);
  };
  const handlePay = () => { setModal(false); alert(`Payment of ${selectedPlanInfo?.price} Processed Successfully! Welcome to Gomzi Gym 🎉`); };

  return (
    <section className="bg-gray-50 py-24 px-5 sm:px-10 overflow-hidden" ref={sectionRef}>
      <div className="text-center mb-15">
        <div className="inline-flex items-center gap-2 font-body text-[11px] font-extrabold text-orange-500 tracking-[0.28em] uppercase mb-3.5 before:content-[''] before:w-7 before:h-0.5 before:bg-orange-500 before:rounded after:content-[''] after:w-7 after:h-0.5 after:bg-orange-500 after:rounded">
          Membership
        </div>
        <h2 className="font-hero text-[clamp(42px,5vw,66px)] font-black text-neutral-900 leading-[0.95] tracking-[-0.02em] uppercase">
          Join the <span className="text-orange-500">Elite</span>
        </h2>
      </div>

      <div className="max-w-[1160px] mx-auto flex flex-col lg:flex-row rounded-[28px] overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.1)] border border-gray-200">

        {/* Image Panel */}
        <div className={`relative w-full lg:w-[42%] min-h-[320px] lg:min-h-[600px] overflow-hidden shrink-0 opacity-0 ${visible ? "animate-slide-left" : ""}`}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-in-out hover:scale-105" style={{ backgroundImage: `url(${gymImg})` }} />
          <div className="absolute inset-0 bg-gradient-to-br from-black/55 to-orange-500/15" />
          <div className="absolute top-0 right-0 w-[5px] h-full bg-orange-500" />

          <div className="absolute bottom-0 left-0 right-0 p-9 z-10">
            <div className="inline-block bg-orange-500 text-white font-body text-[10px] font-extrabold tracking-widest uppercase py-1.5 px-3.5 rounded-full mb-3.5">
              Start Today
            </div>
            <div className="font-hero text-[clamp(30px,4vw,46px)] text-white leading-none uppercase tracking-[-0.02em] mb-2.5">
              The Journey<span className="text-orange-500 block">Starts Here</span>
            </div>
            <p className="font-body text-sm font-medium italic text-white/65 leading-relaxed mb-6">
              "Don't wait for opportunity. Create it. Your best version is just one workout away."
            </p>
            <div className="flex flex-col gap-2">
              {plans.map(p => (
                <div
                  key={p.val}
                  className={`flex items-center justify-between border rounded-xl py-2.5 px-4 cursor-pointer transition-all duration-300 font-body backdrop-blur-sm ${selPlan === p.val ? "bg-orange-500 border-orange-500" : "bg-white/10 border-white/20 hover:bg-orange-500 hover:border-orange-500"}`}
                  onClick={() => setSelPlan(p.val)}
                >
                  <span className="text-[13px] font-bold text-white flex items-center">
                    {p.label}
                    {p.popular && selPlan === p.val && (
                      <span className="inline-block bg-white text-orange-500 text-[9px] font-extrabold tracking-widest uppercase py-0.5 px-2 rounded-full ml-2">Popular</span>
                    )}
                  </span>
                  <span className="font-hero text-lg text-white">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className={`flex-1 bg-white p-9 sm:p-13 flex flex-col justify-center opacity-0 ${visible ? "animate-[slide-right_0.9s_cubic-bezier(0.22,1,0.36,1)_0.22s_both]" : ""}`}>
          <div className="font-hero text-[clamp(32px,4vw,46px)] text-neutral-900 uppercase tracking-[-0.02em] mb-1.5">
            Register <span className="text-orange-500">Now</span>
          </div>
          <p className="font-body text-sm text-gray-400 font-medium mb-8">Complete the form below to secure your membership slot at Gomzi Gym.</p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                <input type="text" className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 px-4.5 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)]" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                <input type="text" className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 px-4.5 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)]" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 px-4.5 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)]" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input type="tel" className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 px-4.5 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)]" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Membership Plan</label>
                <select
                  className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 pl-4.5 pr-11 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)] appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%239ca3af%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_16px]"
                  value={selPlan}
                  onChange={e => setSelPlan(e.target.value)}
                  required
                >
                  <option value="">Select Plan</option>
                  {plans.map(p => <option key={p.val} value={p.val}>{p.label} — {p.price}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                <input type="date" className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 px-4.5 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)]" required />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Living Address</label>
              <textarea rows="3" className="w-full bg-gray-50 border-[1.5px] border-gray-100 rounded-xl py-3.5 px-4.5 font-body text-sm font-semibold text-neutral-900 outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.07)] resize-none" required />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white rounded-xl py-4.5 px-7 font-body text-[13px] font-extrabold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2.5 relative overflow-hidden mt-1 shadow-[0_8px_28px_rgba(249,115,22,0.3)] transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(249,115,22,0.38)] group after:content-[''] after:absolute after:top-0 after:-left-[80%] after:w-1/2 after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/15 after:to-transparent hover:after:animate-[shim-btn_0.6s_ease]">
              <i className="bi bi-shield-lock-fill" /> Proceed to Payment
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModal && (
        <div className="fixed inset-0 z-[2000] bg-black/45 backdrop-blur-md flex items-center justify-center p-4 animate-bg-fade">
          <div className="bg-white rounded-[26px] p-7 sm:p-11 max-w-[600px] w-full relative shadow-[0_36px_90px_rgba(0,0,0,0.18)] border-t-4 border-orange-500 animate-[pop-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
            <button className="absolute top-4.5 right-4.5 w-9 h-9 rounded-lg bg-gray-100 border-none cursor-pointer flex items-center justify-center text-gray-400 text-sm transition-all duration-200 hover:bg-orange-50 hover:text-orange-500" onClick={() => setModal(false)}>
              <i className="bi bi-x-lg" />
            </button>
            <div className="font-hero text-3xl text-neutral-900 uppercase tracking-[-0.02em] mb-5.5">
              Confirm <span className="text-orange-500">Membership</span>
            </div>

            <div className="overflow-y-auto pr-2 flex flex-col gap-6 font-body">
              
              {/* Plan Summary Section - Clickable to unlock terms */}
              <div 
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${planConfirmed ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20" : "bg-orange-50/50 border-orange-100 hover:bg-orange-100/50"}`}
                onClick={() => setPlanConfirmed(true)}
              >
                <div>
                   <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${planConfirmed ? "text-white/80" : "text-orange-500"}`}>
                    {planConfirmed ? "Plan Confirmed ✓" : "Click to Confirm Plan"}
                   </div>
                   <div className={`font-hero text-2xl leading-none uppercase ${planConfirmed ? "text-white" : "text-neutral-900"}`}>{selectedPlanInfo?.label}</div>
                </div>
                <div className="text-right">
                   <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${planConfirmed ? "text-white/80" : "text-gray-400"}`}>Total Due</div>
                   <div className={`font-hero text-2xl leading-none ${planConfirmed ? "text-white" : "text-orange-500"}`}>{selectedPlanInfo?.price}</div>
                </div>
              </div>

              {/* Terms Textarea - Visible but locked until plan is confirmed */}
              <div className={`flex flex-col gap-3 transition-all duration-500 ${planConfirmed ? "opacity-100 grayscale-0" : "opacity-40 grayscale pointer-events-none select-none"}`}>
                <div className="flex justify-between items-center">
                  <div className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Terms & Conditions</div>
                  {planConfirmed && !scrolled && <span className="text-[9px] font-bold text-orange-500 uppercase animate-pulse">Scroll to Read ↓</span>}
                </div>
                <div 
                  className="bg-gray-50 rounded-xl border border-gray-100 p-5 h-[180px] overflow-y-auto font-body text-sm text-gray-500 leading-relaxed scrollbar-thin scrollbar-thumb-orange-200"
                  onScroll={handleScroll}
                >
                  <p className="mb-4"><strong>1. Membership Commitment:</strong> Memberships are non-transferable and non-refundable. Monthly dues must remain valid for the full duration of access.</p>
                  <p className="mb-4"><strong>2. Facility Rules:</strong> Proper gym attire and indoor shoes are mandatory. Always wipe down equipment after use.</p>
                  <p className="mb-4"><strong>3. Assumption of Risk:</strong> Exercise involves risk of injury. Members assume all risks and release Gomzi Gym from liability for any accidents occurring on premises.</p>
                  <p className="mb-4"><strong>4. Code of Conduct:</strong> Respectful behavior towards staff and other members is required. Inappropriate conduct may result in immediate termination.</p>
                  <p className="mb-4"><strong>5. Health Declaration:</strong> You certify that you are in good physical health and have no medical conditions that would prevent you from exercising safely.</p>
                  <div className="bg-orange-500/10 text-orange-600 p-3 rounded-lg text-[10px] font-bold uppercase text-center tracking-widest mt-2">End of Official Terms</div>
                </div>
              </div>

            </div>

            {!planConfirmed && <p className="text-center font-body text-[11px] font-bold text-orange-400 tracking-widest mt-4">Pela plan select krva (click) devano</p>}
            {planConfirmed && !scrolled && <p className="text-center font-body text-[11px] font-bold text-orange-500 tracking-widest mt-4 animate-bounce">Niche scroll kri ne jav</p>}

            <div className={`mt-6 p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${scrolled ? "bg-white border-orange-500 shadow-md" : "bg-gray-50 border-gray-100 opacity-60"}`}>
               <input 
                type="checkbox" 
                id="agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                disabled={!scrolled}
                className="w-6 h-6 accent-orange-500 shrink-0 cursor-pointer disabled:cursor-not-allowed" 
               />
               <label htmlFor="agree" className={`font-body text-sm font-bold leading-tight ${scrolled ? "text-neutral-900 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}>
                  I have read all terms and conditions and I agree to follow the gym rules.
               </label>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
               <button className="py-3.5 px-8 rounded-xl border border-gray-200 bg-white text-gray-500 font-body text-sm font-bold transition-all hover:bg-gray-50" onClick={() => setModal(false)}>
                  Cancel
               </button>
               <button 
                  className={`py-3.5 px-10 rounded-xl font-hero text-lg tracking-widest uppercase transition-all duration-500 ${agreed ? "bg-orange-500 text-white shadow-xl shadow-orange-500/30 cursor-pointer hover:bg-orange-600 hover:-translate-y-1" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  onClick={agreed ? handlePay : undefined}
                  disabled={!agreed}
               >
                  Confirm & Pay
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentForm;