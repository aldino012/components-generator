// src/templates/Alert.js

module.exports = (componentName) => {
  // PERHATIKAN: "use client" ada DI DALAM backtick (`), bukan return terpisah
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS dan DaisyUI.
 */
const ${componentName} = ({
  children,
  variant = 'info',       // info, success, warning, error
  dismissible = false,    // Bootstrap concept: show close button
  onClose,                // Callback when closed
  icon = null,            // Custom icon, if null uses default based on variant
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Base classes: DaisyUI alert + Tailwind layout/shadow/rounded
  const classes = \`alert flex items-start gap-3 shadow-md rounded-lg alert-\${variant} \${className}\`;

  // Default SVG Icons based on variant (DaisyUI style)
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
          className="btn btn-sm btn-circle btn-ghost opacity-70 hover:opacity-100 transition-opacity"
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