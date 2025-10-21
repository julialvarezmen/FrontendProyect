"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/userController"));
const accountController = __importStar(require("../controllers/accountController"));
const transactionController = __importStar(require("../controllers/transactionController"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.render('homepage');
});
router.get('/dashboard', async (req, res) => {
    try {
        const [users, accounts, transactions] = await Promise.all([
            userController.getAllUsers(),
            accountController.getAllAccounts(),
            transactionController.getAllTransactions()
        ]);
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
        const recentTransactions = transactions.slice(0, 10);
        res.render('dashboard', {
            users: users || [],
            accounts: accounts || [],
            transactions: recentTransactions || [],
            totalBalance: totalBalance
        });
    }
    catch (error) {
        console.error('Error cargando dashboard:', error);
        res.render('dashboard', {
            users: [],
            accounts: [],
            transactions: [],
            totalBalance: 0,
            error: 'Error al cargar los datos'
        });
    }
});
router.post('/users', async (req, res) => {
    try {
        await userController.createUser(req.body);
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al crear usuario');
    }
});
router.post('/users/:id/update', async (req, res) => {
    try {
        await userController.updateUser(parseInt(req.params.id), req.body);
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al actualizar usuario');
    }
});
router.post('/users/:id/delete', async (req, res) => {
    try {
        await userController.deleteUser(parseInt(req.params.id));
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al eliminar usuario');
    }
});
router.post('/accounts', async (req, res) => {
    try {
        await accountController.createAccount(req.body);
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al crear cuenta');
    }
});
router.post('/accounts/:id/delete', async (req, res) => {
    try {
        await accountController.deleteAccount(parseInt(req.params.id));
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al eliminar cuenta');
    }
});
router.post('/transactions/deposit', async (req, res) => {
    try {
        const { accountId, amount } = req.body;
        await transactionController.createTransaction(parseInt(accountId), {
            amount: parseFloat(amount),
            type: 'DEPOSIT'
        });
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al realizar depósito');
    }
});
router.post('/transactions/withdraw', async (req, res) => {
    try {
        const { accountId, amount } = req.body;
        await transactionController.createTransaction(parseInt(accountId), {
            amount: parseFloat(amount),
            type: 'WITHDRAWAL'
        });
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al realizar retiro');
    }
});
router.post('/transactions/transfer', async (req, res) => {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;
        await transactionController.createTransfer({
            fromAccountId: parseInt(fromAccountId),
            toAccountId: parseInt(toAccountId),
            amount: parseFloat(amount)
        });
        res.redirect('/dashboard');
    }
    catch (error) {
        res.redirect('/dashboard?error=Error al realizar transferencia');
    }
});
exports.default = router;
