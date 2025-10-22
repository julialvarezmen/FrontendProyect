// src/pages/Dashboard.tsx
import React from 'react';
import { useUsers } from '../hooks/useUsers';
import { useAccounts } from '../hooks/useAccounts';
import UserManagement from '../components/dashboard/UserManagement';
import AccountManagement from '../components/dashboard/AccountManagement';
import TransactionManagement from '../components/dashboard/TransactionManagement';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Dashboard: React.FC = () => {
 // Reemplaza estas líneas en la parte superior del componente
const { users, loading: loadingUsers, error: errorUsers, createUser, deleteUser } = useUsers();
const { accounts, loading: loadingAccounts, error: errorAccounts, createAccount, deleteAccount } = useAccounts();
  
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Si alguno de los hooks está cargando, mostramos spinner
  // (los hooks manejan su propio loading/error)

  return (
    <div className="container-fluid py-4" style={{
      backgroundColor: '#FAFAFA',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      color: '#1F2937'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">OrangeBank - Dashboard</h1>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/';
          }}
        >
          <i className="fas fa-sign-out-alt me-1"></i>Salir
        </button>
      </div>

      {/* Métricas */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-warning text-white p-3 rounded me-3">
                  <i className="fas fa-wallet fa-2x"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Saldo Total</h6>
                  <h3 className="mb-0">${totalBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-primary text-white p-3 rounded me-3">
                  <i className="fas fa-users fa-2x"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Usuarios</h6>
                  <h3 className="mb-0">{users.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-info text-white p-3 rounded me-3">
                  <i className="fas fa-credit-card fa-2x"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Cuentas</h6>
                  <h3 className="mb-0">{accounts.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <UserManagement />
        </div>
        <div className="col-md-4">
          <AccountManagement />
        </div>
        <div className="col-md-4">
          <TransactionManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;