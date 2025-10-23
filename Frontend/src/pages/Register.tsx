import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../components/ui/ErrorMessage';
import SuccessMessage from '../components/ui/SuccessMessage';
import { authService } from '../api/authService';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    dni: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.dni.trim() || !formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido');
      return;
    }

    setLoading(true);

    try {
      // Register the user
      const registerResponse = await authService.register({
        dni: formData.dni,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      console.log('Registration successful:', registerResponse);
      
      // Automatically log in the user
      const loginResponse = await authService.login({
        dni: formData.dni,
        password: formData.password
      });

      console.log('Auto-login successful:', loginResponse);

      // Store session data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', loginResponse.userId.toString());
      localStorage.setItem('userDni', formData.dni);

      setSuccess('¡Registro exitoso! Iniciando sesión...');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Error al registrar usuario. Por favor, intenta de nuevo.';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', err.response);
        
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage = `Error del servidor: ${err.response.status}`;
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', err.message);
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="register-card" style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div className="text-center mb-4">
          <div className="register-icon" style={{
            width: '80px',
            height: '80px',
            background: '#4A90E2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            fontSize: '2rem'
          }}>
            📝
          </div>
          <h2 className="register-title" style={{ color: '#2B2D42', fontWeight: '700', marginBottom: '0.5rem' }}>
            Crear Cuenta
          </h2>
          <p className="register-subtitle" style={{ color: '#4A4E69', marginBottom: '2rem' }}>
            Regístrate en el Gestor Bancario
          </p>
        </div>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="dni" className="form-label">DNI</label>
            <input
              type="text"
              className="form-control"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Ingresa tu DNI"
              required
              disabled={loading || !!success}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              required
              disabled={loading || !!success}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              disabled={loading || !!success}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={loading || !!success}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
              disabled={loading || !!success}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 mb-3"
            disabled={loading || !!success}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registrando...
              </>
            ) : success ? (
              <>
                <i className="fas fa-check-circle me-2"></i>
                Completado
              </>
            ) : (
              <>📝 Registrarse</>
            )}
          </button>

          <div className="text-center">
            <small className="text-muted">
              ¿Ya tienes cuenta? <Link to="/login" className="text-primary fw-bold">Inicia sesión aquí</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
