import React from 'react';

interface MetricsCardsProps {
  totalBalance: number;
  accountCount: number;
  transactionCount: number;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ 
  totalBalance, 
  accountCount, 
  transactionCount 
}) => {
  return (
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
                <h3 className="mb-0">
                  ${totalBalance.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                </h3>
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
                <i className="fas fa-credit-card fa-2x"></i>
              </div>
              <div>
                <h6 className="text-muted mb-0">Mis Cuentas</h6>
                <h3 className="mb-0">{accountCount}</h3>
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
                <i className="fas fa-exchange-alt fa-2x"></i>
              </div>
              <div>
                <h6 className="text-muted mb-0">Transacciones</h6>
                <h3 className="mb-0">{transactionCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCards;
