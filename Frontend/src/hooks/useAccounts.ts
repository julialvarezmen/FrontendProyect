import { useState, useEffect } from 'react';
import { Account, AccountRequestDTO } from '../types';
import { accountService } from '../api/accountService';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await accountService.getAll();
      setAccounts(data);
    } catch (err) {
      setError('Error al cargar las cuentas');
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (accountData: AccountRequestDTO) => {
    try {
      const newAccount = await accountService.create(accountData);
      setAccounts(prev => [...prev, newAccount]);
      return newAccount;
    } catch (err) {
      throw new Error('Error al crear cuenta');
    }
  };

  const deleteAccount = async (id: number) => {
    try {
      await accountService.delete(id);
      setAccounts(prev => prev.filter(account => account.id !== id));
    } catch (err) {
      throw new Error('Error al eliminar cuenta');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
    deleteAccount
  };

};