import apiClient from './axiosConfig';

export interface LoginRequest {
  dni: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId: number;
}

export interface RegisterRequest {
  dni: string;
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export const authService = {
  login: (credentials: LoginRequest): Promise<LoginResponse> => 
    apiClient.post<LoginResponse>('/auth/login', credentials).then(res => res.data),
  
  register: (userData: RegisterRequest): Promise<RegisterResponse> => 
    apiClient.post<RegisterResponse>('/auth/register', userData).then(res => res.data),
};