import axios from "axios";
import { apiUrl } from "../common/config";
import { getToken } from "./actions";

export const api = axios.create({
  baseURL: `${apiUrl}/api`,
});

// Use an interceptor to add the token dynamically
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
