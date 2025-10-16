import apiClient from '../services/apiService';

export const getAllTransactions = async () => {
  const response = await apiClient.get('/transactions');
  return response.data;
};

export const createTransaction = async (accountId: number, transactionData: any) => {
  const response = await apiClient.post(`/transactions/accounts/${accountId}`, transactionData);
  return response.data;
};

export const createTransfer = async (transferData: any) => {
  const response = await apiClient.post('/transactions/transfer', transferData);
  return response.data;
};