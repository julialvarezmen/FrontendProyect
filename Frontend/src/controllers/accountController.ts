import apiClient from '../services/apiService';

export const getAllAccounts = async () => {
  const response = await apiClient.get('/accounts');
  return response.data;
};

export const createAccount = async (accountData: any) => {
  const response = await apiClient.post('/accounts', accountData);
  return response.data;
};

export const deleteAccount = async (id: number) => {
  await apiClient.delete(`/accounts/${id}`);
};