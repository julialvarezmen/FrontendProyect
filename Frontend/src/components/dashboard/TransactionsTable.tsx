import React from 'react';
import { Transaction, Account } from '../../types';

interface TransactionsTableProps {
  transactions: Transaction[];
  accounts: Account[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, accounts }) => {
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
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0">
          <i className="fas fa-list text-info me-2"></i>
          Historial de Transacciones
        </h5>
      </div>
      <div className="card-body">
        {transactions.length === 0 ? (
          <p className="text-muted text-center py-4">No hay transacciones registradas</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Cuenta</th>
                  <th className="text-end">Monto</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const account = accounts.find(acc => acc.id === transaction.accountId);
                  return (
                    <tr key={transaction.id}>
                      <td>{new Date(transaction.date).toLocaleString("es-ES")}</td>
                      <td>{getTransactionBadge(transaction.type)}</td>
                      <td>{account?.accountNumber || `Cuenta #${transaction.accountId}`}</td>
                      <td className="text-end fw-bold">
                        <span className={transaction.type === "DEPOSIT" ? "text-success" : "text-danger"}>
                          {transaction.type === "DEPOSIT" ? "+" : "-"}$
                          {transaction.amount.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
