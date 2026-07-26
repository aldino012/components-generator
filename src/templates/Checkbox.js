// src/templates/Checkbox.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Dark Mode ready, aksesibilitas penuh, dan layout yang robust.
 */
const ${componentName} = ({
  label,
  description,
  error,
  checked,
  onChange,
  disabled = false,    // Boolean: Menonaktifkan checkbox
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = \`\${id}-error\`;
  const descId = description ? \`\${id}-desc\` : undefined;

  // =========================================================================
  // 1. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const containerClasses = ['relative flex items-start', className].filter(Boolean).join(' ');
  
  // Styling untuk input checkbox itu sendiri
  const checkboxClasses = \`
    h-4 w-4 rounded border-slate-300 text-indigo-600 
    focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 
    dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 
    dark:focus:ring-offset-slate-900 dark:focus:ring-indigo-500
    transition-colors duration-200 cursor-pointer
    \${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    \${error ? 'border-rose-500 text-rose-600 focus:ring-rose-500 dark:border-rose-500' : ''}
  \`.replace(/\\s+/g, ' ').trim();

  // Styling untuk teks label
  const labelClasses = \`
    text-sm font-medium select-none
    \${disabled ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-900 dark:text-slate-100 cursor-pointer'}
    \${error ? 'text-rose-700 dark:text-rose-400' : ''}
  \`.replace(/\\s+/g, ' ').trim();

  // Styling untuk deskripsi
  const descClasses = 'text-sm text-slate-500 dark:text-slate-400 mt-0.5';

  // Menghubungkan aria-describedby ke deskripsi DAN error (jika ada)
  const ariaDescribedBy = [descId, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={containerClasses}>
      <div className="flex h-6 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={checkboxClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
      </div>
      
      {(label || description) && (
        <div className="ml-3 text-sm leading-6">
          {label && (
            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          )}
          {description && (
            <p id={descId} className={descClasses}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Error Message (Ditempatkan di flow normal, bukan absolute, agar tidak menumpuk) */}
      {error && (
        <p id={errorId} className="absolute -bottom-5 left-7 mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};