import React from 'react';

export default function Button({ children, onClick, type = 'button', variant = 'primary', ...props }) {
  const baseStyle = {
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  const variants = {
    primary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#e2e8f0',
      color: '#1e293b',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...(variants[variant] || variants.primary) }}
      {...props}
    >
      {children}
    </button>
  );
}
