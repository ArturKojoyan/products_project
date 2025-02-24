import axios, { InternalAxiosRequestConfig } from "axios";
import { checkAuth, logout } from "../services/auth.service";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //  check if request has already been retried
    if (originalRequest._retry) {
      await logout();
      window.location.href = "/signin"; // Redirect to login
      return Promise.reject(error);
    }

    //  mark the request as retried
    originalRequest._retry = true;

    // if the error is due to token expiration (401) and it's not a retry
    if (error.response.status === 401) {
      try {
        // try refreshing the token
        const accessToken = await checkAuth();
        console.log("🚀 ~ accessToken:", accessToken);

        // after refreshing, retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/signin"; // redirect to signin page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
