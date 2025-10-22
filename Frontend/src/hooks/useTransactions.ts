import { useState, useEffect } from 'react';
import { Transaction, TransactionRequestDTO, TransferRequestDTO } from '../types';
import { transactionService } from '../api/transactionService';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Error al cargar las transacciones');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (accountId: number, transactionData: TransactionRequestDTO) => {
    try {
      const newTransaction = await transactionService.createTransaction(accountId, transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      throw new Error('Error al crear transacción');
    }
  };

  const createTransfer = async (transferData: TransferRequestDTO) => {
    try {
      const newTransaction = await transactionService.createTransfer(transferData);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      throw new Error('Error al crear transferencia');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    createTransfer
  };
};