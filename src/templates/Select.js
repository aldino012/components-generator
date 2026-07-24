// src/templates/Select.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Custom styled select dropdown
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  options = [],       // Array of { value: '', label: '' }
  placeholder = 'Select an option',
  size = 'md',
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const baseClasses = \`block w-full rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6 transition-all duration-200 appearance-none bg-white\`;
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
      
      <div className="relative">
        <select
          id={id}
          className={\`\${baseClasses} \${stateClasses} \${sizeClasses[size]} pr-10\`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom Chevron Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
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