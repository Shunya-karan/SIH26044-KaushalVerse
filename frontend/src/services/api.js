/**
 * KaushalVerse API service layer — PREPARED FOR FUTURE INTEGRATION ONLY.
 *
 * This project is a frontend-only prototype for a Smart India Hackathon submission.
 * No requests from this file are made to any real backend, database or auth server.
 * The axios instance below is scaffolded so a real backend can be plugged in later
 * by setting VITE_API_BASE_URL and wiring the functions below to real endpoints.
 */
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Example future endpoints (NOT wired to any real backend in this prototype):
// export const fetchStudentProfile = (id) => apiClient.get(`/students/${id}`);
// export const submitApplication = (payload) => apiClient.post(`/applications`, payload);
// export const postOpportunity = (payload) => apiClient.post(`/opportunities`, payload);

export default apiClient;
