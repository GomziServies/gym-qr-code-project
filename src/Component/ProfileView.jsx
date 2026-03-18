import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/api";

const fields = [
  {
    id: "first_name",
    label: "First Name",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    getValue: (data) => data.first_name || "Not Provided",
    full: false,
  },
  {
    id: "last_name",
    label: "Last Name",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    getValue: (data) => data.last_name || "Not Provided",
    full: false,
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.18-1.18a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    getValue: (data) => (data.mobile ? `+91 ${data.mobile}` : "Not Provided"),
    full: false,
  },
  {
    id: "email",
    label: "Email",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    getValue: (data) => data.email || "Not Provided",
    full: false,
  },
  {
    id: "address_line_1",
    label: "Address Line 1",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    getValue: (data) => {
      const addr = data.address || {};
      if (typeof addr === "string") return addr || "Not Provided";
      return addr.address_line_1 || "Not Provided";
    },
    full: true,
  },
  {
    id: "address_line_2",
    label: "Address Line 2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    getValue: (data) => {
      const addr = data.address || {};
      if (typeof addr === "string") return "";
      return addr.address_line_2 || "";
    },
    full: true,
  },
  {
    id: "city",
    label: "City",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    getValue: (data) => {
      const addr = data.address || {};
      if (typeof addr === "string") return "";
      return addr.city || "";
    },
    full: false,
  },
  {
    id: "state",
    label: "State",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
    getValue: (data) => {
      const addr = data.address || {};
      if (typeof addr === "string") return "";
      return addr.state || "";
    },
    full: false,
  },
  {
    id: "pin_code",
    label: "Pin Code",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v4" />
        <path d="M8 12h8" />
      </svg>
    ),
    getValue: (data) => {
      const addr = data.address || {};
      if (typeof addr === "string") return "";
      return addr.pin_code || "";
    },
    full: false,
  },
  {
    id: "country",
    label: "Country",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="15"
        height="15"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v4" />
        <path d="M8 12h8" />
      </svg>
    ),
    getValue: (data) => {
      const addr = data.address || {};
      if (typeof addr === "string") return "";
      return addr.country || "";
    },
    full: false,
  },
];

export default function ProfileView({
  data = {},
  image,
  onBack,
  onCancel,
  onEdit,
}) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [profile, setProfile] = useState(data);
  const [form, setForm] = useState({
    first_name:
      data.first_name ||
      (data.user && data.user.first_name) ||
      data.name?.split(" ")[0] ||
      "",
    last_name:
      data.last_name ||
      (data.user && data.user.last_name) ||
      data.name?.split(" ").slice(1).join(" ") ||
      "",
    mobile: data.mobile || "",
    email: data.email || "",
    country: data.address?.country || "",
    state: data.address?.state || "",
    city: data.address?.city || "",
    address_line_1:
      data.address?.address_line_1 ||
      (typeof data.address === "string" ? data.address : ""),
    address_line_2: data.address?.address_line_2 || "",
    pin_code: data.address?.pin_code || "",
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      console.log("[ProfileView] Fetching user data...");
      const response = await axiosInstance.get("/account/profile");
      const userData = response.data.data;
      if (userData && userData.user) {
        const u = userData.user;
        const joinedAddress = [
          u.address?.address_line_1,
          u.address?.address_line_2,
          u.address?.city,
          u.address?.state,
          u.address?.pin_code,
          u.address?.country,
        ]
          .filter(Boolean)
          .join(", ");
        const mappedData = {
          name: `${u.first_name || ""} ${u.last_name || ""}`.trim(),
          first_name: u.first_name || "",
          last_name: u.last_name || "",
          mobile: u.mobile || "",
          email: u.email || "",
          address: u.address || {},
          profile_image: u.profile_image,
        };
        setProfile(mappedData);
        setForm({
          first_name: mappedData.first_name,
          last_name: mappedData.last_name,
          mobile: mappedData.mobile,
          email: mappedData.email,
          country: "",
          state: "",
          city: "",
          address_line_1: joinedAddress,
          address_line_2: "",
          pin_code: "",
        });
        localStorage.setItem("user_info", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("[ProfileView] Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("fg_group_user_authorization")) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataForUpload = new FormData();
    formDataForUpload.append("files", file);

    try {
      setLoading(true);
      console.log("[ProfileView] Uploading photo...");
      const response = await axiosInstance.post(
        "/file-upload",
        formDataForUpload,
      );
      const photoUrl = response.data.data.fileURLs[0];

      await axiosInstance.post("/account/update-profile", {
        profile_image: photoUrl,
      });
      await fetchUserData();
    } catch (error) {
      toast.error("Error uploading profile photo");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (editing) {
      try {
        setLoading(true);
        console.log("[ProfileView] Updating profile:", form);
        const response = await axiosInstance.post("/account/update-profile", {
          first_name: form.first_name,
          last_name: form.last_name,
          mobile: form.mobile,
          email: form.email,
          country: form.country,
          state: form.state,
          city: form.city,
          address_line_1: form.address_line_1,
          address_line_2: form.address_line_2,
          pin_code: form.pin_code,
        });
        if (response.data.data) {
          await fetchUserData();
          onEdit?.(form);
        }
      } catch (error) {
        toast.error("Failed to update profile.");
      } finally {
        setLoading(false);
      }
    }
    setEditing(!editing);
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    fetchCountries();
    if (form.country) fetchStates(form.country);
    if (form.country && form.state) fetchCities(form.country, form.state);
  }, []);

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
      if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        const state = postOffice.State;
        const city = postOffice.District;
        const country = "India";
        // Reset dropdowns before updating
        setStates([]);
        setCities([]);
        setForm(prev => ({
          ...prev,
          country: country,
          state: state,
          city: city
        }));
        // Fetch dropdowns after form update
        setTimeout(() => {
          fetchStates(country);
          fetchCities(country, state);
        }, 0);
      } else {
        toast.error("Invalid pincode or no location found.");
      }
    } catch (error) {
      toast.error("Error fetching location by pincode.");
      console.error('Error fetching details by pincode:', error);
    }
  };

  const handleChange = (e) => {
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
      if (sanitizedValue.length === 6 && editing) {
        fetchDetailsByPincode(sanitizedValue);
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditClick = () => {
    const addr = profile.address || {};
    // If address is string, try to split
    let address_line_1 = "";
    let address_line_2 = "";
    let city = "";
    let state = "";
    let pin_code = "";
    let country = "";
    if (typeof addr === "string") {
      const parts = addr.split(",").map(p => p.trim());
      address_line_1 = parts[0] || "";
      address_line_2 = parts[1] || "";
      city = parts[2] || "";
      state = parts[3] || "";
      pin_code = parts[4] || "";
      country = parts[5] || "";
    } else {
      address_line_1 = addr.address_line_1 || "";
      address_line_2 = addr.address_line_2 || "";
      city = addr.city || "";
      state = addr.state || "";
      pin_code = addr.pin_code || "";
      country = addr.country || "";
    }
    setForm((f) => ({
      ...f,
      address_line_1,
      address_line_2,
      city,
      state,
      pin_code,
      country,
    }));
    // Sync dropdowns for edit mode
    if (country) fetchStates(country);
    if (country && state) fetchCities(country, state);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      mobile: profile.mobile || "",
      email: profile.email || "",
      country: profile.address?.country || "",
      state: profile.address?.state || "",
      city: profile.address?.city || "",
      address_line_1:
        typeof profile.address === "string"
          ? profile.address
          : profile.address?.address_line_1 || "",
      address_line_2: profile.address?.address_line_2 || "",
      pin_code: profile.address?.pin_code || "",
    });
    onCancel?.();
  };

  const displayData = editing
    ? form
    : { ...profile, memberSince: profile.memberSince || "Jan 2024" };

  return (
    <div
      style={{
        padding: "2rem 1rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Google Font */}
      <style>{`
        .pv-container { background: #fff; border: 0.5px solid #e5e7eb; border-radius: 2rem; padding: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 550px; }
        .pv-field-card { background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 1.25rem; padding: 16px; display: flex; align-items: flex-start; gap: 12px; }
        .pv-field-card:hover { border-color: #bfdbfe; background: #fff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .pv-btn-edit { padding: 14px; font-size: 14px; font-weight: 800; letter-spacing: 0.05em; background: #2563eb; color: #fff; border: none; border-radius: 1.25rem; cursor: pointer; width: 100%; transition: all 0.2s; }
        .pv-btn-edit:hover { background: #1d4ed8; transform: translateY(-2px); }
        .pv-btn-ghost { padding: 14px; font-size: 14px; font-weight: 800; background: #fff; color: #64748b; border: 1.5px solid #f1f5f9; border-radius: 1.25rem; cursor: pointer; width: 100%; transition: all 0.2s; }
        .pv-btn-ghost:hover { background: #f8fafc; color: #1e293b; }
        .pv-input { width: 100%; font-size: 14px; font-weight: 600; color: #111827; border: none; outline: none; background: transparent; padding: 2px 0; border-bottom: 2px solid #e2e8f0; }
        .pv-input:focus { border-bottom-color: #2563eb; }
      `}</style>

      <div className="pv-container">
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              padding: 4,
              background: "linear-gradient(135deg, #111827, #374151)",
              marginBottom: "1.25rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #fff",
                background: "#f8fafc",
                position: "relative",
              }}
            >
              <img
                src={
                  profile.profile_image
                    ? `https://files.fggroup.in/${profile.profile_image}`
                    : image ||
                      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&auto=format&fit=crop&q=80"
                }
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="animate-spin"
                    style={{
                      width: 20,
                      height: 20,
                      border: "2px solid #2563eb",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              <label
                htmlFor="pv-photo-upload"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "30%",
                  background: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  opacity: editing ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  width="16"
                  height="16"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <input
                  id="pv-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                  disabled={!editing}
                />
              </label>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#111827",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              borderRadius: 20,
              padding: "4px 12px",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
              }}
            />
            Active Member
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#111827",
              margin: "0 0 4px",
              letterSpacing: "-0.03em",
            }}
          >
            {`${displayData.first_name || ""} ${displayData.last_name || ""}`.trim() ||
              "Guest User"}
          </h1>
        </div>

        {/* Fields Grid */}
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            display: "grid",
            gridTemplateColumns: windowWidth < 480 ? "1fr" : "1fr 1fr",
            gap: 12,
            marginBottom: "1.25rem",
          }}
        >
          {fields.map((field) => {
            // For dropdown fields in edit mode
            if (editing && ["country", "state", "city"].includes(field.id)) {
              let options = [];
              let value = form[field.id] || "";
              let disabled = false;
              if (field.id === "country") {
                options = countries.map((c) => c.name);
                disabled = loadingCountries;
              } else if (field.id === "state") {
                options = states.map((s) => s.name || s.state);
                disabled = loadingStates || !form.country;
              } else if (field.id === "city") {
                options = cities;
                disabled = loadingCities || !form.state;
              }
              return (
                <div
                  key={field.id}
                  className="pv-field-card"
                  style={field.full || windowWidth < 480 ? { gridColumn: "1 / -1" } : {}}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#3b82f6" }}>{field.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 4 }}>{field.label}</div>
                    <select
                      className="pv-input"
                      name={field.id}
                      value={value}
                      onChange={handleChange}
                      disabled={disabled}
                    >
                      <option value="">Select {field.label}</option>
                      {options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            }
            // Pin code field in edit mode
            if (editing && field.id === "pin_code") {
              return (
                <div
                  key={field.id}
                  className="pv-field-card"
                  style={field.full || windowWidth < 480 ? { gridColumn: "1 / -1" } : {}}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#3b82f6" }}>{field.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 4 }}>{field.label}</div>
                    <input
                      className="pv-input"
                      type="text"
                      name="pin_code"
                      value={form.pin_code}
                      onChange={handleChange}
                      placeholder="Enter Pin Code"
                    />
                  </div>
                </div>
              );
            }
            // All other fields
            return (
              <div
                key={field.id}
                className="pv-field-card"
                style={field.full || windowWidth < 480 ? { gridColumn: "1 / -1" } : {}}
              >
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#3b82f6" }}>{field.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 4 }}>{field.label}</div>
                  {editing ? (
                    <input
                      className="pv-input"
                      value={form[field.id] || ""}
                      name={field.id}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label}`}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#111827",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: field.full ? "normal" : "nowrap",
                      }}
                    >
                      {field.getValue(displayData)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Membership Plan Details (Visible only when plan exists) */}
          {data.planDetails && (
            <div
              className="pv-field-card"
              style={{
                gridColumn: "1 / -1",
                background: "#fdfcfe",
                borderColor: "#f3e8ff",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "#f5f3ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#8b5cf6",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18"
                  height="18"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    color: "#7c3aed",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Current Membership
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">
                      {data.planDetails.program} ({data.planDetails.type})
                    </span>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {data.planDetails.price}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Duration: {data.planDetails.duration}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <button
            className="pv-btn-ghost"
            onClick={editing ? handleCancel : onBack}
          >
            {editing ? "Cancel" : "Back"}
          </button>
          <button
            className="pv-btn-edit"
            onClick={editing ? handleEditSave : handleEditClick}
            disabled={loading}
          >
            {loading ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
