import axios from "axios";
import { useAuthStore } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.status == 401) {
      useAuthStore.getState().clearToken();
    }
    return Promise.reject(err);
  },
);

export { api };
