import React, { useState, useEffect } from 'react';
import { accountService } from '../../api/accountService';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';
import LoadingSpinner from '../ui/LoadingSpinner';

interface CreateAccountModalProps {
  show: boolean;
  onClose: () => void;
  userId: number;
  onSuccess: () => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ show, onClose, userId, onSuccess }) => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [validatingNumber, setValidatingNumber] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (show) {
      generateAccountNumber();
      setBalance('0');
      setError('');
      setSuccess('');
    }
  }, [show]);

  const generateAccountNumber = async () => {
    setValidatingNumber(true);
    setIsNumberValid(null);
    
    try {
      let newNumber = '';
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10;

      while (!isUnique && attempts < maxAttempts) {
        newNumber = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Check if this number already exists
        const allAccounts = await accountService.getAll();
        const exists = allAccounts.some(acc => acc.accountNumber === newNumber);
        
        if (!exists) {
          isUnique = true;
          setAccountNumber(newNumber);
          setIsNumberValid(true);
        }
        
        attempts++;
      }

      if (!isUnique) {
        setError('No se pudo generar un número de cuenta único. Intenta de nuevo.');
        setIsNumberValid(false);
      }
    } catch (err) {
      console.error('Error generating account number:', err);
      setError('Error al generar número de cuenta');
      setIsNumberValid(false);
    } finally {
      setValidatingNumber(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber) {
      setError('Por favor genera un número de cuenta válido');
      return;
    }

    const balanceNum = parseFloat(balance);
    if (isNaN(balanceNum) || balanceNum < 0) {
      setError('El saldo inicial debe ser mayor o igual a 0');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await accountService.create({
        accountNumber,
        balance: balanceNum,
        userId
      });
      
      setSuccess(`Cuenta ${accountNumber} creada exitosamente con saldo inicial de $${balanceNum.toLocaleString('es-ES')}`);
      
      setTimeout(() => {
        setAccountNumber('');
        setBalance('0');
        setSuccess('');
        setIsNumberValid(null);
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Error creating account:', err);
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">
              <i className="fas fa-plus-circle me-2"></i>
              Crear Nueva Cuenta
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <ErrorMessage message={error} />}
              {success && <SuccessMessage message={success} />}
              
              <div className="mb-3">
                <label htmlFor="accountNumber" className="form-label">Número de Cuenta</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    value={accountNumber}
                    readOnly
                    placeholder="Generando..."
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={generateAccountNumber}
                    disabled={loading || validatingNumber || !!success}
                  >
                    {validatingNumber ? (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    ) : (
                      <i className="fas fa-sync-alt"></i>
                    )}
                  </button>
                </div>
                {validatingNumber && (
                  <small className="text-muted d-block mt-1">
                    <LoadingSpinner />
                    Generando y validando número único...
                  </small>
                )}
                {isNumberValid === true && !validatingNumber && (
                  <small className="text-success d-block mt-1">
                    <i className="fas fa-check-circle me-1"></i>
                    Número de cuenta disponible
                  </small>
                )}
                {isNumberValid === false && !validatingNumber && (
                  <small className="text-danger d-block mt-1">
                    <i className="fas fa-times-circle me-1"></i>
                    Error al validar número
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="balance" className="form-label">Saldo Inicial</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                    disabled={loading || !!success}
                  />
                </div>
                <small className="text-muted">El saldo inicial puede ser 0 o mayor</small>
              </div>

              <div className="alert alert-info">
                <small>
                  <i className="fas fa-info-circle me-1"></i>
                  <strong>Nota:</strong> El número de cuenta se genera automáticamente de forma única.
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose} 
                disabled={loading || !!success}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-warning" 
                disabled={loading || validatingNumber || !isNumberValid || !!success}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creando...
                  </>
                ) : success ? (
                  <>
                    <i className="fas fa-check-circle me-2"></i>
                    Completado
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Crear Cuenta
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

export default CreateAccountModal;
