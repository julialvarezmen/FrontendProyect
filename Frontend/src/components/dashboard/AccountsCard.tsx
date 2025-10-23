import React from 'react';
import { Account } from '../../types';

interface AccountsCardProps {
  accounts: Account[];
  onAccountClick: (account: Account) => void;
}

const AccountsCard: React.FC<AccountsCardProps> = ({ accounts, onAccountClick }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0">
          <i className="fas fa-credit-card text-primary me-2"></i>
          Mis Cuentas
        </h5>
      </div>
      <div className="card-body">
        {accounts.length === 0 ? (
          <p className="text-muted text-center py-4">No tienes cuentas registradas</p>
        ) : (
          <div className="row">
            {accounts.map((account) => (
              <div key={account.id} className="col-md-6 mb-3">
                <div 
                  className="border rounded p-3 bg-light position-relative"
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onClick={() => onAccountClick(account)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <small className="text-muted">Cuenta N°</small>
                      <p className="mb-0 fw-bold">{account.accountNumber}</p>
                    </div>
                    <span className="badge bg-success">Activa</span>
                  </div>
                  <div className="mt-2">
                    <small className="text-muted">Saldo disponible</small>
                    <h4 className="mb-0 text-success">
                      ${account.balance.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                    </h4>
                  </div>
                  <div className="position-absolute bottom-0 end-0 p-2">
                    <small className="text-primary">
                      <i className="fas fa-eye me-1"></i>
                      Ver detalles
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsCard;
