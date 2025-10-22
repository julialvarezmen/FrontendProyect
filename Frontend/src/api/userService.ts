import apiClient from './axiosConfig';
import { User, CreateUserDTO, UpdateUserDTO } from '../types';

const USER_API_URL = '/users';

export const userService = {
  getAll: (): Promise<User[]> => apiClient.get<User[]>(USER_API_URL).then(res => res.data),
  
  getById: (id: number): Promise<User> => 
    apiClient.get<User>(`${USER_API_URL}/${id}`).then(res => res.data),
  
  create: (userData: CreateUserDTO): Promise<User> => 
    apiClient.post<User>(USER_API_URL, userData).then(res => res.data),
  
  update: (id: number, userData: UpdateUserDTO): Promise<User> => 
    apiClient.put<User>(`${USER_API_URL}/${id}`, userData).then(res => res.data),
  
  delete: (id: number): Promise<void> => 
    apiClient.delete(`${USER_API_URL}/${id}`).then(() => undefined),
};