import axios from "axios";

// Define your base URL
export const API_URL = import.meta.env.VITE_API_BASE_URL;
// Create an Axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  // Only add Authorization header if token exists and the request is NOT for the signup endpoint
  if (token && !config.url.includes("/auth/signup")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
