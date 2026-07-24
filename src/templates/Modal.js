// src/templates/Modal.js

module.exports = (componentName) => {
  return `"use client";

import React, { useEffect } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',           // sm, md, lg, xl
  closeOnBackdrop = true,
  className = '',
  ...props
}) => {
  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Ukuran maksimal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
  };

  return (
    <div
      className={\`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity \${className}\`}
      onClick={closeOnBackdrop ? onClose : undefined}
      {...props}
    >
      <div
        className={\`relative w-11/12 bg-white rounded-lg shadow-2xl p-6 \${sizeClasses[size] || sizeClasses.md}\`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol close */}
        <button
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Judul */}
        {title && <h3 className="text-lg font-bold text-gray-900 pr-8">{title}</h3>}

        {/* Konten */}
        <div className="py-4 text-gray-700">{children}</div>

        {/* Footer (biasanya tombol aksi) */}
        {footer && (
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default ${componentName};
`;
};