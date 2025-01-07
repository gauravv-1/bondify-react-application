import axios from "axios";

// Define your base URL
export const API_URL = "http://localhost:8081";

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
