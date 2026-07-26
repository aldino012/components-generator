// src/templates/Textarea.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Konsisten dengan Input, Dark Mode ready, dan kontrol resize yang fleksibel.
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  rows = 4,              // Jumlah baris default
  resize = 'vertical',   // Arah resize: 'none', 'vertical', 'horizontal', 'both'
  disabled = false,      // Boolean: Menonaktifkan textarea
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  // =========================================================================
  // 1. PUSAT KONTROL RESIZE
  // =========================================================================
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS (Identik dengan Input untuk konsistensi)
  // =========================================================================
  const baseClasses = 'block w-full border-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 sm:text-sm sm:leading-6';
  
  const stateClasses = error 
    ? 'ring-rose-300 dark:ring-rose-800 text-rose-900 dark:text-rose-100 focus:ring-rose-600 dark:focus:ring-rose-500' 
    : '';

  const textareaClasses = [baseClasses, resizeClasses[resize], stateClasses].filter(Boolean).join(' ');
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
      
      {/* Textarea Field */}
      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={ariaDescribedBy}
        {...props}
      />

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