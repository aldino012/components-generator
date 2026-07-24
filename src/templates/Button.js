// src/templates/Button.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  children,
  variant = 'primary',   // primary, secondary, accent, ghost, link, error, success, warning, info
  size = 'md',           // xs, sm, md, lg
  outline = false,
  block = false,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  // Solid variant colors
  const solidColors = {
    primary:   'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    accent:    'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    info:      'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-400',
    success:   'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning:   'bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-400',
    error:     'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost:     'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    link:      'bg-transparent text-blue-600 hover:underline focus:ring-blue-300'
  };

  // Outline variant colors
  const outlineColors = {
    primary:   'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    accent:    'border border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
    info:      'border border-blue-400 text-blue-400 hover:bg-blue-50 focus:ring-blue-400',
    success:   'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
    warning:   'border border-yellow-500 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-400',
    error:     'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    ghost:     'border border-gray-300 text-gray-600 hover:bg-gray-50 focus:ring-gray-300',
    link:      'text-blue-600 hover:underline focus:ring-blue-300'
  };

  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-5 py-2.5 text-base rounded-md',
  };

  // Base classes
  let classes = \`inline-flex items-center justify-center font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed \${sizeClasses[size] || sizeClasses.md}\`;

  // Apply variant colors
  if (variant === 'link' && !outline) {
    classes += \` \${solidColors.link}\`;
  } else if (variant === 'link' && outline) {
    classes += \` \${outlineColors.link}\`;
  } else if (outline) {
    classes += \` \${outlineColors[variant] || outlineColors.primary}\`;
  } else {
    classes += \` \${solidColors[variant] || solidColors.primary}\`;
  }

  // Block (full width)
  if (block) classes += ' w-full';

  // Custom className
  if (className) classes += \` \${className}\`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default ${componentName};
`;
};