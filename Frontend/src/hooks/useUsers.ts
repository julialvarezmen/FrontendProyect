import { useState, useEffect } from 'react';
import { User, CreateUserDTO, UpdateUserDTO } from '../types';
import { userService } from '../api/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserDTO) => {
    try {
      const newUser = await userService.create(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      throw new Error('Error al crear usuario');
    }
  };

  const updateUser = async (id: number, userData: UpdateUserDTO) => {
    try {
      const updatedUser = await userService.update(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      throw new Error('Error al actualizar usuario');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      throw new Error('Error al eliminar usuario');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };

};