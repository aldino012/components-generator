// src/templates/Badge.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS dan DaisyUI.
 */
const ${componentName} = ({
  children,
  variant = 'primary',   // primary, secondary, accent, ghost, info, success, warning, error
  size = 'md',           // xs, sm, md, lg
  outline = false,
  position,              // top-right, top-left, bottom-right, bottom-left (Bootstrap absolute concept)
  closeable = false,     // Show close 'x' icon
  onClose,               // Callback when closed
  className = '',
  ...props
}) => {
  // 1. Base & Variant Classes (DaisyUI)
  let classes = \`badge transition-all duration-200 badge-\${variant}\`;

  // 2. Size Classes
  if (size === 'xs') classes += ' badge-xs text-xs';
  else if (size === 'sm') classes += ' badge-sm text-sm';
  else if (size === 'lg') classes += ' badge-lg text-base';
  // 'md' is default

  // 3. Outline Style
  if (outline) classes += ' badge-outline';

  // 4. Absolute Positioning (Bootstrap concept for notification badges)
  if (position) {
    classes += ' absolute';
    if (position === 'top-right') classes += ' top-0 right-0';
    else if (position === 'top-left') classes += ' top-0 left-0';
    else if (position === 'bottom-right') classes += ' bottom-0 right-0';
    else if (position === 'bottom-left') classes += ' bottom-0 left-0';
  }

  // Append custom className
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