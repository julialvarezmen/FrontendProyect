import React from 'react';
import { Account, Transaction } from '../../types';

interface AccountDetailsModalProps {
  show: boolean;
  onClose: () => void;
  account: Account | null;
  transactions: Transaction[];
}

const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({ 
  show, 
  onClose, 
  account, 
  transactions 
}) => {
  if (!show || !account) return null;

  const accountTransactions = transactions
    .filter(t => t.accountId === account.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return (
          <span className="badge bg-success">
            <i className="fas fa-arrow-down me-1"></i>Depósito
          </span>
        );
      case "WITHDRAWAL":
        return (
          <span className="badge bg-danger">
            <i className="fas fa-arrow-up me-1"></i>Retiro
          </span>
        );
      case "TRANSFER":
        return (
          <span className="badge bg-primary">
            <i className="fas fa-exchange-alt me-1"></i>Transferencia
          </span>
        );
      default:
        return <span className="badge bg-secondary">{type}</span>;
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-file-invoice-dollar me-2"></i>
              Detalles de la Cuenta
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="card border-primary mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-muted mb-2">Número de Cuenta</h6>
                    <h4 className="mb-3">
                      <i className="fas fa-credit-card text-primary me-2"></i>
                      {account.accountNumber}
                    </h4>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <h6 className="text-muted mb-2">Saldo Actual</h6>
                    <h3 className="text-success mb-0">
                      ${account.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <small className="text-muted">Total Transacciones</small>
                    <p className="mb-0 fw-bold">{accountTransactions.length}</p>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">Estado</small>
                    <p className="mb-0">
                      <span className="badge bg-success">Activa</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">Usuario ID</small>
                    <p className="mb-0 fw-bold">{account.userId}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <h6 className="text-muted">
                <i className="fas fa-history me-2"></i>
                Historial de Movimientos
              </h6>
            </div>

            {accountTransactions.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p className="text-muted">No hay transacciones registradas para esta cuenta</p>
              </div>
            ) : (
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-hover table-sm">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th>Fecha y Hora</th>
                      <th>Tipo</th>
                      <th className="text-end">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="align-middle">
                          <div>
                            <small>{new Date(transaction.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}</small>
                          </div>
                          <small className="text-muted">
                            {new Date(transaction.date).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </small>
                        </td>
                        <td className="align-middle">
                          {getTransactionBadge(transaction.type)}
                        </td>
                        <td className="text-end align-middle">
                          <span className={`fw-bold ${transaction.type === "DEPOSIT" ? "text-success" : "text-danger"}`}>
                            {transaction.type === "DEPOSIT" ? "+" : "-"}$
                            {transaction.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fas fa-times me-2"></i>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsModal;
