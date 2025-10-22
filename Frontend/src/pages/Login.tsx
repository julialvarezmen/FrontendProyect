import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ui/ErrorMessage';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa ambos campos');
      return;
    }
    
    // Simular login (sin conexión a API)
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
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
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 py-2">
            🔐 Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;