import React from 'react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="alert alert-success d-flex align-items-center" role="alert">
      <i className="fas fa-check-circle me-2"></i>
      <div>{message}</div>
    </div>
  );
};

export default SuccessMessage;