import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default apiClient;