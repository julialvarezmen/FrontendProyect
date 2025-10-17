import apiClient from '../services/apiService';

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Re-lanzamos el error para que lo maneje el middleware
  }
};

export const createUser = async (userData: any) => {
  try {
    // Validación básica
    if (!userData.dni || !userData.name || !userData.password) {
      throw new Error('Faltan campos requeridos: dni, name, password');
    }
    
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: any) => {
  try {
    if (!id) {
      throw new Error('ID de usuario es requerido');
    }
    
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    if (!id) {
      throw new Error('ID de usuario es requerido');
    }
    
    await apiClient.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error);
    throw error;
  }
};