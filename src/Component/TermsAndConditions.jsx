import { useState, useRef, useEffect } from "react";

export default function TermsAndConditions({ onProceed, onBack, isLoading = false }) {
    const [agreed, setAgreed] = useState(false);
    const [canAgree, setCanAgree] = useState(false);
    const scrollRef = useRef(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // Check if user has reached within 5px of the bottom
        if (scrollHeight - scrollTop <= clientHeight + 5) {
            setCanAgree(true);
        }
    };

    // Effect to check initial scroll position in case content is short
    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 min-h-full">
            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 p-6 sm:p-10 flex flex-col max-h-[90vh]">
                <div className="text-center mb-5 sm:mb-6 flex-shrink-0">
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900 leading-tight uppercase tracking-tight">
                        TERMS & CONDITIONS <br/> 
                        <span className="text-blue-600 text-sm sm:text-lg">— GYM / ZUMBA / YOGA MEMBERSHIP —</span>
                    </h2>
                </div>

                {/* Scrollable Terms Container */}
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 bg-slate-50 rounded-2xl p-6 overflow-y-auto mb-6 border border-slate-100 text-slate-600 text-sm leading-relaxed"
                >
                    <div className="space-y-6 pr-2">
                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">1. Payment Policy (Strict - No Exceptions)</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Full payment is compulsory in advance for all Gym, Zumba, and Yoga memberships.</li>
                                <li>Once payment is completed: <strong>No refund, No transfer, No reversal</strong> is allowed under any circumstances.</li>
                                <li>Membership fees are non-adjustable and non-refundable.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">2. Membership Nature & Validity</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Membership is: Non-transferable, Non-refundable, Non-freezable, Non-extendable.</li>
                                <li>Membership duration starts from the activation date, not from the date of usage.</li>
                                <li>Missed days are counted as used days.</li>
                                <li>No pause, no hold, no carry-forward in any case.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">3. Entry Rules & Access</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Entry is allowed only with a valid and active membership.</li>
                                <li>If suspended or blocked: Entry into the gym premises will be strictly denied.</li>
                                <li>Management reserves the right to refuse entry if rules are violated.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">4. Discipline, Conduct & Behavior (ZERO TOLERANCE)</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Discipline and respectful behavior are mandatory at all times.</li>
                                <li>Any form of: Misbehavior, Rude language, Aggressive attitude, Harassment will result in immediate action.</li>
                                <li><strong>Important Conduct Rule:</strong> Any inappropriate interaction between members (Boys with girls / Girls with boys) will be treated as a serious offense.</li>
                                <li>Disciplinary Actions Include: Immediate suspension, Blocking ID, Permanent ban, No refund.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">5. Dress Code, Hygiene & Safety</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Proper gym attire and appropriate footwear are mandatory.</li>
                                <li>Carrying and using a personal towel is compulsory.</li>
                                <li>Maintain hygiene: Wipe equipment after use, Keep workout areas clean.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">6. Equipment Usage Rules</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Members are responsible for the equipment they use.</li>
                                <li>Weights/plates must be placed back in original position after use; leaving them unattended is not allowed.</li>
                                <li>Any damage due to misuse/negligence: Repair/replacement cost recovered from member.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">7. Health & Medical Responsibility</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Members are fully responsible for their own health and fitness condition.</li>
                                <li>If injured/unwell: Gym is not responsible for any injury, accident, or health complication.</li>
                                <li>FITNESS WITH GOMZI is not liable for: Workout injuries, Health issues inside gym, Pre-existing conditions.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">8. Timings, Class Rules & Batch Discipline</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Follow gym Closing & Opening Timings strictly.</li>
                                <li>Late entry or disturbance during sessions is not allowed.</li>
                                <li>Management reserves the right to deny access outside operating hours.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">9. Suspension & Termination Policy</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Violation of rules results in: Immediate suspension, Termination, Permanent ID block.</li>
                                <li>No refund or compensation in such cases.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-200 pb-1">10. Management Rights</h3>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Management reserves the right to: Modify rules, Take immediate action for safety/discipline.</li>
                                <li>Decisions by management will be final and binding.</li>
                            </ul>
                        </section>

                        <section className="bg-blue-600/5 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2 uppercase text-xs tracking-widest border-b border-blue-200 pb-1">11. Final Declaration</h3>
                            <p className="font-bold text-slate-800 mb-2">By enrolling, you confirm that:</p>
                            <ul className="list-disc pl-4 space-y-1 font-medium text-slate-700">
                                <li>You have read and understood all rules.</li>
                                <li>You agree to follow discipline and conduct guidelines.</li>
                                <li>You accept no refund, no transfer, no extension policies.</li>
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Agreement Controls */}
                <div className={`flex flex-col gap-4 transition-all duration-300 ${!canAgree ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
                    <div className="flex items-start gap-3 cursor-pointer group" onClick={() => canAgree && setAgreed(!agreed)}>
                        <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100" : "border-slate-300 bg-white group-hover:border-blue-400"}`}>
                            {agreed && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                        <label className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                            I have read and agree to the full terms & conditions
                        </label>
                    </div>

                    {!canAgree && (
                        <p className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg text-center animate-pulse">
                            Please scroll to the bottom to enable agreement
                        </p>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={onBack}
                            className="px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all cursor-pointer bg-white"
                        >
                            Back
                        </button>
                        <button 
                            disabled={!agreed || isLoading}
                            onClick={onProceed}
                            className={`px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs text-white transition-all shadow-xl flex items-center justify-center gap-2 ${agreed ? "bg-blue-600 hover:bg-blue-700 cursor-pointer hover:-translate-y-1 active:translate-y-0" : "bg-blue-300 cursor-not-allowed shadow-none"}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Agree & Proceed"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
