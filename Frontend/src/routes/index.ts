import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as accountController from '../controllers/accountController';
import * as transactionController from '../controllers/transactionController';

const router = Router();

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
    
    const totalBalance = accounts.reduce((sum: number, acc: any) => sum + acc.balance, 0);
    const recentTransactions = transactions.slice(0, 10);
    
    res.render('dashboard', { 
      users: users || [], 
      accounts: accounts || [], 
      transactions: recentTransactions || [],
      totalBalance: totalBalance
    });
  } catch (error: any) {
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
  } catch (error) {
    res.redirect('/dashboard?error=Error al crear usuario');
  }
});

router.post('/users/:id/update', async (req, res) => {
  try {
    await userController.updateUser(parseInt(req.params.id), req.body);
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/dashboard?error=Error al actualizar usuario');
  }
});

router.post('/users/:id/delete', async (req, res) => {
  try {
    await userController.deleteUser(parseInt(req.params.id));
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/dashboard?error=Error al eliminar usuario');
  }
});

router.post('/accounts', async (req, res) => {
  try {
    await accountController.createAccount(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/dashboard?error=Error al crear cuenta');
  }
});

router.post('/accounts/:id/delete', async (req, res) => {
  try {
    await accountController.deleteAccount(parseInt(req.params.id));
    res.redirect('/dashboard');
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    res.redirect('/dashboard?error=Error al realizar transferencia');
  }
});

export default router;