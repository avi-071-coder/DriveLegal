import axios from "axios";

let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Defensively remove any trailing slash to prevent double-slash issues (e.g., /api/laws becoming //api/laws)
if (baseUrl.endsWith("/")) {
  baseUrl = baseUrl.slice(0, -1);
}

console.log("DriveLegal API Base URL Initialized:", baseUrl);

const API = axios.create({
  baseURL: baseUrl,
});

export default API;