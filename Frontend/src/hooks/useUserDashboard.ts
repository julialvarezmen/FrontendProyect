import { useState, useEffect, useCallback } from 'react';
import { userService } from '../api/userService';
import { accountService } from '../api/accountService';
import { transactionService } from '../api/transactionService';
import { User, Account, Transaction } from '../types';

export const useUserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("No se encontró sesión activa");
        return;
      }

      console.log("Loading data for user ID:", userId);

      // Fetch user data
      try {
        const userData = await userService.getById(parseInt(userId));
        console.log("User data loaded:", userData);
        setUser(userData);
      } catch (err: any) {
        console.error("Error loading user:", err);
        throw new Error("No se pudo cargar la información del usuario");
      }

      // Fetch all accounts and filter by userId
      try {
        const allAccounts = await accountService.getAll();
        console.log("All accounts loaded:", allAccounts);
        const userAccounts = allAccounts.filter(acc => acc.userId === parseInt(userId));
        console.log("User accounts:", userAccounts);
        setAccounts(userAccounts);

        // Fetch all transactions and filter by user's account IDs
        if (userAccounts.length > 0) {
          const allTransactions = await transactionService.getAll();
          console.log("All transactions loaded:", allTransactions);
          const accountIds = userAccounts.map(acc => acc.id);
          const userTransactions = allTransactions.filter(t => accountIds.includes(t.accountId));
          console.log("User transactions:", userTransactions);
          
          // Sort transactions by date (most recent first)
          userTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setTransactions(userTransactions);
        } else {
          setTransactions([]);
        }
      } catch (err: any) {
        console.error("Error loading accounts/transactions:", err);
        // Don't throw error here, just log it - user data is more important
        console.log("Continuing without accounts/transactions");
      }

    } catch (err: any) {
      console.error("Error loading dashboard data:", err);
      setError(err.message || "Error al cargar los datos del usuario");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return {
    user,
    accounts,
    transactions,
    loading,
    error,
    totalBalance,
    refetchData: loadUserData
  };
};;
