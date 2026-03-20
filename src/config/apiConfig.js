const hostname = window.location.hostname.trim(); // Trimming whitespace from the hostname

let baseUrl = "http://localhost";
let fwgBaseUrl = "http://localhost:80";
let razorpayMerchantId = "rzp_test_F0TUZmabOwKkhe";
let environment = "development";

if (hostname === "gym-qr-code-project.vercel.app" || hostname === "https://gym-qr-code-project.vercel.app") {
  baseUrl = "https://api.fggroup.in";
  fwgBaseUrl = 'https://app-api.fggroup.in';
  environment = 'production'
  razorpayMerchantId = "rzp_live_WxBhDlHqqY0CYX";
} else if (hostname === "test.fggroup.in") {
  baseUrl = "https://dev-api.fggroup.in";
  fwgBaseUrl = 'https://fg-app-dev-api.fggroup.in';
} else {
  baseUrl = "https://dev-api.fggroup.in";
  // baseUrl = 'http://localhost:80';
  fwgBaseUrl = 'https://fg-app-dev-api.fggroup.in';
  // fwgBaseUrl = 'http://localhost:82';
}

const apiConfig = {
  BASE_URL: baseUrl,
  FWG_BASE_URL: fwgBaseUrl,
  RAZORPAY_MERCHANT_ID: razorpayMerchantId,
  environment
};

export default apiConfig;
