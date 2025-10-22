import apiClient from './axiosConfig';
import { Account, AccountRequestDTO } from '../types';

const ACCOUNT_API_URL = '/accounts';

export const accountService = {
  getAll: (): Promise<Account[]> => apiClient.get<Account[]>(ACCOUNT_API_URL).then(res => res.data),
  
  getById: (id: number): Promise<Account> => 
    apiClient.get<Account>(`${ACCOUNT_API_URL}/${id}`).then(res => res.data),
  
  create: (accountData: AccountRequestDTO): Promise<Account> => 
    apiClient.post<Account>(ACCOUNT_API_URL, accountData).then(res => res.data),
  
  update: (id: number, accountData: AccountRequestDTO): Promise<Account> => 
    apiClient.put<Account>(`${ACCOUNT_API_URL}/${id}`, accountData).then(res => res.data),
  
  delete: (id: number): Promise<void> => 
    apiClient.delete(`${ACCOUNT_API_URL}/${id}`).then(() => undefined),
};