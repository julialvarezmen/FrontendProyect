export interface User {
  id: number;
  dni: string;
  name: string;
  email: string;
}

export interface CreateUserDTO {
  dni: string;
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  userId: number;
}

export interface AccountRequestDTO {
  accountNumber: string;
  balance: number;
  userId: number;
}

export interface Transaction {
  id: number;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  date: string;
  accountId: number;
}

export interface TransactionRequestDTO {
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL';
}

export interface TransferRequestDTO {
  amount: number;
  fromAccountId: number;
  toAccountId: number;
}