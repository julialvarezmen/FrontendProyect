import apiClient from './axiosConfig';
import { Transaction, TransactionRequestDTO, TransferRequestDTO } from '../types';

const TRANSACTION_API_URL = '/transactions';

export const transactionService = {
  getAll: (): Promise<Transaction[]> => 
    apiClient.get<Transaction[]>(TRANSACTION_API_URL).then(res => res.data),
  
  getById: (id: number): Promise<Transaction> => 
    apiClient.get<Transaction>(`${TRANSACTION_API_URL}/${id}`).then(res => res.data),
  
  createTransaction: (accountId: number, transactionData: TransactionRequestDTO): Promise<Transaction> => 
    apiClient.post<Transaction>(`${TRANSACTION_API_URL}/accounts/${accountId}`, transactionData)
      .then(res => res.data),
  
  createTransfer: (transferData: TransferRequestDTO): Promise<Transaction> => 
    apiClient.post<Transaction>(`${TRANSACTION_API_URL}/transfer`, transferData)
      .then(res => res.data),
};