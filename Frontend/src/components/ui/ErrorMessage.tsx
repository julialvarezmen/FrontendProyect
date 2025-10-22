import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="fas fa-exclamation-circle me-2"></i>
      <div>{message}</div>
    </div>
  );
};

export default ErrorMessage;