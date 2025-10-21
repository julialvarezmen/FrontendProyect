"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const apiService_1 = __importDefault(require("../services/apiService"));
const getAllUsers = async () => {
    try {
        const response = await apiService_1.default.get('/users');
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error; // Re-lanzamos el error para que lo maneje el middleware
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (userData) => {
    try {
        // Validación básica
        if (!userData.dni || !userData.name || !userData.password) {
            throw new Error('Faltan campos requeridos: dni, name, password');
        }
        const response = await apiService_1.default.post('/users', userData);
        return response.data;
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};
exports.createUser = createUser;
const updateUser = async (id, userData) => {
    try {
        if (!id) {
            throw new Error('ID de usuario es requerido');
        }
        const response = await apiService_1.default.put(`/users/${id}`, userData);
        return response.data;
    }
    catch (error) {
        console.error(`Error al actualizar usuario ${id}:`, error);
        throw error;
    }
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    try {
        if (!id) {
            throw new Error('ID de usuario es requerido');
        }
        await apiService_1.default.delete(`/users/${id}`);
    }
    catch (error) {
        console.error(`Error al eliminar usuario ${id}:`, error);
        throw error;
    }
};
exports.deleteUser = deleteUser;
