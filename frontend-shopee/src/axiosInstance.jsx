import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const pubApi = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privApi = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Private API Interceptor

privApi.interceptors.request.use(
  (config) => {
    const token = localStorage.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
