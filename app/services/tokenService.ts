import * as SecureStore from 'expo-secure-store';
import { apiClient } from './apiClient';

const TOKEN_KEY = 'my-jwt';

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const loadToken = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return token;
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  delete apiClient.defaults.headers.common['Authorization'];
};
