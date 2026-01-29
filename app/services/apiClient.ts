import axios from 'axios';
import { triggerLogout } from './authEvents';

const API_URL = process.env.EXPO_PUBLIC_API_URL!;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      triggerLogout();
    }

    return Promise.reject(error);
  },
);
