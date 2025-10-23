import React, { useState, useEffect } from 'react';
import { Account } from '../../types';
import { transactionService } from '../../api/transactionService';
import { accountService } from '../../api/accountService';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';
import LoadingSpinner from '../ui/LoadingSpinner';

interface TransferModalProps {
  show: boolean;
  onClose: () => void;
  accounts: Account[];
  onSuccess: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ show, onClose, accounts, onSuccess }) => {
  const [fromAccountId, setFromAccountId] = useState<string>('');
  const [toAccountNumber, setToAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);

  const fromAccount = accounts.find(acc => acc.id === parseInt(fromAccountId));

  useEffect(() => {
    if (show) {
      loadAllAccounts();
    }
  }, [show]);

  const loadAllAccounts = async () => {
    setLoadingAccounts(true);
    try {
      const fetchedAccounts = await accountService.getAll();
      setAllAccounts(fetchedAccounts);
    } catch (err) {
      console.error('Error loading accounts:', err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const findAccountByNumber = (accountNumber: string): Account | undefined => {
    return allAccounts.find(acc => acc.accountNumber === accountNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccountId || !toAccountNumber || !amount) {
      setError('Por favor completa todos los campos');
      return;
    }

    const toAccount = findAccountByNumber(toAccountNumber);
    if (!toAccount) {
      setError('Número de cuenta de destino no válido');
      return;
    }

    if (parseInt(fromAccountId) === toAccount.id) {
      setError('No puedes transferir a la misma cuenta');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }

    if (fromAccount && amountNum > fromAccount.balance) {
      setError('Saldo insuficiente');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await transactionService.createTransfer({
        fromAccountId: parseInt(fromAccountId),
        toAccountId: toAccount.id,
        amount: amountNum
      });
      
      setSuccess(`Transferencia de $${amountNum.toLocaleString('es-ES')} realizada exitosamente a cuenta ${toAccountNumber}`);
      
      setTimeout(() => {
        setFromAccountId('');
        setToAccountNumber('');
        setAmount('');
        setSuccess('');
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Error creating transfer:', err);
      setError(err.response?.data?.message || 'Error al realizar la transferencia');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-exchange-alt me-2"></i>
              Realizar Transferencia
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {loadingAccounts && (
                <div className="text-center py-3">
                  <LoadingSpinner />
                  <p className="text-muted mt-2">Cargando cuentas disponibles...</p>
                </div>
              )}
              
              {error && <ErrorMessage message={error} />}
              {success && <SuccessMessage message={success} />}
              
              <div className="mb-3">
                <label htmlFor="fromAccount" className="form-label">Desde la Cuenta</label>
                <select
                  className="form-select"
                  id="fromAccount"
                  value={fromAccountId}
                  onChange={(e) => {
                    setFromAccountId(e.target.value);
                    // Reset toAccountNumber if it's the same account
                    const selectedFromAccount = accounts.find(acc => acc.id === parseInt(e.target.value));
                    if (selectedFromAccount && toAccountNumber === selectedFromAccount.accountNumber) {
                      setToAccountNumber('');
                    }
                  }}
                  required
                  disabled={loading}
                >
                  <option value="">Selecciona cuenta de origen...</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountNumber} - ${account.balance.toLocaleString('es-ES')}
                    </option>
                  ))}
                </select>
              </div>

              {fromAccount && (
                <div className="alert alert-info">
                  <small>
                    <strong>Saldo disponible:</strong> ${fromAccount.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </small>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="toAccount" className="form-label">Número de Cuenta de Destino</label>
                <input
                  type="text"
                  className="form-control"
                  id="toAccount"
                  value={toAccountNumber}
                  onChange={(e) => setToAccountNumber(e.target.value)}
                  placeholder="Ingresa el número de cuenta"
                  required
                  disabled={loading || !fromAccountId || loadingAccounts}
                />
                {!fromAccountId && (
                  <small className="text-muted">Primero selecciona la cuenta de origen</small>
                )}
                {toAccountNumber && findAccountByNumber(toAccountNumber) && (
                  <small className="text-success d-block mt-1">
                    <i className="fas fa-check-circle me-1"></i>
                    Cuenta válida encontrada
                  </small>
                )}
                {toAccountNumber && !findAccountByNumber(toAccountNumber) && (
                  <small className="text-danger d-block mt-1">
                    <i className="fas fa-times-circle me-1"></i>
                    Número de cuenta no encontrado
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Monto a Transferir</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    max={fromAccount?.balance || undefined}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading || !!success}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading || loadingAccounts || !!success}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando...
                  </>
                ) : success ? (
                  <>
                    <i className="fas fa-check-circle me-2"></i>
                    Completado
                  </>
                ) : (
                  <>
                    <i className="fas fa-check me-2"></i>
                    Transferir
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
