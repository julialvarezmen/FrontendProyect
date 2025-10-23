import React from 'react';
import { User } from '../../types';

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className='d-flex flex-row gap-4'>
        <h1 className="text-dark mb-1">OrangeBank - Dashboard</h1>
        {user && (
          <h1 className="text-muted mb-0">
            👋 Hola, <strong>{user.name}</strong>
          </h1>
        )}
      </div>
      <button className="btn btn-outline-secondary" onClick={onLogout}>
        <i className="fas fa-sign-out-alt me-1"></i>Salir
      </button>
    </div>
  );
};

export default DashboardHeader;
