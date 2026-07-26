// src/templates/Input.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Dark Mode ready, aksesibilitas penuh, dan dukungan ikon fleksibel.
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  type = 'text',       // 'text', 'email', 'password', 'number', 'color', dll.
  icon,                // React Node: Ikon di kiri atau kanan
  iconPosition = 'left', // 'left' or 'right'
  size = 'md',         // UKURAN: 'sm', 'md', 'lg'
  disabled = false,    // Boolean: Menonaktifkan input
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const helperId = \`\${id}-helper\`;

  // =========================================================================
  // 1. PUSAT KONTROL UKURAN
  // =========================================================================
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm rounded-md',
    md: 'px-3 py-2.5 text-sm rounded-lg',
    lg: 'px-4 py-3 text-base rounded-lg',
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const baseClasses = 'block w-full border-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200';
  
  const stateClasses = error 
    ? 'ring-rose-300 dark:ring-rose-800 text-rose-900 dark:text-rose-100 focus:ring-rose-600 dark:focus:ring-rose-500' 
    : '';

  // Penyesuaian padding jika ada ikon
  const iconPaddingLeft = icon && iconPosition === 'left' ? 'pl-10' : '';
  const iconPaddingRight = icon && iconPosition === 'right' ? 'pr-10' : '';

  // Penyesuaian khusus untuk tipe input tertentu
  const typeClasses = type === 'number' 
    ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' 
    : type === 'color' 
      ? 'h-10 w-20 p-1 cursor-pointer' 
      : '';

  const inputClasses = [
    baseClasses, 
    sizes[size], 
    stateClasses, 
    typeClasses, 
    iconPaddingLeft, 
    iconPaddingRight
  ].filter(Boolean).join(' ');

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
        {/* Ikon Kiri */}
        {icon && iconPosition === 'left' && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          id={id}
          type={type}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        
        {/* Ikon Kanan */}
        {icon && iconPosition === 'right' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
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