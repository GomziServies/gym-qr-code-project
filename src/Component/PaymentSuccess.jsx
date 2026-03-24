import React from "react";

export default function PaymentSuccess({ planData, userEmail, onProceed }) {
    const [emailSent, setEmailSent] = React.useState(false);
    const [isSending, setIsSending] = React.useState(true);

    React.useEffect(() => {
        // Simulate email sending process
        const timer = setTimeout(() => {
            setIsSending(false);
            setEmailSent(true);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    const transactionId = "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const today = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 min-h-full">
            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 flex flex-col">
                
                {/* Success Banner */}
                <div className="bg-emerald-500 p-8 sm:p-10 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 animate-bounce">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Payment Successful!</h2>
                        <p className="text-emerald-50 opacity-90 text-xs sm:text-sm">Welcome to the Fitness With Gomzi</p>
                    </div>
                </div>

                <div className="p-8 sm:p-10 flex flex-col">
                    {/* Email Status Toast */}
                    <div className={`mb-6 p-3 rounded-xl flex items-center gap-3 transition-all duration-500 ${isSending ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                        {isSending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs font-bold uppercase tracking-wider">Sending Email Receipt...</span>
                            </>
                        ) : (
                            <>
                                <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center text-white p-0.5">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider line-clamp-1">Receipt sent to {userEmail}</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Payment Receipt</span>
                        <span className="text-slate-400 font-bold text-[10px]">{today}</span>
                    </div>

                    {/* Receipt Details */}
                    <div className="space-y-6 mb-10">
                        <div className="flex justify-between items-start border-b border-slate-50 pb-4">
                            <span className="text-slate-500 font-medium">Selected Program</span>
                            <span className="text-slate-900 font-bold text-right">{planData?.details?.program || "Membership Plan"}</span>
                        </div>
                        <div className="flex justify-between items-start border-b border-slate-50 pb-4">
                            <span className="text-slate-500 font-medium">Membership Type</span>
                            <span className="text-slate-900 font-bold text-right">{planData?.details?.type || "Standard"}</span>
                        </div>
                        <div className="flex justify-between items-start border-b border-slate-50 pb-4">
                            <span className="text-slate-500 font-medium">Duration</span>
                            <span className="text-slate-900 font-bold text-right">{planData?.details?.duration || "12 Months"}</span>
                        </div>
                        <div className="flex justify-between items-start border-b border-slate-50 pb-4">
                            <span className="text-slate-500 font-medium">Transaction ID</span>
                            <span className="text-blue-600 font-mono font-bold text-sm tracking-tighter">{transactionId}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-slate-900 font-bold text-xl uppercase tracking-tight">Amount Paid</span>
                            <span className="text-3xl font-bold text-emerald-600">{planData?.details?.price || "₹0.00"}</span>
                        </div>
                    </div>

                    <button 
                        onClick={onProceed}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98] cursor-pointer"
                    >
                        View My Profile
                    </button>
                    
                    <p className="text-center text-slate-400 text-[10px] mt-6 font-bold uppercase tracking-widest leading-relaxed">
                        A confirmation email and receipt <br/> has been sent to your registered email
                    </p>
                </div>

                {/* Decorative cutouts for receipt look */}
                <div className="flex justify-between px-4 h-4 bg-white relative -mt-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-slate-50/50 -translate-y-1/2" />
                    ))}
                </div>
            </div>
        </div>
    );
}
