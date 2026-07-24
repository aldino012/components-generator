// src/templates/Toast.js

module.exports = (componentName) => {
  return `"use client";

import React, { useEffect } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 */
const ${componentName} = ({
  isOpen,
  onClose,
  variant = 'info',       // info, success, warning, error
  position = 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  title,
  children,
  duration = 5000,        // Auto-hide dalam ms. Set 0 untuk disable.
  className = '',
  ...props
}) => {
  // Auto-hide logic
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  // Posisi fixed
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  // Warna berdasarkan variant
  const variantClasses = {
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
  };

  return (
    <div className={\`fixed z-[100] \${positionClasses[position]} \${className}\`} {...props}>
      <div className={\`flex items-start gap-3 p-4 rounded-lg shadow-lg min-w-[300px] \${variantClasses[variant]}\`}>
        <div className="flex-1">
          {title && <h3 className="font-bold text-sm">{title}</h3>}
          <span className="text-sm">{children}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full opacity-70 hover:opacity-100 hover:bg-gray-200 transition-opacity"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ${componentName};
`;
};