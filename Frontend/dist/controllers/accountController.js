"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.createAccount = exports.getAllAccounts = void 0;
const apiService_1 = __importDefault(require("../services/apiService"));
const getAllAccounts = async () => {
    try {
        const response = await apiService_1.default.get('/accounts');
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener cuentas:', error);
        throw error;
    }
};
exports.getAllAccounts = getAllAccounts;
const createAccount = async (accountData) => {
    try {
        // Validación básica
        if (!accountData.accountNumber || !accountData.balance || !accountData.userId) {
            throw new Error('Faltan campos requeridos: accountNumber, balance, userId');
        }
        const response = await apiService_1.default.post('/accounts', accountData);
        return response.data;
    }
    catch (error) {
        console.error('Error al crear cuenta:', error);
        throw error;
    }
};
exports.createAccount = createAccount;
const deleteAccount = async (id) => {
    try {
        if (!id) {
            throw new Error('ID de cuenta es requerido');
        }
        await apiService_1.default.delete(`/accounts/${id}`);
    }
    catch (error) {
        console.error(`Error al eliminar cuenta ${id}:`, error);
        throw error;
    }
};
exports.deleteAccount = deleteAccount;
