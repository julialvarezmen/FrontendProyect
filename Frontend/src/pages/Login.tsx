import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../components/ui/ErrorMessage';
import { authService } from '../api/authService';

const Login: React.FC = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dni.trim() || !password.trim()) {
      setError('Por favor, completa ambos campos');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting login with DNI:', dni);
      const response = await authService.login({ dni, password });
      console.log('Login successful:', response);
      
      // Guardar información de sesión
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', response.userId.toString());
      localStorage.setItem('userDni', dni);
      
      console.log('Navigating to dashboard...');
      // Force reload to ensure App component picks up the localStorage change
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      // Set error message
      let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF8C42, #E67E22)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="login-card" style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
        maxWidth: '450px',
        width: '100%'
      }}>
        <div className="text-center mb-4">
          <div className="login-icon" style={{
            width: '80px',
            height: '80px',
            background: '#FF8C42',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            fontSize: '2rem'
          }}>
            🏦
          </div>
          <h2 className="login-title" style={{ color: '#2B2D42', fontWeight: '700', marginBottom: '0.5rem' }}>
            Gestor Bancario
          </h2>
          <p className="login-subtitle" style={{ color: '#4A4E69', marginBottom: '2rem' }}>
            Inicia sesión con tu DNI y contraseña
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="dni" className="form-label">DNI</label>
            <input
              type="text"
              className="form-control"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Ingresa tu DNI"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-warning w-100 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Iniciando sesión...
              </>
            ) : (
              <>🔐 Iniciar Sesión</>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            ¿No tienes cuenta? <Link to="/register" className="text-warning">Regístrate aquí</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;