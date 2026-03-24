import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function PaymentGateway({ planData, onPaymentSuccess, onBack }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");

    const handlePayment = async () => {
        if (!planData?.details?.itemId) {
            toast.error("Invalid plan selection");
            return;
        }

        setIsProcessing(true);
        try {
            const token = localStorage.getItem('fg_group_user_authorization');
            if (!token) {
                toast.error("Please login to continue");
                setIsProcessing(false);
                return;
            }

            // 1. Create order on backend
            // Using the endpoint from book-plan.js: /fitness-plan/create-order
            // Based on users.routes.js, it might be under /user/v1/fitness-plan/create-order
            // But Gympage.jsx uses axiosInstance which might have the base URL set.
            // Let's use a relative path if possible or full path if needed.
            // In Gympage.jsx it was: await axiosInstance.post('/user/v1/order-cart/add-item', ...)
            
            const response = await axios.post(
                'https://api.fggroup.in/user/v1/fitness-plan/create-order',
                { plan_id: planData.details.itemId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === 201) {
                const orderDetails = response.data.data;
                const options = {
                    key: orderDetails.key,
                    amount: orderDetails.amount,
                    currency: orderDetails.currency,
                    name: "Fitness With Gomzi",
                    description: orderDetails.description,
                    order_id: orderDetails.order_id,
                    handler: function (response) {
                        onPaymentSuccess(response);
                    },
                    prefill: orderDetails.prefill,
                    notes: orderDetails.notes,
                    theme: {
                        color: "#2563eb"
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    toast.error(response.error.description);
                    setIsProcessing(false);
                });
                rzp.open();
            } else {
                toast.error(response.data.message || "Failed to initiate payment");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 min-h-full">
            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/50">
                
                {/* Header */}
                <div className="bg-blue-600 p-6 sm:p-8 text-white text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-1">Complete Payment</h2>
                    <p className="text-blue-100 text-xs sm:text-sm">Secure Payment Gateway</p>
                </div>

                <div className="p-6 sm:p-8"> {/* Adjusted padding for responsiveness */}
                    {/* Order Summary */}
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8"> {/* Adjusted padding and margin */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-slate-500 font-medium text-sm sm:text-base">Order Summary</span> {/* Adjusted font size */}
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold uppercase">Pending</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="font-bold text-slate-800 text-base sm:text-lg">{planData?.title || "Membership Plan"}</h3> {/* Adjusted font size */}
                                <p className="text-slate-500 text-xs">Total Duration: {planData?.details?.duration || "Selected Plan"}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xl sm:text-2xl font-bold text-slate-900">{planData?.details?.price || "₹0.00"}</span> {/* Adjusted font size */}
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3 mb-6 sm:mb-8"> {/* Adjusted margin */}
                        <p className="text-sm font-bold text-slate-700 mb-3 sm:mb-4 px-1">Choose Payment Method</p> {/* Adjusted margin */}
                        
                        {[
                            { id: "upi", title: "UPI (Google Pay, PhonePe, Paytm)", icon: "📱" },
                            { id: "card", title: "Credit / Debit Card", icon: "💳" },
                            { id: "netbanking", title: "Net Banking", icon: "🏦" }
                        ].map((method) => (
                            <div 
                                key={method.id}
                                onClick={() => !isProcessing && setPaymentMethod(method.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                    paymentMethod === method.id 
                                    ? "border-blue-600 bg-blue-50" 
                                    : "border-slate-100 hover:border-slate-200 bg-white"
                                }`}
                            >
                                <div className="text-xl">{method.icon}</div>
                                <span className={`font-bold flex-1 ${paymentMethod === method.id ? "text-blue-700" : "text-slate-600"}`}>
                                    {method.title}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    paymentMethod === method.id ? "border-blue-600" : "border-slate-300"
                                }`}>
                                    {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        <button 
                            disabled={isProcessing}
                            onClick={handlePayment}
                            className={`w-full py-4 rounded-2xl font-bold text-white text-lg shadow-lg flex items-center justify-center transition-all ${
                                isProcessing 
                                ? "bg-blue-400 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 active:scale-95 cursor-pointer"
                            }`}
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Payment...
                                </>
                            ) : (
                                `Pay ${planData?.details?.price || ""} Now`
                            )}
                        </button>
                        
                        {!isProcessing && (
                            <button 
                                onClick={onBack}
                                className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer"
                            >
                                Cancel & Go Back
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                        🔒 SSL Secure Encrypted Payment
                    </p>
                </div>
            </div>
        </div>
    );
}
