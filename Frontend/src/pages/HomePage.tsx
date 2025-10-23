import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF8C42, #E67E22)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
      
    }}>
      
      <div className="homepage-content" style={{
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
        maxWidth: '800px',
        width: '100%'
      }}>
        <div className="text-center mb-5">
          <div className="homepage-logo" style={{
            width: '100px',
            height: '100px',
            background: '#f77b3dff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'white',
            fontSize: '2.5rem'
          }}>
            🏦
          </div>
          <h1 className="homepage-title" style={{
            color: '#2B2D42',
            fontWeight: '700',
            fontSize: '2.5rem',
            marginBottom: '0.5rem'
          }}>
            Gestor Bancario
          </h1>
          <p className="homepage-subtitle" style={{
            color: '#4A4E69',
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}>
            Sistema de gestión financiera integral
          </p>
        </div>

        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div className="feature-card" style={{
            textAlign: 'center',
            padding: '1.5rem',
            borderRadius: '15px',
            background: '#faf9f8ff',
            transition: 'transform 0.3s ease'
          }}>
            <div className="feature-icon" style={{
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              margin: '0 auto 1rem',
              background: '#FF8C42'
            }}>
              👥
            </div>
            <h3 style={{ color: '#2B2D42', marginBottom: '0.5rem' }}>Usuarios</h3>
            <p style={{ color: '#4A4E69', margin: 0, fontSize: '0.95rem' }}>
              Gestiona todos los usuarios del sistema bancario
            </p>
          </div>

          <div className="feature-card" style={{
            textAlign: 'center',
            padding: '1.5rem',
            borderRadius: '15px',
            background: '#F8F9FA',
            transition: 'transform 0.3s ease'
          }}>
            <div className="feature-icon" style={{
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              margin: '0 auto 1rem',
              background: '#4A90E2'
            }}>
              💳
            </div>
            <h3 style={{ color: '#2B2D42', marginBottom: '0.5rem' }}>Cuentas</h3>
            <p style={{ color: '#4A4E69', margin: 0, fontSize: '0.95rem' }}>
              Crea, edita y elimina cuentas bancarias
            </p>
          </div>

          <div className="feature-card" style={{
            textAlign: 'center',
            padding: '1.5rem',
            borderRadius: '15px',
            background: '#F8F9FA',
            transition: 'transform 0.3s ease'
          }}>
            <div className="feature-icon" style={{
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              margin: '0 auto 1rem',
              background: '#50C878'
            }}>
              🔁
            </div>
            <h3 style={{ color: '#2B2D42', marginBottom: '0.5rem' }}>Transacciones</h3>
            <p style={{ color: '#4A4E69', margin: 0, fontSize: '0.95rem' }}>
              Realiza transferencias, depósitos y retiros
            </p>
          </div>
        </div>

        <div className="text-center mt-5" style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/login" 
            className="btn btn-warning btn-lg homepage-btn"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            👤 Iniciar Sesión
          </Link>
          <Link 
            to="/register" 
            className="btn btn-primary btn-lg homepage-btn"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            📝 Registrarse
          </Link>
        </div>

        <div className="text-center mt-3">
          <small className="text-muted">
            Únete a nuestro sistema bancario seguro y confiable
          </small>
        </div>
      </div>
    </div>
  );
};

export default HomePage;