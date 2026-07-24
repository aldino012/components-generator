// src/templates/Checkbox.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Checkbox with label and description
 */
const ${componentName} = ({
  label,
  description,
  error,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;

  return (
    <div className={\`relative flex items-start \${className}\`}>
      <div className="flex h-6 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={\`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 transition-colors duration-200 \${error ? 'border-red-500 focus:ring-red-500' : ''}\`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      </div>
      
      {(label || description) && (
        <div className="ml-3 text-sm leading-6">
          {label && (
            <label htmlFor={id} className={\`font-medium \${error ? 'text-red-900' : 'text-gray-900'}\`}>
              {label}
            </label>
          )}
          {description && (
            <p className="text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      )}

      {error && (
        <p id={errorId} className="absolute -bottom-5 left-7 text-xs text-red-600 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};