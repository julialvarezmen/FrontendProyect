import apiClient from '../services/apiService';

export const getAllUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

export const updateUser = async (id: number, userData: any) => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await apiClient.delete(`/users/${id}`);
};