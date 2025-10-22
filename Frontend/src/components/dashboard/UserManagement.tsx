import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { CreateUserDTO } from '../../types';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';

interface UserManagementProps {
  onUserCreated?: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onUserCreated }) => {
  const { users, loading: loadingUsers, error: errorUsers, createUser, deleteUser } = useUsers();
  const [newUser, setNewUser] = useState<CreateUserDTO>({ dni: '', name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorForm('');
      setSuccessMessage('');
      await createUser(newUser);
      setNewUser({ dni: '', name: '', email: '', password: '' });
      setSuccessMessage('Usuario creado exitosamente');
      if (onUserCreated) onUserCreated();
    } catch (err) {
      setErrorForm(err instanceof Error ? err.message : 'Error al crear usuario');
    }
  };

  if (loadingUsers) return <div className="text-center">Cargando usuarios...</div>;

const handleDeleteUser = async (userId: number) => {
  try {
    setErrorForm('');
    setSuccessMessage('');
    await deleteUser(userId);
    setSuccessMessage('Usuario eliminado exitosamente');
  } catch (err) {
    setErrorForm(err instanceof Error ? err.message : 'Error al eliminar usuario');
  }
};
  return (
   <div className="card" style={{
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      <div className="card-header bg-white border-0">
        <h5 className="mb-0"><i className="fas fa-users me-2"></i>Usuarios</h5>
      </div>
      <div className="card-body">
        {errorUsers && <ErrorMessage message={errorUsers} />}
        {errorForm && <ErrorMessage message={errorForm} />}
        {successMessage && <SuccessMessage message={successMessage} />}

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="DNI *"
              value={newUser.dni}
              onChange={(e) => setNewUser({ ...newUser, dni: e.target.value })}
              required
              style={{
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '0.875rem',
              transition: 'border-color 0.2s ease',
              backgroundColor: '#F9FAFB'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Nombre *"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control form-control-sm"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Contraseña *"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-sm w-100">Crear Usuario</button>
        </form>

        <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.dni}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#FEE2E2',
                        color: '#B91C1C',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FECACA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                    >
                      <i className="fas fa-trash me-1"></i>Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;