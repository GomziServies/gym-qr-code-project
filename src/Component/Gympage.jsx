import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance, publicAxiosInstance } from "../config/api";
import ProfileView from "./ProfileView";
import PhotoCapture from "./PhotoCapture";
import PlanSelection from "./PlanSelection";
import TermsAndConditions from "./TermsAndConditions";
import PaymentSuccess from "./PaymentSuccess";
import LoginModal from "./Loginmodel";
import logo from "../assets/gomzi.webp";

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function GymPage() {
    // 1. Initialize isLoggedIn from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem("fg_group_user_authorization");
    });
    const [showLogin, setShowLogin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [view, setView] = useState("form");
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
        branch: "", // Added branch field
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        pin_code: ""
    });

    // Location API states
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [profileData, setProfileData] = useState(() => {
        const stored = localStorage.getItem("user_info");
        if (!stored) return null;
        try {
            const parsed = JSON.parse(stored);
            return parsed.user ? parsed.user : parsed;
        } catch (e) {
            return null;
        }
    });

    const [capturedImage, setCapturedImage] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planSubStep, setPlanSubStep] = useState("main");
    const [planSelections, setPlanSelections] = useState({
        plan: "",
        program: "",
        programId: "",
        type: "",
        typeId: ""
    });
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    // 2. Load stored data into form if logged in
    useEffect(() => {
        if (isLoggedIn && profileData) {
            const addr = profileData.address || {};
            const isAddrObj = typeof addr === 'object' && addr !== null;

            const country = isAddrObj ? (addr.country || "") : "";
            const state = isAddrObj ? (addr.state || "") : "";
            const city = isAddrObj ? (addr.city || "") : "";

            let street = isAddrObj ? (addr.address_line_1 || "") : (profileData.address || "");
            let currentCity = city;
            let currentState = state;
            let currentCountry = country;
            let currentPin = isAddrObj ? (addr.pin_code || "") : "";

            // Smart Split: If street has commas and other fields are empty, try to extract them
            if (street.includes(",") && !currentCity && !currentState) {
                const parts = street.split(",").map(p => p.trim());
                if (parts.length >= 4) {
                    // Assuming format: Street, City, State, Pin, Country
                    street = parts[0];
                    if (!currentCity) currentCity = parts[1];
                    if (!currentState) currentState = parts[2];
                    if (!currentPin && parts[3]) currentPin = parts[3].replace(/\D/g, '');
                    if (!currentCountry && parts[4]) currentCountry = parts[4];
                }
            }

            setForm(prev => ({
                ...prev,
                first_name: profileData.first_name || "",
                last_name: profileData.last_name || "",
                mobile: profileData.mobile || "",
                email: profileData.email || "",
                branch: profileData.branch || "", // Set branch from profileData
                address_line_1: street,
                address_line_2: isAddrObj ? (addr.address_line_2 || "") : "",
                city: currentCity,
                state: currentState,
                country: currentCountry,
                pin_code: currentPin
            }));

            // Fetch dependent data for pre-filled values
            if (currentCountry) fetchStates(currentCountry);
            if (currentCountry && currentState) fetchCities(currentCountry, currentState);
        }
    }, [isLoggedIn, profileData]);
    // 3. Fetch latest profile data from API when logged in
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log("[GymPage] Fetching latest profile data...");
                const response = await axiosInstance.get("/account/profile");
                const resp = response.data;
                if (resp && resp.data && resp.data.user) {
                    setProfileData(resp.data.user);
                    // Sync with localStorage
                    localStorage.setItem("user_info", JSON.stringify(resp.data));
                }
            } catch (error) {
                console.error("[GymPage] Error fetching profile:", error);
            }
        };

        if (isLoggedIn) {
            fetchUserProfile();
            fetchCountries();
            fetchFitnessPlans();
        }
    }, [isLoggedIn]);

    const [availablePlans, setAvailablePlans] = useState([]);

    const fetchFitnessPlans = async () => {
        try {
            const response = await publicAxiosInstance.get('/fitness-plans');
            if (response.data && response.data.data) {
                setAvailablePlans(response.data.data);
            }
        } catch (error) {
            console.error('[GymPage] Error fetching fitness plans:', error);
        }
    };

    // Location API Functions
    const fetchCountries = async () => {
        setLoadingCountries(true);
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries');
            const data = await response.json();
            if (data && data.data) {
                setCountries(data.data.map(c => ({ name: c.country, iso2: c.iso2 })));
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoadingCountries(false);
        }
    };

    const fetchStates = async (countryName) => {
        if (!countryName) return;
        setLoadingStates(true);
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: countryName }),
            });
            const data = await response.json();
            if (data && data.data && data.data.states) {
                setStates(data.data.states);
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchCities = async (countryName, stateName) => {
        if (!countryName || !stateName) return;
        setLoadingCities(true);
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: countryName, state: stateName }),
            });
            const data = await response.json();
            if (data && data.data) {
                setCities(data.data);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };

    const fetchDetailsByPincode = async (pincode) => {
        if (pincode.length !== 6) return;

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data && data[0] && data[0].Status === "Success") {
                const postOffice = data[0].PostOffice[0];
                const state = postOffice.State;
                const city = postOffice.District;
                const country = "India";

                // Update form state
                setForm(prev => ({
                    ...prev,
                    country: country,
                    state: state,
                    city: city
                }));

                // Fetch dependent data for dropdowns
                if (country) fetchStates(country);
                if (country && state) fetchCities(country, state);
            }
        } catch (error) {
            console.error('Error fetching details by pincode:', error);
        }
    };

    const handleLoginClose = () => {
        setShowLogin(false);
    };

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setProfileData(userData);
        setShowLogin(false);
    };

    const handleChange = (e) => {
        if (!isLoggedIn) {
            setShowLogin(true);
            return;
        }
        const { name, value } = e.target;

        if (name === "country") {
            setForm(prev => ({ ...prev, country: value, state: "", city: "" }));
            setStates([]);
            setCities([]);
            fetchStates(value);
        } else if (name === "state") {
            setForm(prev => ({ ...prev, state: value, city: "" }));
            setCities([]);
            fetchCities(form.country, value);
        } else if (name === "pin_code") {
            const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
            setForm(prev => ({ ...prev, pin_code: sanitizedValue }));
            if (sanitizedValue.length === 6) {
                fetchDetailsByPincode(sanitizedValue);
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleFieldClick = () => {
        if (!isLoggedIn) setShowLogin(true);
    };

    const handleSubmit = async () => {

        if (!form.first_name?.trim()) {
            toast.error("Please enter First Name");
            return;
        }
        if (!form.last_name?.trim()) {
            toast.error("Please enter Last Name");
            return;
        }
        if (!form.mobile?.trim()) {
            toast.error("Please enter Mobile Number");
            return;
        }
        if (form.mobile.length !== 10) {
            toast.error("Please enter a valid 10-digit Mobile Number");
            return;
        }
        if (!form.email?.trim()) {
            toast.error("Please enter Email ID");
            return;
        }
        if (!form.branch?.trim()) {
            toast.error("Please select a Branch");
            return;
        }
        if (!form.address_line_1?.trim()) {
            toast.error("Please enter Address 1");
            return;
        }
        if (!form.address_line_2?.trim()) {
            toast.error("Please enter Address 2");
            return;
        }
        if (!form.country?.trim()) {
            toast.error("Please select a Country");
            return;
        }
        if (!form.state?.trim()) {
            toast.error("Please select a State");
            return;
        }
        if (!form.city?.trim()) {
            toast.error("Please select a City");
            return;
        }
        if (!form.pin_code?.trim()) {
            toast.error("Please enter Pin Code");
            return;
        }
        try {
            // Save to backend
            console.log("[GymPage] Saving profile data to backend...");
            await axiosInstance.post("/account/update-profile", {
                first_name: form.first_name,
                last_name: form.last_name,
                mobile: form.mobile,
                email: form.email,
                branch: form.branch, // Added branch to API call
                address_line_1: form.address_line_1,
                address_line_2: form.address_line_2,
                city: form.city,
                state: form.state,
                country: form.country,
                pin_code: form.pin_code
            });

            const consolidatedAddress = {
                address_line_1: form.address_line_1,
                address_line_2: form.address_line_2,
                city: form.city,
                state: form.state,
                country: form.country,
                pin_code: form.pin_code
            };
            setProfileData({
                ...form,
                name: `${form.first_name} ${form.last_name}`.trim(),
                address: consolidatedAddress
            });
            setView("photo");
        } catch (error) {
            console.error("[GymPage] Error saving profile:", error);
            toast.error("Failed to save profile. Please try again.");
        }

    };

    const handlePhotoSubmit = async (image) => {
        // If image is a data URL (Base64), upload it
        if (image && image.startsWith("data:image")) {
            try {
                console.log("[GymPage] Uploading new captured photo...");

                // 1. Convert Base64 to Blob
                const base64Data = image.split(",")[1];
                const contentType = image.split(",")[0].split(":")[1].split(";")[0];
                const byteCharacters = atob(base64Data);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                const blob = new Blob(byteArrays, { type: contentType });
                const file = new File([blob], "profile_photo.jpg", { type: contentType });

                // 2. Upload to /file-upload
                const formDataForUpload = new FormData();
                formDataForUpload.append("files", file);
                const uploadResponse = await axiosInstance.post("/file-upload", formDataForUpload);
                const photoUrl = uploadResponse.data.data.fileURLs[0];

                // 3. Update Profile via API
                console.log("[GymPage] Updating profile with new photo URL:", photoUrl);
                await axiosInstance.post("/account/update-profile", {
                    profile_image: photoUrl,
                });

                // 4. Update local profile data to stay in sync
                setProfileData(prev => ({ ...prev, profile_image: photoUrl }));
                setCapturedImage(image);
                setView("plan");

            } catch (error) {
                console.error("[GymPage] Error uploading photo or updating profile:", error);
                toast.error("Failed to save your photo. Please try again.");
            }
        } else {
            // If it's already a URL or null, just proceed
            setCapturedImage(image);
            setView("plan");
        }
    };

    const handlePlanSelect = async (plan) => {
        setSelectedPlan(plan);

        try {
            console.log("[GymPage] Adding plan to cart:", plan);
            const { programId, duration, price, itemId } = plan.details;

            const item_type = programId === 'rtp' ? 'PT_PLAN' : 'GYM_MEMBERSHIP';

            const durationInMonths = parseInt(duration);
            const amount = parseInt(price.replace(/[^\d]/g, ''));

            console.log(`[GymPage] Searching for: type=${item_type}, duration=${durationInMonths}, amount=${amount}, itemId=${itemId}`);

            let matchedPlan = null;

            // 1. Try using the itemId passed from PlanSelection if it looks like a MongoDB ID
            if (itemId && itemId.length === 24) {
                console.log("[GymPage] Using provided itemId:", itemId);
                matchedPlan = { _id: itemId };
            } else {
                console.log("[GymPage] No valid itemId provided, attempting matching...");

                // 2. Fallback to manual matching
                matchedPlan = availablePlans.find(p =>
                    p.duration === durationInMonths && p.amount === amount
                );

                if (!matchedPlan) {
                    console.log("[GymPage] Strict match failed, trying keyword match...");
                    matchedPlan = availablePlans.find(p => {
                        const name = (p.plan_name || "").toLowerCase();
                        const hasDuration = p.duration === durationInMonths;

                        let nameMatches = false;
                        if (programId === 'rtp') {
                            nameMatches = name.includes('rtp');
                        } else if (programId === 'gym') {
                            nameMatches = name.includes('gym') || name.includes('mambers');
                        } else if (programId === 'zumba') {
                            nameMatches = name.includes('zumba');
                        } else if (programId === 'yoga') {
                            nameMatches = name.includes('yoga');
                        }

                        return hasDuration && nameMatches;
                    });
                }

                if (!matchedPlan) {
                    console.log("[GymPage] Keyword match failed, trying duration-only match...");
                    matchedPlan = availablePlans.find(p => p.duration === durationInMonths);
                }
            }

            if (matchedPlan) {
                console.log("[GymPage] Proceeding with plan ID:", matchedPlan._id);

                // Update selectedPlan with the correct ID for payment processing
                const updatedPlan = {
                    ...plan,
                    details: {
                        ...plan.details,
                        itemId: matchedPlan._id
                    }
                };
                setSelectedPlan(updatedPlan);

                const cartResponse = await axiosInstance.post('/order-cart/add-item', {
                    item_id: matchedPlan._id,
                    item_type: item_type,
                    quantity: 1
                });
                console.log("[GymPage] Add to cart success:", cartResponse.data);
            } else {
                console.warn("[GymPage] Could not find a matching plan in the database for:", plan);
                // For made-up plans that don't exist in DB, payment will likely fail with 400
            }
        } catch (error) {
            console.error("[GymPage] Error adding to cart:", error);
        }

        setView("terms");
    };

    const handleTermsAgreed = async () => {
        if (!selectedPlan?.details?.itemId) {
            toast.error("Invalid plan selection");
            return;
        }

        setIsPaymentLoading(true);
        try {
            console.log("[GymPage] Initiating payment for plan:", selectedPlan.details.itemId);

            // 1. Create order on backend
            const response = await axiosInstance.post('/fitness-plan/create-order', {
                plan_id: selectedPlan.details.itemId
            });

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
                        setIsPaymentLoading(false);
                        handlePaymentSuccess(response);
                    },
                    prefill: orderDetails.prefill,
                    notes: orderDetails.notes,
                    theme: {
                        color: "#2563eb"
                    },
                    modal: {
                        ondismiss: function () {
                            setIsPaymentLoading(false);
                        }
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    toast.error(response.error.description);
                    setIsPaymentLoading(false);
                });
                rzp.open();
            } else {
                toast.error(response.data.message || "Failed to initiate payment");
                setIsPaymentLoading(false);
            }
        } catch (error) {
            console.error("[GymPage] Payment Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
            setIsPaymentLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        setView("success");
    };

    const handleSuccessProceed = () => {
        setView("profile");
    };

    const fieldClass = (active, internalDisabled = false) =>
        `w-full border rounded-lg px-4 py-2.5 text-sm outline-none placeholder-slate-400 transition-all ${active && !internalDisabled
            ? "bg-white border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
        }`;

    return (
        <div className="h-screen relative overflow-hidden" style={{ margin: 0, padding: 0 }}>

            {/* ── PREMIUM LIGHT BACKGROUND ── */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&auto=format&fit=crop&q=80')`,
                        filter: 'blur(20px) brightness(1.05)',
                        transform: 'scale(1.1)'
                    }}
                />
                <div className="absolute inset-0 bg-white/75" />
            </div>

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-12 h-16 flex items-center justify-between shadow-sm">
                <a href="/" className="flex items-center gap-2 no-underline">
                    <img src={logo} alt="Gomzi Logo" className="h-10 w-auto object-contain " />
                </a>

                <div className="flex items-center gap-3">
                    {!isLoggedIn ? (
                        <button onClick={() => setShowLogin(true)}
                            className="text-sm font-medium text-white bg-blue-600 rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-700 transition-colors shadow-sm">
                            Login
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white select-none hover:bg-blue-700 transition-all shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                                    <button
                                        onClick={() => { setView("profile"); setDropdownOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer border-none bg-transparent text-left"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        Profile
                                    </button>
                                    <div className="border-t border-slate-100 mx-2" />
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("fg_group_user_authorization");
                                            localStorage.removeItem("user_info");
                                            setIsLoggedIn(false);
                                            setDropdownOpen(false);
                                            setView("form");
                                            setForm({
                                                first_name: "",
                                                last_name: "",
                                                mobile: "",
                                                email: "",
                                                branch: "", // Reset branch on logout
                                                address_line_1: "",
                                                address_line_2: "",
                                                city: "",
                                                state: "",
                                                country: "",
                                                pin_code: ""
                                            });
                                            setProfileData(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent text-left"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* ── CONTENT SECTION ── */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto relative z-10">
                {view === "form" && (
                    <div className="flex flex-col items-center justify-center px-4 py-6 min-h-full">
                        <div className="text-center w-full max-w-lg mb-6">
                            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">Membership Registration</h1>
                            <p className="text-slate-500 text-xs sm:text-sm">Join us and start your fitness journey today</p>
                        </div>

                        <div className="w-full max-w-lg">
                            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-[2rem] shadow-2xl border border-white/50 text-left">

                                {!isLoggedIn && (
                                    <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-2">
                                        <span className="text-amber-500 text-sm">⚠</span>
                                        <p className="text-amber-700 text-xs font-medium">Please login first to fill this form</p>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                                            <input type="text" name="first_name" value={form.first_name}
                                                onChange={handleChange} onClick={handleFieldClick}
                                                readOnly={!isLoggedIn} placeholder="First name"
                                                className={fieldClass(isLoggedIn)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                                            <input type="text" name="last_name" value={form.last_name}
                                                onChange={handleChange} onClick={handleFieldClick}
                                                readOnly={!isLoggedIn} placeholder="Last name"
                                                className={fieldClass(isLoggedIn)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
                                        <input type="tel" name="mobile" value={form.mobile}
                                            onChange={handleChange} onClick={handleFieldClick}
                                            readOnly={!isLoggedIn} placeholder="Enter your mobile number" maxLength={10}
                                            className={fieldClass(isLoggedIn)} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email ID</label>
                                        <input type="email" name="email" value={form.email}
                                            onChange={handleChange} onClick={handleFieldClick}
                                            readOnly={!isLoggedIn} placeholder="Enter your email address"
                                            className={fieldClass(isLoggedIn)} />
                                    </div>

                                    {/* Branch Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch</label>
                                        <select
                                            name="branch"
                                            value={form.branch}
                                            onChange={handleChange}
                                            onClick={handleFieldClick}
                                            disabled={!isLoggedIn}
                                            className={fieldClass(isLoggedIn)}
                                        >
                                            <option value="">Select Branch</option>
                                            <option value="Vesu">Vesu</option>
                                            <option value="Katargam">Katargam</option>
                                            <option value="Adjan-Branch">Adjan-Branch</option>
                                        </select>
                                    </div>

                                    {/* ADDRESS SECTION */}
                                    <div className="space-y-4 pt-2">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Address 1</label>
                                            <input type="text" name="address_line_1" value={form.address_line_1}
                                                onChange={handleChange} onClick={handleFieldClick}
                                                readOnly={!isLoggedIn} placeholder="Enter address line 1"
                                                className={fieldClass(isLoggedIn)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Address 2</label>
                                            <input type="text" name="address_line_2" value={form.address_line_2}
                                                onChange={handleChange} onClick={handleFieldClick}
                                                readOnly={!isLoggedIn} placeholder="Enter address line 2"
                                                className={fieldClass(isLoggedIn)} />
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
                                                <select name="country" value={form.country}
                                                    onChange={handleChange} onClick={handleFieldClick}
                                                    disabled={!isLoggedIn || loadingCountries}
                                                    className={fieldClass(isLoggedIn, loadingCountries)}>
                                                    <option value="">Select Country</option>
                                                    {countries.map((c, i) => (
                                                        <option key={i} value={c.name}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                                                <select name="state" value={form.state}
                                                    onChange={handleChange} onClick={handleFieldClick}
                                                    disabled={!isLoggedIn || loadingStates || !form.country}
                                                    className={fieldClass(isLoggedIn, loadingStates || !form.country)}>
                                                    <option value="">Select State</option>
                                                    {states.map((s, i) => (
                                                        <option key={i} value={s.name}>{s.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                                                <select name="city" value={form.city}
                                                    onChange={handleChange} onClick={handleFieldClick}
                                                    disabled={!isLoggedIn || loadingCities || !form.state}
                                                    className={fieldClass(isLoggedIn, loadingCities || !form.state)}>
                                                    <option value="">Select City</option>
                                                    {cities.map((city, i) => (
                                                        <option key={i} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Pin Code</label>
                                            <input type="text" name="pin_code" value={form.pin_code}
                                                onChange={handleChange} onClick={handleFieldClick}
                                                readOnly={!isLoggedIn} placeholder="Pin code"
                                                className={fieldClass(isLoggedIn)} />
                                        </div>
                                    </div>

                                    <button
                                        disabled={!isLoggedIn}
                                        onClick={handleSubmit}
                                        className="w-full bg-blue-600 text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === "photo" && (
                    <PhotoCapture
                        initialImage={profileData?.profile_image}
                        onNext={handlePhotoSubmit}
                        onBack={() => setView("form")}
                    />
                )}

                {view === "plan" && (
                    <PlanSelection
                        subStep={planSubStep}
                        setSubStep={setPlanSubStep}
                        selections={planSelections}
                        setSelections={setPlanSelections}
                        onSelect={handlePlanSelect}
                        onBack={() => setView("photo")}
                    />
                )}

                {view === "terms" && (
                    <TermsAndConditions
                        onProceed={handleTermsAgreed}
                        onBack={() => setView("plan")}
                        isLoading={isPaymentLoading}
                    />
                )}

                {view === "success" && (
                    <PaymentSuccess
                        planData={selectedPlan}
                        userEmail={profileData?.email}
                        onProceed={handleSuccessProceed}
                    />
                )}

                {view === "profile" && (
                    <ProfileView
                        data={{
                            ...(profileData || {}),
                            plan: selectedPlan?.title,
                            planDetails: selectedPlan?.details
                        }}
                        image={capturedImage}
                        onBack={() => setView("form")}
                        onCancel={() => setView("form")}
                        onEdit={(newData) => {
                            setProfileData(prev => ({ ...prev, ...newData }));
                        }}
                    />
                )}
            </div>

            <LoginModal
                isOpen={showLogin}
                onClose={handleLoginClose}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}