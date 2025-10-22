import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';

interface TransactionManagementProps {
  onTransactionCreated?: () => void;
}

const TransactionManagement: React.FC<TransactionManagementProps> = ({ onTransactionCreated }) => {
  const { transactions, loading, error, createTransaction, createTransfer } = useTransactions();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorForm, setErrorForm] = useState('');

  // Form states
  const [newDeposit, setNewDeposit] = useState<{ accountId: number; amount: number }>({ accountId: 0, amount: 0 });
  const [newWithdrawal, setNewWithdrawal] = useState<{ accountId: number; amount: number }>({ accountId: 0, amount: 0 });
  const [newTransfer, setNewTransfer] = useState<{ fromAccountId: number; toAccountId: number; amount: number }>({ fromAccountId: 0, toAccountId: 0, amount: 0 });

  const handleCreateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorForm('');
      setSuccessMessage('');
      await createTransaction(newDeposit.accountId, { amount: newDeposit.amount, type: 'DEPOSIT' });
      setNewDeposit({ accountId: 0, amount: 0 });
      setSuccessMessage('Depósito realizado exitosamente');
      if (onTransactionCreated) onTransactionCreated();
    } catch (err) {
      setErrorForm(err instanceof Error ? err.message : 'Error al realizar depósito');
    }
  };

  const handleCreateWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorForm('');
      setSuccessMessage('');
      await createTransaction(newWithdrawal.accountId, { amount: newWithdrawal.amount, type: 'WITHDRAWAL' });
      setNewWithdrawal({ accountId: 0, amount: 0 });
      setSuccessMessage('Retiro realizado exitosamente');
      if (onTransactionCreated) onTransactionCreated();
    } catch (err) {
      setErrorForm(err instanceof Error ? err.message : 'Error al realizar retiro');
    }
  };

  const handleCreateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorForm('');
      setSuccessMessage('');
      await createTransfer({
        fromAccountId: newTransfer.fromAccountId,
        toAccountId: newTransfer.toAccountId,
        amount: newTransfer.amount
      });
      setNewTransfer({ fromAccountId: 0, toAccountId: 0, amount: 0 });
      setSuccessMessage('Transferencia realizada exitosamente');
      if (onTransactionCreated) onTransactionCreated();
    } catch (err) {
      setErrorForm(err instanceof Error ? err.message : 'Error al realizar transferencia');
    }
  };

  if (loading) return <div className="text-center">Cargando transacciones...</div>;

  return (
      <div className="card" style={{
      border: 'none',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}>
      <div className="card-header bg-white border-0">
        <h5 className="mb-0"><i className="fas fa-exchange-alt me-2"></i>Transacciones</h5>
      </div>
      <div className="card-body">
        {error && <ErrorMessage message={error} />}
        {errorForm && <ErrorMessage message={errorForm} />}
        {successMessage && <SuccessMessage message={successMessage} />}

        {/* Depósito */}
        <form onSubmit={handleCreateDeposit} className="mb-3">
          <h6 className="text-success mb-2">Depósito</h6>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="ID Cuenta"
              value={newDeposit.accountId || ''}
              onChange={(e) => setNewDeposit({ ...newDeposit, accountId: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Monto"
              step="0.01"
              value={newDeposit.amount || ''}
              onChange={(e) => setNewDeposit({ ...newDeposit, amount: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-sm w-100">Depositar</button>
        </form>

        {/* Retiro */}
        <form onSubmit={handleCreateWithdrawal} className="mb-3">
          <h6 className="text-danger mb-2">Retiro</h6>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="ID Cuenta"
              value={newWithdrawal.accountId || ''}
              onChange={(e) => setNewWithdrawal({ ...newWithdrawal, accountId: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Monto"
              step="0.01"
              value={newWithdrawal.amount || ''}
              onChange={(e) => setNewWithdrawal({ ...newWithdrawal, amount: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger btn-sm w-100">Retirar</button>
        </form>

        {/* Transferencia */}
        <form onSubmit={handleCreateTransfer}>
          <h6 className="text-primary mb-2">Transferencia</h6>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="De Cuenta ID"
              value={newTransfer.fromAccountId || ''}
              onChange={(e) => setNewTransfer({ ...newTransfer, fromAccountId: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="A Cuenta ID"
              value={newTransfer.toAccountId || ''}
              onChange={(e) => setNewTransfer({ ...newTransfer, toAccountId: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Monto"
              step="0.01"
              value={newTransfer.amount || ''}
              onChange={(e) => setNewTransfer({ ...newTransfer, amount: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm w-100">Transferir</button>
        </form>

        {/* Últimas transacciones */}
        <div className="mt-4">
          <h6 className="mb-2"><i className="fas fa-history me-2"></i>Últimas Transacciones</h6>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">
                  {new Date(transaction.date).toLocaleDateString()}
                </small>
                <span className={`badge ${
                  transaction.type === 'DEPOSIT' ? 'bg-success' : 
                  transaction.type === 'WITHDRAWAL' ? 'bg-danger' : 'bg-primary'
                }`}>
                  {transaction.type}
                </span>
                <span>${transaction.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagement;