import React from 'react';
import { User } from '../../types';

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0">
          <i className="fas fa-user-circle text-warning me-2"></i>
          Mi Información
        </h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="text-muted small">Nombre Completo</label>
          <p className="mb-0 fw-bold">{user.name}</p>
        </div>
        <div className="mb-3">
          <label className="text-muted small">DNI</label>
          <p className="mb-0 fw-bold">{user.dni}</p>
        </div>
        <div className="mb-0">
          <label className="text-muted small">Correo Electrónico</label>
          <p className="mb-0 fw-bold">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
