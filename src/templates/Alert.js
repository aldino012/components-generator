// src/templates/Alert.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  children,
  variant = 'info',       // info, success, warning, error
  dismissible = false,
  onClose,
  icon = null,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Warna latar, border, dan teks berdasarkan varian
  const variantClasses = {
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border border-red-200 text-red-800'
  };

  const classes = \`flex items-start gap-3 p-4 shadow-md rounded-lg \${variantClasses[variant] || variantClasses.info} \${className}\`;

  // Ikon default (stroke-current akan mengikuti warna teks)
  const defaultIcons = {
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div role="alert" className={classes} {...props}>
      {icon || defaultIcons[variant]}
      <span className="flex-1 font-medium">{children}</span>
      
      {dismissible && (
        <button 
          onClick={handleClose} 
          className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full hover:bg-gray-200 focus:outline-none opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ${componentName};
`;
};