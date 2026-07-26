// src/templates/Select.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Konsisten dengan Input, Dark Mode ready, dan Custom Chevron.
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  options = [],            // Array of { value: 'id', label: 'Teks' }
  placeholder = 'Pilih opsi...',
  size = 'md',             // UKURAN: 'sm', 'md', 'lg'
  disabled = false,        // Boolean: Menonaktifkan select
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  // =========================================================================
  // 1. PUSAT KONTROL UKURAN (Sama persis dengan Input untuk konsistensi)
  // =========================================================================
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm rounded-md',
    md: 'px-3 py-2.5 text-sm rounded-lg',
    lg: 'px-4 py-3 text-base rounded-lg',
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const baseClasses = 'block w-full border-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 appearance-none pr-10';
  
  const stateClasses = error 
    ? 'ring-rose-300 dark:ring-rose-800 text-rose-900 dark:text-rose-100 focus:ring-rose-600 dark:focus:ring-rose-500' 
    : '';

  const selectClasses = [baseClasses, sizes[size], stateClasses].filter(Boolean).join(' ');
  const containerClasses = ['w-full', className].filter(Boolean).join(' ');
  const labelClasses = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5';
  const ariaDescribedBy = [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Select Element */}
        <select
          id={id}
          disabled={disabled}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy}
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
        
        {/* Custom Chevron Icon (Absolute Positioned) */}
        <div className={\`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-200 \${disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}\`}>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600 dark:text-rose-400">
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};