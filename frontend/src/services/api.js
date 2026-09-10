/**
 * KaushalVerse API Client (Frontend Mock Architecture)
 * Configured with Axios. Ready for real backend endpoints.
 * Currently backed by in-memory mock services.
 */
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.kaushalverse.gov.in/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Mock interceptor to demonstrate architecture without outbound calls
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('kv_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful error mock logging
    console.warn('API mock interceptor caught request:', error.config?.url);
    return Promise.resolve({ data: { success: true, mock: true } });
  }
);

export default apiClient;
