// src/templates/Modal.js

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
  title,
  children,
  footer,
  size = 'md',           // sm, md, lg, xl
  closeOnBackdrop = true,
  className = '',
  ...props
}) => {
  // Lock body scroll when modal is open
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

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
  };

  return (
    <div 
      className={\`modal modal-open bg-black/50 backdrop-blur-sm transition-opacity \${className}\`}
      onClick={closeOnBackdrop ? onClose : undefined}
      {...props}
    >
      <div 
        className={\`modal-box bg-base-100 relative w-11/12 \${sizeClasses[size]} shadow-2xl\`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {title && <h3 className="font-bold text-lg pr-8">{title}</h3>}
        <div className="py-4">{children}</div>
        {footer && <div className="modal-action">{footer}</div>}
      </div>
    </div>
  );
};

export default ${componentName};
`;
};