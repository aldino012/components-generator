// src/templates/Radiobutton.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Dark Mode ready, aksesibilitas penuh (fieldset/legend), dan layout fleksibel.
 */
const ${componentName} = ({
  label,
  options = [],        // Array of { value: 'x', label: 'Y', disabled: false }
  name,                // Nama grup radio (wajib agar saling eksklusif)
  value,               // Nilai yang sedang dipilih (controlled)
  onChange,            // Fungsi saat nilai berubah
  error,
  helperText,
  orientation = 'vertical', // 'vertical' | 'horizontal'
  size = 'md',         // UKURAN: 'sm', 'md', 'lg'
  disabled = false,    // Boolean: Menonaktifkan seluruh grup
  className = '',
  ...props
}) => {
  const groupId = useId();
  const errorId = \`\${groupId}-error\`;
  const helperId = \`\${groupId}-helper\`;
  const radioName = name || groupId;

  // =========================================================================
  // 1. PUSAT KONTROL UKURAN
  // =========================================================================
  const sizes = {
    sm: { radio: 'h-4 w-4', label: 'text-sm', gap: 'gap-2' },
    md: { radio: 'h-5 w-5', label: 'text-sm', gap: 'gap-3' },
    lg: { radio: 'h-6 w-6', label: 'text-base', gap: 'gap-4' },
  };
  const currentSize = sizes[size] || sizes.md;

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const containerClasses = ['w-full', className].filter(Boolean).join(' ');
  
  const legendClasses = \`block mb-2 text-sm font-medium \${error ? 'text-rose-700 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}\`;
  
  const groupClasses = \`flex \${orientation === 'horizontal' ? 'flex-wrap gap-x-6 gap-y-2' : \`flex-col \${currentSize.gap}\`}\`;

  const ariaDescribedBy = [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset className={containerClasses} {...props}>
      {/* Label Grup (Legend) */}
      {label && (
        <legend className={legendClasses}>
          {label}
        </legend>
      )}
      
      {/* Grup Radio */}
      <div className={groupClasses} role="radiogroup" aria-describedby={ariaDescribedBy}>
        {options.map((option, idx) => {
          const optionId = \`\${groupId}-option-\${idx}\`;
          const isOptionDisabled = disabled || option.disabled || false;
          const isChecked = value === option.value;

          // Class untuk input radio
          const radioClasses = \`
            \${currentSize.radio} 
            border-slate-300 text-indigo-600 
            focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 
            dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-slate-900 dark:focus:ring-indigo-500
            transition-colors duration-200 cursor-pointer
            \${isOptionDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            \${error ? 'border-rose-500 text-rose-600 focus:ring-rose-500 dark:border-rose-500' : ''}
          \`.replace(/\\s+/g, ' ').trim();

          // Class untuk label teks
          const labelClasses = \`
            \${currentSize.label} font-medium select-none
            \${isOptionDisabled ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-700 dark:text-slate-200 cursor-pointer'}
            \${error ? 'text-rose-700 dark:text-rose-400' : ''}
          \`.replace(/\\s+/g, ' ').trim();

          return (
            <div key={option.value} className="flex items-center">
              <input
                id={optionId}
                name={radioName}
                type="radio"
                value={option.value}
                checked={isChecked}
                onChange={onChange}
                disabled={isOptionDisabled}
                className={radioClasses}
                aria-invalid={error ? 'true' : 'false'}
              />
              <label
                htmlFor={optionId}
                className={\`\${labelClasses} ml-3\`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-rose-600 dark:text-rose-400">
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p id={helperId} className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

export default ${componentName};
`;
};