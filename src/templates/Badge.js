// src/templates/Badge.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  children,
  variant = 'primary',   // primary, secondary, accent, ghost, info, success, warning, error
  size = 'md',           // xs, sm, md, lg
  outline = false,
  position,              // top-right, top-left, bottom-right, bottom-left (absolute positioning)
  closeable = false,
  onClose,
  className = '',
  ...props
}) => {
  // 1. Variant colors mapping (solid background + text)
  const variantClasses = {
    primary:   'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    accent:    'bg-purple-500 text-white',
    info:      'bg-blue-300 text-blue-900',
    success:   'bg-green-500 text-white',
    warning:   'bg-yellow-500 text-black',
    error:     'bg-red-500 text-white',
    ghost:     'bg-transparent text-gray-700 hover:bg-gray-100',
  };

  // 2. Outline variant colors (border + text only)
  const outlineClasses = {
    primary:   'border border-blue-500 text-blue-500 bg-transparent',
    secondary: 'border border-gray-500 text-gray-500 bg-transparent',
    accent:    'border border-purple-500 text-purple-500 bg-transparent',
    info:      'border border-blue-300 text-blue-300 bg-transparent',
    success:   'border border-green-500 text-green-500 bg-transparent',
    warning:   'border border-yellow-500 text-yellow-500 bg-transparent',
    error:     'border border-red-500 text-red-500 bg-transparent',
    ghost:     'border border-gray-300 text-gray-500 bg-transparent', // ghost outline
  };

  // 3. Size classes
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-sm',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  // Base badge style (rounded, inline-flex, items-center, font-medium)
  let classes = \`inline-flex items-center font-medium rounded-full \${sizeClasses[size] || sizeClasses.md}\`;

  // Apply variant or outline
  if (outline) {
    classes += \` \${outlineClasses[variant] || outlineClasses.primary}\`;
  } else {
    classes += \` \${variantClasses[variant] || variantClasses.primary}\`;
  }

  // Position absolute (notification badge)
  if (position) {
    classes += ' absolute';
    if (position === 'top-right') classes += ' top-0 right-0 -translate-y-1/2 translate-x-1/2';
    else if (position === 'top-left') classes += ' top-0 left-0 -translate-y-1/2 -translate-x-1/2';
    else if (position === 'bottom-right') classes += ' bottom-0 right-0 translate-y-1/2 translate-x-1/2';
    else if (position === 'bottom-left') classes += ' bottom-0 left-0 translate-y-1/2 -translate-x-1/2';
  }

  // Custom className
  if (className) classes += \` \${className}\`;

  return (
    <span className={classes} {...props}>
      {children}
      
      {closeable && (
        <button 
          onClick={onClose} 
          className="ml-1 hover:opacity-70 transition-opacity focus:outline-none"
          aria-label="Close badge"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default ${componentName};
`;
};