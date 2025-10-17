import apiClient from '../services/apiService';

export const getAllTransactions = async () => {
  try {
    const response = await apiClient.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    throw error;
  }
};

export const createTransaction = async (accountId: number, transactionData: any) => {
  try {
    if (!accountId) {
      throw new Error('ID de cuenta es requerido');
    }
    
    if (!transactionData.amount || !transactionData.type) {
      throw new Error('Faltan campos requeridos: amount, type');
    }
    
    const response = await apiClient.post(`/transactions/accounts/${accountId}`, transactionData);
    return response.data;
  } catch (error) {
    console.error(`Error al crear transacción para cuenta ${accountId}:`, error);
    throw error;
  }
};

export const createTransfer = async (transferData: any) => {
  try {
    if (!transferData.amount || !transferData.fromAccountId || !transferData.toAccountId) {
      throw new Error('Faltan campos requeridos: amount, fromAccountId, toAccountId');
    }
    
    const response = await apiClient.post('/transactions/transfer', transferData);
    return response.data;
  } catch (error) {
    console.error('Error al crear transferencia:', error);
    throw error;
  }
};