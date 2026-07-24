// src/templates/Switch.js
module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Modern toggle switch
 */
const ${componentName} = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  helperText,
  size = 'md',           // 'sm', 'md', 'lg'
  labelPosition = 'right', // 'left' or 'right'
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  // Size configurations – precise positioning
  const sizeClasses = {
    sm: {
      switch: 'h-4 w-7',
      circle: 'h-3 w-3',
      translateChecked: 'translate-x-3.5', // 0.875rem
    },
    md: {
      switch: 'h-5 w-9',
      circle: 'h-4 w-4',
      translateChecked: 'translate-x-4.5', // 1.125rem
    },
    lg: {
      switch: 'h-6 w-11',
      circle: 'h-5 w-5',
      translateChecked: 'translate-x-5.5', // 1.375rem
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={\`\${className}\`}>
      <div className="flex items-center gap-2">
        {/* Label – left side */}
        {label && labelPosition === 'left' && (
          <label
            htmlFor={id}
            className={\`text-sm font-medium leading-6 text-gray-900 select-none \${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }\`}
          >
            {label}
          </label>
        )}

        {/* Switch track (button with role="switch") */}
        <button
          id={id}
          role="switch"
          type="button"
          aria-checked={checked}
          onClick={() => {
            if (!disabled && onChange) {
              onChange(!checked);
            }
          }}
          disabled={disabled}
          className={\`
            relative inline-flex shrink-0 rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
            \${checked ? 'bg-indigo-600' : 'bg-gray-200'}
            \${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            \${currentSize.switch}
          \`}
          {...props}
        >
          {/* Circle knob */}
          <span
            aria-hidden="true"
            className={\`
              pointer-events-none inline-block transform rounded-full bg-white shadow ring-0
              transition-all duration-200 ease-in-out
              \${currentSize.circle}
              \${checked ? currentSize.translateChecked : 'translate-x-0.5'}
              translate-y-0.5
            \`}
          />
        </button>

        {/* Label – right side */}
        {label && labelPosition === 'right' && (
          <label
            htmlFor={id}
            className={\`text-sm font-medium leading-6 text-gray-900 select-none \${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }\`}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}

      {/* Helper text */}
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