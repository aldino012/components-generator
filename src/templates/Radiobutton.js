// src/templates/Radiobutton.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Modern radio button group
 */
const ${componentName} = ({
  label,
  options = [],
  name,
  value,
  onChange,
  error,
  helperText,
  orientation = 'vertical', // 'vertical' | 'horizontal'
  size = 'md',              // 'sm', 'md', 'lg'
  className = '',
  ...props
}) => {
  const groupId = useId();
  const errorId = \`\${groupId}-error\`;
  const helperId = \`\${groupId}-helper\`;
  const radioName = name || groupId;

  // Size configurations for the circle and text
  const sizeClasses = {
    sm: {
      radio: 'h-4 w-4',
      label: 'text-sm ml-2',
      group: 'space-y-2',
    },
    md: {
      radio: 'h-5 w-5',
      label: 'text-sm ml-3',
      group: 'space-y-3',
    },
    lg: {
      radio: 'h-6 w-6',
      label: 'text-base ml-3',
      group: 'space-y-3.5',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  // Orientation styles
  const flexOrientation = orientation === 'horizontal' 
    ? 'flex flex-wrap gap-x-6 gap-y-2' 
    : 'flex flex-col ' + currentSize.group;

  return (
    <fieldset className={\`w-full \${className}\`} {...props}>
      {label && (
        <legend className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
        </legend>
      )}
      
      <div className={flexOrientation} role="radiogroup" aria-describedby={error ? errorId : helperText ? helperId : undefined}>
        {options.map((option, idx) => {
          const optionId = \`\${groupId}-option-\${idx}\`;
          const isDisabled = option.disabled || false;
          const isChecked = value === option.value;

          return (
            <div key={option.value} className="flex items-center">
              <input
                id={optionId}
                name={radioName}
                type="radio"
                value={option.value}
                checked={isChecked}
                onChange={onChange}
                disabled={isDisabled}
                className={\`
                  \${currentSize.radio} 
                  border-gray-300 text-indigo-600 
                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-150
                \`}
                aria-describedby={error ? errorId : helperText ? helperId : undefined}
              />
              <label
                htmlFor={optionId}
                className={\`
                  \${currentSize.label} 
                  font-medium text-gray-700 
                  select-none
                  \${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                \`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={helperId} className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

export default ${componentName};
`;
};