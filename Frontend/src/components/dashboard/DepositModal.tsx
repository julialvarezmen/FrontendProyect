import React, { useState } from 'react';
import { Account } from '../../types';
import { transactionService } from '../../api/transactionService';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';

interface DepositModalProps {
  show: boolean;
  onClose: () => void;
  accounts: Account[];
  onSuccess: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ show, onClose, accounts, onSuccess }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await transactionService.createTransaction(parseInt(selectedAccountId), {
        amount: amountNum,
        type: 'DEPOSIT'
      });
      
      setSuccess(`Depósito de $${amountNum.toLocaleString('es-ES')} realizado exitosamente`);
      
      setTimeout(() => {
        setSelectedAccountId('');
        setAmount('');
        setSuccess('');
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Error creating deposit:', err);
      setError(err.response?.data?.message || 'Error al realizar el depósito');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              <i className="fas fa-arrow-down me-2"></i>
              Realizar Depósito
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

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Monto a Depositar</label>
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
              <button type="submit" className="btn btn-success" disabled={loading || !!success}>
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
                    Depositar
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

export default DepositModal;
