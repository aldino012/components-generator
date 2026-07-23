// src/templates/Toast.js

module.exports = (componentName) => {
  return `"use client";

import React, { useEffect } from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 */
const ${componentName} = ({
  isOpen,
  onClose,
  variant = 'info',       // info, success, warning, error
  position = 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  title,
  children,
  duration = 5000,        // Waktu otomatis hilang (ms). Set 0 untuk disable.
  className = '',
  ...props
}) => {
  // Auto-hide logic (Bootstrap toast concept)
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  // Position mapping (Tailwind fixed positioning)
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  // Variant mapping (DaisyUI alert colors)
  const variantClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };

  return (
    <div className={\`fixed z-[100] \${positionClasses[position]} \${className}\`} {...props}>
      <div className={\`alert shadow-lg \${variantClasses[variant]} min-w-[300px]\`}>
        <div className="flex-1">
          {title && <h3 className="font-bold text-sm">{title}</h3>}
          <span className="text-sm">{children}</span>
        </div>
        <button 
          className="btn btn-ghost btn-xs btn-circle" 
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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