import axios from "axios";
import apiClient from "./api-client";

const authApiClient = axios.create({
  baseURL: apiClient.defaults.baseURL,
});

// Request interceptor: Add access token to headers
authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      const parsedToken = JSON.parse(token);
      if (parsedToken?.access) {
        config.headers.Authorization = `JWT ${parsedToken.access}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Refresh token if access token expires
authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem("authTokens");

    if (
      error.response?.status === 401 &&
      token &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { refresh } = JSON.parse(token);
        const res = await apiClient.post("/auth/jwt/refresh/", {
          refresh,
        });

        const newTokens = {
          access: res.data.access,
          refresh,
        };
        localStorage.setItem("authTokens", JSON.stringify(newTokens));

        originalRequest.headers.Authorization = `JWT ${res.data.access}`;
        return authApiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("authTokens");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authApiClient;
