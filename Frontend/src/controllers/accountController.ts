import apiClient from '../services/apiService';

export const getAllAccounts = async () => {
  try {
    const response = await apiClient.get('/accounts');
    return response.data;
  } catch (error) {
    console.error('Error al obtener cuentas:', error);
    throw error;
  }
};

export const createAccount = async (accountData: any) => {
  try {
    // Validación básica
    if (!accountData.accountNumber || !accountData.balance || !accountData.userId) {
      throw new Error('Faltan campos requeridos: accountNumber, balance, userId');
    }
    
    const response = await apiClient.post('/accounts', accountData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    throw error;
  }
};

export const deleteAccount = async (id: number) => {
  try {
    if (!id) {
      throw new Error('ID de cuenta es requerido');
    }
    
    await apiClient.delete(`/accounts/${id}`);
  } catch (error) {
    console.error(`Error al eliminar cuenta ${id}:`, error);
    throw error;
  }
};