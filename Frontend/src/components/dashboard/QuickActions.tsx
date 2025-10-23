import React from 'react';

interface QuickActionsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
  onCreateAccount: () => void;
  hasAccounts: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onDeposit, 
  onWithdraw, 
  onTransfer,
  onCreateAccount,
  hasAccounts 
}) => {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="fas fa-bolt text-warning me-2"></i>
          Acciones Rápidas
        </h5>
        <div className="d-flex gap-2 flex-wrap">
          <button 
            className="btn btn-warning"
            onClick={onCreateAccount}
          >
            <i className="fas fa-plus-circle me-2"></i>
            Nueva Cuenta
          </button>
          <button 
            className="btn btn-success"
            onClick={onDeposit}
            disabled={!hasAccounts}
          >
            <i className="fas fa-arrow-down me-2"></i>
            Depositar
          </button>
          <button 
            className="btn btn-danger"
            onClick={onWithdraw}
            disabled={!hasAccounts}
          >
            <i className="fas fa-arrow-up me-2"></i>
            Retirar
          </button>
          <button 
            className="btn btn-primary"
            onClick={onTransfer}
            disabled={!hasAccounts}
          >
            <i className="fas fa-exchange-alt me-2"></i>
            Transferir
          </button>
        </div>
        {!hasAccounts && (
          <small className="text-muted d-block mt-2">
            <i className="fas fa-info-circle me-1"></i>
            Crea tu primera cuenta para comenzar a realizar transacciones
          </small>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
