import { useState, useEffect } from "react";

export default function PlanSelection({
  subStep,
  setSubStep,
  selections,
  setSelections,
  onSelect,
  onBack,
}) {
  // State is now lifted to Gympage.jsx

  const mainPlans = [
    {
      id: "premium",
      title: "Premium Membership",
      description: "Exclusive premium gym access with all perks",
      features: [
        "One-Time Body Consultation",
        "One-Time Diet Plan",
        "One-Time Exercise Plan",
        "Till Membership: Zumba, Tabata & Aerobics Sessions",
      ],
    },
    {
      id: "rtp",
      title: "RTP: 1",
      description: "Customized Personal Training & Diet Plan",
      features: [
        "One-on-One Personal Training",
        "Personalized Consultation",
        "Customized Diet Plan",
        "Diet Plan Updates Every 15-20 Days",
        "Daily Diet & Exercise Updates",
        "Access Till Membership Duration: Zumba Sessions",
        "Therapy Sessions & Blood check up Quarterly (Based on consultation)",
        "Activities & Events Including Aerobics, Tabata & Zumba Sessions",
      ],
    },
  ];

  /*
    const programs = [
        { id: "gym", title: "Gym Membership Plan" },
        { id: "zumba", title: "Zumba Membership Plan" },
        { id: "yoga", title: "Yoga Membership Plan" }
    ];

    const types = [
        { id: "male", title: "Male Membership" },
        { id: "female", title: "Female Membership" },
        { id: "couple", title: "Couple Membership" }
    ];
    */

  const [pricingData, setPricingData] = useState({});

  useEffect(() => {
    const hostname = window.location.hostname;
    const isProduction =
      hostname.includes("offers.fggroup.in") &&
      !hostname.includes("test.fggroup.in") &&
      !hostname.includes("dev");

    if (isProduction) {
      setPricingData({
        gym: {
          /*
                    male: [
                        { id: "69bd43399f35a4d48ab562ee", title: "1 Month", price: "₹2,000" },
                        { id: "69bd1bc2bc0fa93c777cd039", title: "3 Months", price: "₹5,000" },
                        { id: "69bd43a19f35a4d48ab56336", title: "6 Months", price: "₹8,000" },
                        { id: "69bd43bb9f35a4d48ab5633a", title: "12 Months", price: "₹12,000" }
                    ],
                    female: [
                        { id: "69bd444c9f35a4d48ab56524", title: "1 Month", price: "₹1,800" },
                        { id: "69bd44329f35a4d48ab56522", title: "3 Months", price: "₹4,500" },
                        { id: "69bd44179f35a4d48ab5643e", title: "6 Months", price: "₹7,000" },
                        { id: "69bd43f79f35a4d48ab56346", title: "12 Months", price: "₹10,500" }
                    ],
                    couple: [
                        { id: "69bd446e9f35a4d48ab56608", title: "3 Months", price: "₹8,500" },
                        { id: "69bd44919f35a4d48ab56610", title: "6 Months", price: "₹14,500" },
                        { id: "69bd44b19f35a4d48ab56617", title: "12 Months", price: "₹20,000" }
                    ]
                    */
          gym: [
            { id: "gym_1m", title: "1 Month Plan", price: "₹3,700" },
            { id: "gym_3m", title: "3 Months Plan", price: "₹9,000" },
            { id: "gym_6m", title: "6 Months Plan", price: "₹15,700" },
            { id: "gym_9m", title: "9 Months Plan", price: "₹21,700" },
            {
              id: "gym_12m",
              title: "12 Months Plan (Best Value)",
              price: "₹27,000",
            },
          ],
        },
        zumba: {
          male: [
            {
              id: "69bd454f9f35a4d48ab56744",
              title: "1 Month",
              price: "₹2,500",
            },
            {
              id: "69bd453c9f35a4d48ab56740",
              title: "3 Months",
              price: "₹6,500",
            },
            {
              id: "69bd45089f35a4d48ab5673c",
              title: "6 Months",
              price: "₹11,000",
            },
            {
              id: "69bd44f09f35a4d48ab56701",
              title: "12 Months",
              price: "₹18,000",
            },
          ],
          female: [
            {
              id: "69bd456d9f35a4d48ab56746",
              title: "1 Month",
              price: "₹2,200",
            },
            {
              id: "69bd45879f35a4d48ab5674a",
              title: "3 Months",
              price: "₹5,500",
            },
            {
              id: "69bd45ab9f35a4d48ab5674c",
              title: "6 Months",
              price: "₹10,000",
            },
            {
              id: "69bd45d49f35a4d48ab56750",
              title: "12 Months",
              price: "₹16,500",
            },
          ],
          couple: [
            {
              id: "69bd46409f35a4d48ab5675e",
              title: "3 Months",
              price: "₹11,000",
            },
            {
              id: "69bd46599f35a4d48ab56760",
              title: "6 Months",
              price: "₹29,000",
            },
            {
              id: "69bd46299f35a4d48ab56754",
              title: "12 Months",
              price: "₹30,000",
            },
          ],
        },
        yoga: {
          male: [
            {
              id: "69bd46819f35a4d48ab56764",
              title: "1 Month",
              price: "₹1,200",
            },
            {
              id: "69bd46939f35a4d48ab56766",
              title: "3 Months",
              price: "₹3,200",
            },
            {
              id: "69bd46ac9f35a4d48ab56768",
              title: "6 Months",
              price: "₹7,200",
            },
            {
              id: "69bd46c59f35a4d48ab5676c",
              title: "12 Months",
              price: "₹10,000",
            },
          ],
          female: [
            {
              id: "69bd46de9f35a4d48ab5676e",
              title: "1 Month",
              price: "₹1,000",
            },
            {
              id: "69bd46f19f35a4d48ab56776",
              title: "3 Months",
              price: "₹2,800",
            },
            {
              id: "69bd470b9f35a4d48ab567b4",
              title: "6 Months",
              price: "₹6,800",
            },
            {
              id: "69bd471f9f35a4d48ab567b6",
              title: "12 Months",
              price: "₹9,000",
            },
          ],
          couple: [
            {
              id: "69bd47389f35a4d48ab567ba",
              title: "3 Months",
              price: "₹5,500",
            },
            {
              id: "69bd47489f35a4d48ab567bc",
              title: "6 Months",
              price: "₹13,000",
            },
            {
              id: "69bd47599f35a4d48ab567be",
              title: "12 Months",
              price: "₹18,000",
            },
          ],
        },
        rtp: {
          // male: [
          //     { id: "69bd47829f35a4d48ab567c2", title: "1 Month", price: "₹9,000" },
          //     { id: "69bd47989f35a4d48ab567c4", title: "3 Months", price: "₹23,000" },
          //     { id: "69bd47aa9f35a4d48ab567c8", title: "6 Months", price: "₹39,000" },
          //     { id: "69bd47c19f35a4d48ab567ca", title: "12 Months", price: "₹49,000" }
          // ],
          // female: [
          //     { id: "69bd47d99f35a4d48ab567cc", title: "1 Month", price: "₹9,000" },
          //     { id: "69bd47eb9f35a4d48ab567d0", title: "3 Months", price: "₹23,000" },
          //     { id: "69bd47fe9f35a4d48ab567d2", title: "6 Months", price: "₹39,000" },
          //     { id: "69bd48119f35a4d48ab567d4", title: "12 Months", price: "₹49,000" }
          // ],
          // couple: [
          //     { id: "69bd484f9f35a4d48ab567da", title: "6 Months", price: "₹63,000" },
          //     { id: "69bd48389f35a4d48ab567d8", title: "12 Months", price: "₹81,000" }
          // ],
          rtp: [
            {
              id: "69de2a9b2c33128dc42cae2f",
              title: "1 Month",
              price: "₹9,000",
            },
            {
              id: "69de2a872c33128dc42cae2d",
              title: "3 Months",
              price: "₹29,000",
            },
            {
              id: "69de2a682c33128dc42cae17",
              title: "6 Months",
              price: "₹52,000",
            },
            {
              id: "69de29c52c33128dc42cadda",
              title: "12 Months (Best Value)",
              price: "₹61,000",
            },
          ],
        },
        premium: {
          premium: [
            {
              id: "69de31982c33128dc42cb3f7",
              title: "1 Month Plan",
              price: "₹3,700",
            },
            {
              id: "69de31af2c33128dc42cb3fe",
              title: "3 Months Plan",
              price: "₹9,000 (₹2,900/month)",
            },
            {
              id: "69de31cc2c33128dc42cb416",
              title: "6 Months Plan",
              price: "₹15,700 (₹2,616/month approx.)",
            },
            // { id: "69de322e2c33128dc42cb46a", title: "9 Months Plan", price: "₹21,700 (₹2,411/month approx.)" },
            {
              id: "69de32492c33128dc42cb46f",
              title: "12 Months Plan (Best Value)",
              price: "₹27,000 (₹2,250/month)",
            },
          ],
        },
      });
    } else {
      setPricingData({
        gym: {
          /*
                    male: [
                        { id: "69b7e594f78450f0afc197ce", title: "1 Month", price: "₹2,000" },
                        { id: "69b7e5c7f78450f0afc197d0", title: "3 Months", price: "₹5,000" },
                        { id: "69b7e609f78450f0afc197d2", title: "6 Months", price: "₹8,000" },
                        { id: "69b7e62df78450f0afc197d4", title: "12 Months", price: "₹12,000" }
                    ],
                    female: [
                        { id: "69bd1b5dbc0fa93c777cd037", title: "1 Month", price: "₹1,800" },
                        { id: "69bd1bc2bc0fa93c777cd039", title: "3 Months", price: "₹4,500" },
                        { id: "69bd1be7bc0fa93c777cd03c", title: "6 Months", price: "₹7,000" },
                        { id: "69bd1c0cbc0fa93c777cd03e", title: "12 Months", price: "₹10,500" }
                    ],
                    couple: [
                        { id: "69bd1c49bc0fa93c777cd040", title: "3 Months", price: "₹8,500" },
                        { id: "69bd1c71bc0fa93c777cd042", title: "6 Months", price: "₹14,500" },
                        { id: "69bd1c95bc0fa93c777cd044", title: "12 Months", price: "₹20,000" }
                    ]
                    */
          gym: [
            { id: "gym_1m", title: "1 Month Plan", price: "₹3,700" },
            { id: "gym_3m", title: "3 Months Plan", price: "₹9,000" },
            { id: "gym_6m", title: "6 Months Plan", price: "₹15,700" },
            { id: "gym_9m", title: "9 Months Plan", price: "₹21,700" },
            {
              id: "gym_12m",
              title: "12 Months Plan (Best Value)",
              price: "₹27,000",
            },
          ],
        },
        zumba: {
          male: [
            {
              id: "69bd1cd7bc0fa93c777cd046",
              title: "1 Month",
              price: "₹2,500",
            },
            {
              id: "69bd1cf3bc0fa93c777cd048",
              title: "3 Months",
              price: "₹6,500",
            },
            {
              id: "69bd1d16bc0fa93c777cd04b",
              title: "6 Months",
              price: "₹11,000",
            },
            {
              id: "69bd1d36bc0fa93c777cd04d",
              title: "12 Months",
              price: "₹18,000",
            },
          ],
          female: [
            {
              id: "69bd1d67bc0fa93c777cd04f",
              title: "1 Month",
              price: "₹2,200",
            },
            {
              id: "69bd1dc2bc0fa93c777cd051",
              title: "3 Months",
              price: "₹5,500",
            },
            {
              id: "69bd1df6bc0fa93c777cd053",
              title: "6 Months",
              price: "₹10,000",
            },
            {
              id: "69bd1e17bc0fa93c777cd055",
              title: "12 Months",
              price: "₹16,500",
            },
          ],
          couple: [
            {
              id: "69bd1e40bc0fa93c777cd058",
              title: "3 Months",
              price: "₹11,000",
            },
            {
              id: "69bd1e63bc0fa93c777cd05a",
              title: "6 Months",
              price: "₹29,000",
            },
            {
              id: "69bd1e7ebc0fa93c777cd05c",
              title: "12 Months",
              price: "₹30,000",
            },
          ],
        },
        yoga: {
          male: [
            {
              id: "69bd1eb2bc0fa93c777cd05e",
              title: "1 Month",
              price: "₹1,200",
            },
            {
              id: "69bd1ed3bc0fa93c777cd060",
              title: "3 Months",
              price: "₹3,200",
            },
            {
              id: "69bd1eeebc0fa93c777cd062",
              title: "6 Months",
              price: "₹7,200",
            },
            {
              id: "69bd1f0abc0fa93c777cd064",
              title: "12 Months",
              price: "₹10,000",
            },
          ],
          female: [
            {
              id: "69bd1f3bbc0fa93c777cd066",
              title: "1 Month",
              price: "₹1,000",
            },
            {
              id: "69bd1f5abc0fa93c777cd069",
              title: "3 Months",
              price: "₹2,800",
            },
            {
              id: "69bd1f80bc0fa93c777cd06b",
              title: "6 Months",
              price: "₹6,800",
            },
            {
              id: "69bd1fa0bc0fa93c777cd06d",
              title: "12 Months",
              price: "₹9,000",
            },
          ],
          couple: [
            {
              id: "69bd1fe0bc0fa93c777cd06f",
              title: "3 Months",
              price: "₹5,500",
            },
            {
              id: "69bd1fffbc0fa93c777cd071",
              title: "6 Months",
              price: "₹13,000",
            },
            {
              id: "69bd2017bc0fa93c777cd073",
              title: "12 Months",
              price: "₹18,000",
            },
          ],
        },
        rtp: {
          // male: [
          //     { id: "69bd20e7bc0fa93c777cd078", title: "1 Month", price: "₹9,000" },
          //     { id: "69bd210bbc0fa93c777cd07a", title: "3 Months", price: "₹23,000" },
          //     { id: "69bd2124bc0fa93c777cd07c", title: "6 Months", price: "₹39,000" },
          //     { id: "69bd213cbc0fa93c777cd07e", title: "12 Months", price: "₹49,000" }
          // ],
          // female: [
          //     { id: "69bd2161bc0fa93c777cd080", title: "1 Month", price: "₹9,000" },
          //     { id: "69bd217dbc0fa93c777cd082", title: "3 Months", price: "₹23,000" },
          //     { id: "69bd219dbc0fa93c777cd084", title: "6 Months", price: "₹39,000" },
          //     { id: "69bd21b3bc0fa93c777cd087", title: "12 Months", price: "₹49,000" }
          // ],
          // couple: [
          //     { id: "69bd21e1bc0fa93c777cd089", title: "6 Months", price: "₹63,000" },
          //     { id: "69bd21f9bc0fa93c777cd08b", title: "12 Months", price: "₹81,000" }
          // ]
          rtp: [
            {
              id: "69de286bcbb25e5981236b36",
              title: "1 Month",
              price: "₹9,000",
            },
            {
              id: "69de2896cbb25e5981236b38",
              title: "3 Months",
              price: "₹29,000",
            },
            {
              id: "69de28accbb25e5981236b3a",
              title: "6 Months",
              price: "₹52,000",
            },
            {
              id: "69de28c2cbb25e5981236b3d",
              title: "12 Months (Best Value)",
              price: "₹61,000",
            },
          ],
        },
        premium: {
          premium: [
            {
              id: "69de32f7cbb25e5981236bd7",
              title: "1 Month Plan",
              price: "₹3,700",
            },
            {
              id: "69de32e1cbb25e5981236bd5",
              title: "3 Months Plan",
              price: "₹9,000 (₹2,900/month)",
            },
            {
              id: "69de32c6cbb25e5981236bd3",
              title: "6 Months Plan",
              price: "₹15,700 (₹2,616/month approx.)",
            },
            // { id: "69de32a0cbb25e5981236bd1", title: "9 Months Plan", price: "₹21,700 (₹2,411/month approx.)" },
            {
              id: "69de3273cbb25e5981236bcf",
              title: "12 Months Plan (Best Value)",
              price: "₹27,000 (₹2,250/month)",
            },
          ],
        },
      });
    }
  }, []);

  const handleMainSelect = (plan) => {
    if (plan.id === "premium" || plan.id === "rtp") {
      setSelections({
        ...selections,
        plan: plan.title,
        program: plan.title,
        programId: plan.id,
        type: plan.title,
        typeId: plan.id,
      });
      setSubStep("duration");
    }
  };

  const handleDurationSelect = (duration) => {
    const finalTitle =
      selections.plan === "Premium Membership"
        ? `${selections.plan} (${duration.title} @ ${duration.price})`
        : `${selections.program} - ${selections.type} (${duration.title} @ ${duration.price})`;
    onSelect({
      title: finalTitle,
      details: {
        ...selections,
        duration: duration.title,
        price: duration.price,
        itemId: duration.id,
      },
    });
  };

  const goBack = () => {
    if (subStep === "duration") {
      setSubStep("main");
    } else onBack();
  };

  const Card = ({ item, onClick, showPrice }) => (
    <div onClick={() => onClick(item)} className="plan-card group">
      <div
        className={`flex items-start ${showPrice ? "justify-between" : "justify-end"}`}
      >
        {showPrice && (
          <div className="icon-circle group-hover:bg-blue-600 group-hover:text-white transition-colors">
            💰
          </div>
        )}
        {item.id === "premium" && (
          <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Popular
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
        {item.description && (
          <p className="text-slate-500 text-sm leading-relaxed">
            {item.description}
          </p>
        )}
        {showPrice && (
          <p className="text-blue-600 font-bold text-lg mt-2">{item.price}</p>
        )}
      </div>
      <div className="mt-auto pt-4 flex items-center text-blue-600 font-bold text-sm">
        Select
        <svg
          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  );

  const getStepInfo = () => {
    switch (subStep) {
      case "main":
        return {
          title: "Choose Your Path",
          desc: "Select a plan that works best for your fitness goals.",
        };
      case "program":
        return { title: "Select Program", desc: selections.plan };
      case "type":
        return { title: "Select Membership Type", desc: selections.program };
      case "duration":
        return {
          title: "Choose Duration",
          desc: `${selections.program} for ${selections.type}`,
        };
      default:
        return {};
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
        <div className="text-center mb-6 sm:mb-10 w-full">
          <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-center mb-1 sm:mb-2">
            <button
              type="button"
              onClick={goBack}
              aria-label="Go back"
              className="absolute left-2 sm:left-4 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all border-none bg-white/50 backdrop-blur-sm w-9 h-9 sm:w-10 sm:h-10 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <h2 className="text-lg sm:text-3xl font-black text-slate-900 leading-[1.2] uppercase tracking-tight px-10 sm:px-12">
              {stepInfo.title}
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] sm:text-sm max-w-[280px] sm:max-w-lg mx-auto font-bold uppercase tracking-widest opacity-60 leading-relaxed">
            {stepInfo.desc}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-3 sm:gap-6 mb-10 w-full max-w-7xl mx-auto px-2 sm:px-4">
          {subStep === "main" &&
            mainPlans.map((p) => (
              <div key={p.id} className="w-full sm:w-[350px] flex">
                <Card item={p} onClick={handleMainSelect} />
              </div>
            ))}

          {subStep === "duration" &&
            pricingData[selections.programId]?.[selections.typeId]?.map((d) => (
              <div
                key={d.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[230px] flex"
              >
                <Card item={d} onClick={handleDurationSelect} showPrice />
              </div>
            ))}

          {subStep === "duration" &&
            (selections.programId === "rtp" ||
              selections.programId === "premium") && (
              <div className="w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 mb-8 border border-white/40 shadow-xl overflow-hidden relative group mt-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Included in this Membership
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {mainPlans
                    .find((p) => p.id === selections.programId)
                    ?.features?.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-slate-600 text-sm sm:text-[15px] font-semibold leading-snug group-hover/item:text-slate-900 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </div>
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-all border-none bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl cursor-pointer shadow-sm hover:shadow-md mx-auto mb-4"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to {subStep === "main" ? "Photo Capture" : "Previous Selection"}
        </button>
      </div>
    </div>
  );
}
