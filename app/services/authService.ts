import { apiClient } from './apiClient';

export const registerRequest = (
  name: string,
  email: string,
  password: string,
) => {
  return apiClient.post('/auth/register', {
    name,
    email,
    password,
  });
};

export const loginRequest = (email: string, password: string) => {
  return apiClient.post('/auth/login', {
    email,
    password,
  });
};

export const profileRequest = () => {
  return apiClient.get('/auth/profile');
};
