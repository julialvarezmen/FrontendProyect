import React, { useState } from 'react';
import { useAccounts } from '../../hooks/useAccounts';
import { AccountRequestDTO } from '../../types';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';

interface AccountManagementProps {
  onAccountCreated?: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ onAccountCreated }) => {
  const { accounts, loading: loadingAccounts, error: errorAccounts, createAccount, deleteAccount } = useAccounts();
  const [newAccount, setNewAccount] = useState<AccountRequestDTO>({ accountNumber: '', balance: 0, userId: 0 });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorForm('');
      setSuccessMessage('');
      await createAccount(newAccount);
      setNewAccount({ accountNumber: '', balance: 0, userId: 0 });
      setSuccessMessage('Cuenta creada exitosamente');
      if (onAccountCreated) onAccountCreated();
    } catch (err) {
      setErrorForm(err instanceof Error ? err.message : 'Error al crear cuenta');
    }
  };

  if (loadingAccounts) return <div className="text-center">Cargando cuentas...</div>;

  const handleDeleteAccount = async (accountId: number) => {
  try {
    setErrorForm('');
    setSuccessMessage('');
    await deleteAccount(accountId);
    setSuccessMessage('Cuenta eliminada exitosamente');
  } catch (err) {
    setErrorForm(err instanceof Error ? err.message : 'Error al eliminar cuenta');
  }
};
  return (
    <div className="card" style={{
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}>
      <div className="card-header bg-white border-0">
        <h5 className="mb-0"><i className="fas fa-credit-card me-2"></i>Cuentas</h5>
      </div>
      <div className="card-body">
        {errorAccounts && <ErrorMessage message={errorAccounts} />}
        {errorForm && <ErrorMessage message={errorForm} />}
        {successMessage && <SuccessMessage message={successMessage} />}

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Nº Cuenta *"
              value={newAccount.accountNumber}
              onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Saldo *"
              step="0.01"
              value={newAccount.balance || ''}
              onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="ID Usuario *"
              value={newAccount.userId || ''}
              onChange={(e) => setNewAccount({ ...newAccount, userId: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <button type="submit" className="btn btn-info btn-sm w-100">Crear Cuenta</button>
        </form>

        <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nº Cuenta</th>
                <th>Saldo</th>
                <th>Usuario ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.accountNumber}</td>
                  <td>${account.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                  <td>{account.userId}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteAccount(account.id)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#FEE2E2',
                        color: '#B91C1C',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FECACA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                    >
                      <i className="fas fa-trash me-1"></i>Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;