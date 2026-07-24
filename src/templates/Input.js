// src/templates/Input.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Modern form input
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  type = 'text',
  icon,
  iconPosition = 'left', // 'left' or 'right'
  size = 'md',           // 'sm', 'md', 'lg'
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  // Size configurations
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  // Base input styles (Tailwind UI style)
  const baseClasses = \`block w-full rounded-md border-0 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:leading-6 transition-all duration-200 \`;
  
  // State styles
  const stateClasses = error 
    ? 'text-red-900 ring-red-300 focus:ring-red-500' 
    : 'text-gray-900 ring-gray-300 focus:ring-indigo-600';

  return (
    <div className={\`w-full \${className}\`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative rounded-md shadow-sm">
        {icon && iconPosition === 'left' && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          type={type}
          className={\`\${baseClasses} \${stateClasses} \${sizeClasses[size]} \${icon && iconPosition === 'left' ? 'pl-10' : ''} \${icon && iconPosition === 'right' ? 'pr-10' : ''}\`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};