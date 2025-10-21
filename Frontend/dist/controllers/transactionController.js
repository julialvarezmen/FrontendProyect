"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransfer = exports.createTransaction = exports.getAllTransactions = void 0;
const apiService_1 = __importDefault(require("../services/apiService"));
const getAllTransactions = async () => {
    try {
        const response = await apiService_1.default.get('/transactions');
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener transacciones:', error);
        throw error;
    }
};
exports.getAllTransactions = getAllTransactions;
const createTransaction = async (accountId, transactionData) => {
    try {
        if (!accountId) {
            throw new Error('ID de cuenta es requerido');
        }
        if (!transactionData.amount || !transactionData.type) {
            throw new Error('Faltan campos requeridos: amount, type');
        }
        const response = await apiService_1.default.post(`/transactions/accounts/${accountId}`, transactionData);
        return response.data;
    }
    catch (error) {
        console.error(`Error al crear transacción para cuenta ${accountId}:`, error);
        throw error;
    }
};
exports.createTransaction = createTransaction;
const createTransfer = async (transferData) => {
    try {
        if (!transferData.amount || !transferData.fromAccountId || !transferData.toAccountId) {
            throw new Error('Faltan campos requeridos: amount, fromAccountId, toAccountId');
        }
        const response = await apiService_1.default.post('/transactions/transfer', transferData);
        return response.data;
    }
    catch (error) {
        console.error('Error al crear transferencia:', error);
        throw error;
    }
};
exports.createTransfer = createTransfer;
