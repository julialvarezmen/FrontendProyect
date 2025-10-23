import React, { useState } from 'react';
import { Account } from '../../types';
import { transactionService } from '../../api/transactionService';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';

interface WithdrawModalProps {
  show: boolean;
  onClose: () => void;
  accounts: Account[];
  onSuccess: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ show, onClose, accounts, onSuccess }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const selectedAccount = accounts.find(acc => acc.id === parseInt(selectedAccountId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAccountId || !amount) {
      setError('Por favor completa todos los campos');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }

    if (selectedAccount && amountNum > selectedAccount.balance) {
      setError('Saldo insuficiente');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await transactionService.createTransaction(parseInt(selectedAccountId), {
        amount: amountNum,
        type: 'WITHDRAWAL'
      });
      
      setSuccess(`Retiro de $${amountNum.toLocaleString('es-ES')} realizado exitosamente`);
      
      setTimeout(() => {
        setSelectedAccountId('');
        setAmount('');
        setSuccess('');
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Error creating withdrawal:', err);
      setError(err.response?.data?.message || 'Error al realizar el retiro');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              <i className="fas fa-arrow-up me-2"></i>
              Realizar Retiro
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <ErrorMessage message={error} />}
              {success && <SuccessMessage message={success} />}
              
              <div className="mb-3">
                <label htmlFor="account" className="form-label">Seleccionar Cuenta</label>
                <select
                  className="form-select"
                  id="account"
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">Selecciona una cuenta...</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountNumber} - ${account.balance.toLocaleString('es-ES')}
                    </option>
                  ))}
                </select>
              </div>

              {selectedAccount && (
                <div className="alert alert-info">
                  <small>
                    <strong>Saldo disponible:</strong> ${selectedAccount.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </small>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Monto a Retirar</label>
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
                    max={selectedAccount?.balance || undefined}
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
              <button type="submit" className="btn btn-danger" disabled={loading || !!success}>
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
                    Retirar
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

export default WithdrawModal;
