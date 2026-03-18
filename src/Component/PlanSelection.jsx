import React, { useState } from "react";

export default function PlanSelection({ subStep, setSubStep, selections, setSelections, onSelect, onBack }) {
    // State is now lifted to Gympage.jsx

    const mainPlans = [
        { id: "membership", title: "Membership Plan", description: "Standard gym membership with full access", icon: "💎" },
        { id: "rtp", title: "RTP: 1", description: "Customized Personal Training & Diet Plan", icon: "🔥" }
    ];

    const programs = [
        { id: "gym", title: "Gym Membership Plan", icon: "💪" },
        { id: "zumba", title: "Zumba Membership Plan", icon: "💃" },
        { id: "yoga", title: "Yoga Membership Plan", icon: "🧘" }
    ];

    const types = [
        { id: "male", title: "Male Membership", icon: "👨" },
        { id: "female", title: "Female Membership", icon: "👩" },
        { id: "couple", title: "Couple Membership", icon: "👫" }
    ];

    const pricingData = {
        gym: {
            male: [
                { id: "69b7e594f78450f0afc197ce", title: "1 Month", price: "₹2,000" },
                { id: "69b7e5c7f78450f0afc197d0", title: "3 Months", price: "₹5,000" },
                { id: "69b7e609f78450f0afc197d2", title: "6 Months", price: "₹8,000" },
                { id: "69b7e62df78450f0afc197d4", title: "12 Months", price: "₹12,000" }
            ],
            female: [
                { id: "1", title: "1 Month", price: "₹1,800" },
                { id: "3", title: "3 Months", price: "₹4,500" },
                { id: "6", title: "6 Months", price: "₹7,000" },
                { id: "12", title: "12 Months", price: "₹10,500" }
            ],
            couple: [
                { id: "3", title: "3 Months", price: "₹8,500" },
                { id: "6", title: "6 Months", price: "₹14,500" },
                { id: "12", title: "12 Months", price: "₹20,000" }
            ]
        },
        zumba: {
            male: [
                { id: "1", title: "1 Month", price: "₹2,500" },
                { id: "3", title: "3 Months", price: "₹6,500" },
                { id: "6", title: "6 Months", price: "₹11,000" },
                { id: "12", title: "12 Months", price: "₹18,000" }
            ],
            female: [
                { id: "1", title: "1 Month", price: "₹2,200" },
                { id: "3", title: "3 Months", price: "₹5,500" },
                { id: "6", title: "6 Months", price: "₹10,000" },
                { id: "12", title: "12 Months", price: "₹16,500" }
            ],
            couple: [
                { id: "3", title: "3 Months", price: "₹11,000" },
                { id: "6", title: "6 Months", price: "₹19,000" },
                { id: "12", title: "12 Months", price: "₹30,000" }
            ]
        },
        yoga: {
            male: [
                { id: "1", title: "1 Month", price: "₹1,200" },
                { id: "3", title: "3 Months", price: "₹3,200" },
                { id: "6", title: "6 Months", price: "₹7,200" },
                { id: "12", title: "12 Months", price: "₹10,000" }
            ],
            female: [
                { id: "1", title: "1 Month", price: "₹1,000" },
                { id: "3", title: "3 Months", price: "₹2,800" },
                { id: "6", title: "6 Months", price: "₹6,800" },
                { id: "12", title: "12 Months", price: "₹9,000" }
            ],
            couple: [
                { id: "3", title: "3 Months", price: "₹5,500" },
                { id: "6", title: "6 Months", price: "₹13,000" },
                { id: "12", title: "12 Months", price: "₹18,000" }
            ]
        },
        rtp: {
            male: [
                { id: "1", title: "1 Month", price: "₹9,000" },
                { id: "3", title: "3 Months", price: "₹23,000" },
                { id: "6", title: "6 Months", price: "₹39,000" },
                { id: "12", title: "12 Months", price: "₹49,000" }
            ],
            female: [
                { id: "1", title: "1 Month", price: "₹9,000" },
                { id: "3", title: "3 Months", price: "₹23,000" },
                { id: "6", title: "6 Months", price: "₹39,000" },
                { id: "12", title: "12 Months", price: "₹49,000" }
            ],
            couple: [
                { id: "6", title: "6 Months", price: "₹63,000" },
                { id: "12", title: "12 Months", price: "₹81,000" }
            ]
        }
    };

    const handleMainSelect = (plan) => {
        setSelections({ ...selections, plan: plan.title, program: plan.title, programId: plan.id });
        if (plan.id === "membership") {
            setSubStep("program");
        } else {
            setSubStep("type");
        }
    };

    const handleProgramSelect = (program) => {
        setSelections({ ...selections, program: program.title, programId: program.id });
        setSubStep("type");
    };

    const handleTypeSelect = (type) => {
        setSelections({ ...selections, type: type.title, typeId: type.id });
        setSubStep("duration");
    };

    const handleDurationSelect = (duration) => {
        const finalTitle = `${selections.program} - ${selections.type} (${duration.title} @ ${duration.price})`;
        onSelect({ title: finalTitle, details: { ...selections, duration: duration.title, price: duration.price, itemId: duration.id } });
    };

    const goBack = () => {
        if (subStep === "program") setSubStep("main");
        else if (subStep === "type") {
            if (selections.programId === "rtp") setSubStep("main");
            else setSubStep("program");
        }
        else if (subStep === "duration") setSubStep("type");
        else onBack();
    };

    const Card = ({ item, onClick, showPrice }) => (
        <div onClick={() => onClick(item)} className="plan-card group">
            <div className="flex justify-between items-start">
                <div className="icon-circle group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.icon || (showPrice ? "💰" : "📋")}
                </div>
                {item.id === "membership" && (
                    <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Popular
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                {item.description && <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>}
                {showPrice && <p className="text-blue-600 font-bold text-lg mt-2">{item.price}</p>}
            </div>
            <div className="mt-auto pt-4 flex items-center text-blue-600 font-bold text-sm">
                Select
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </div>
    );

    const getStepInfo = () => {
        switch (subStep) {
            case "main": return { title: "Choose Your Path", desc: "Select a plan that works best for your fitness goals." };
            case "program": return { title: "Select Program", desc: selections.plan };
            case "type": return { title: "Select Membership Type", desc: selections.program };
            case "duration": return { title: "Choose Duration", desc: `${selections.program} for ${selections.type}` };
            default: return {};
        }
    };

    const stepInfo = getStepInfo();

    return (
        <div className="relative z-10 flex flex-col items-center px-4 py-8 min-h-full">
            <style>{`
                .plan-card { 
                    background: white; 
                    border: 1px solid #f1f5f9; 
                    border-radius: 2rem; 
                    padding: 20px; 
                    cursor: pointer; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    min-height: 160px;
                    height: 100%;
                    width: 100%;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                }
                @media (min-width: 640px) {
                    .plan-card { padding: 32px; min-height: 220px; gap: 12px; }
                }
                .plan-card:hover { 
                    transform: translateY(-8px); 
                    background: white; 
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                    border-color: #2563eb;
                }
                .plan-card:active { transform: scale(0.97); }
                .icon-circle {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    background: #f8fafc;
                    color: #334155;
                    transition: all 0.3s;
                }
                @media (min-width: 640px) {
                    .icon-circle {
                        width: 56px;
                        height: 56px;
                        border-radius: 16px;
                        font-size: 24px;
                    }
                }
                @media (min-width: 640px) { /* Apply original size and font size on sm screens and up */
                    .icon-circle {
                        width: 48px;
                        height: 48px;
                        font-size: 20px;
                    }
                }
            `}</style>

            <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-6 sm:mb-10 px-4">
                    <h2 className="text-lg sm:text-3xl font-black text-slate-900 leading-[1.2] mb-1 sm:mb-2 uppercase tracking-tight">{stepInfo.title}</h2>
                    <p className="text-slate-500 text-[10px] sm:text-sm max-w-[280px] sm:max-w-lg mx-auto font-bold uppercase tracking-widest opacity-60 leading-relaxed">{stepInfo.desc}</p>
                </div>

                <div className="flex flex-wrap justify-center items-stretch gap-3 sm:gap-6 mb-10 w-full max-w-7xl mx-auto px-2 sm:px-4">
                    {subStep === "main" && mainPlans.map(p => (
                        <div key={p.id} className="w-full sm:w-[350px] flex">
                            <Card item={p} onClick={handleMainSelect} />
                        </div>
                    ))}
                    {subStep === "program" && programs.map(p => (
                        <div key={p.id} className="w-full sm:w-[320px] flex">
                            <Card item={p} onClick={handleProgramSelect} />
                        </div>
                    ))}
                    {subStep === "type" && types.map(t => (
                        <div key={t.id} className="w-full sm:w-[320px] flex">
                            <Card item={t} onClick={handleTypeSelect} />
                        </div>
                    ))}
                    {subStep === "duration" && pricingData[selections.programId]?.[selections.typeId]?.map(d => (
                        <div key={d.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[240px] flex">
                            <Card item={d} onClick={handleDurationSelect} showPrice />
                        </div>
                    ))}
                </div>

                <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-all border-none bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl cursor-pointer shadow-sm hover:shadow-md mx-auto"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    Back to {subStep === "main" ? "Photo Capture" : "Previous Selection"}
                </button>
            </div>
        </div>
    );
}
