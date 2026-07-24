// src/templates/Textarea.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Multi-line text input
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  rows = 4,
  resize = 'vertical', // 'none', 'vertical', 'horizontal', 'both'
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const baseClasses = \`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 \${resizeClasses[resize]}\`;
  const stateClasses = error ? 'ring-red-300 focus:ring-red-500 text-red-900' : '';

  return (
    <div className={\`w-full \${className}\`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">
          {label}
        </label>
      )}
      
      <textarea
        id={id}
        rows={rows}
        className={\`\${baseClasses} \${stateClasses}\`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
      />

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