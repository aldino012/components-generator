// src/templates/Slider.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState, useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Custom thumb, Dark Mode ready, dan Aksesibilitas Keyboard penuh.
 */
const ${componentName} = ({
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  showValue = true,
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  // Hitung persentase untuk posisi thumb dan lebar fill
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isControlled) setInternalValue(newValue);
    if (onChange) onChange(e);
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const wrapperClasses = \`flex flex-col space-y-2 \${className} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`;
  
  const labelClasses = \`text-sm font-medium \${error ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}\`;
  const valueClasses = \`text-sm font-medium \${error ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}\`;

  // Track & Thumb Styling (Pendekatan Modern: Track terpisah dari Input)
  const trackBg = 'absolute w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700';
  const trackFill = \`absolute h-2 rounded-full transition-all duration-75 \${error ? 'bg-rose-600 dark:bg-rose-500' : 'bg-indigo-600 dark:bg-indigo-500'}\`;
  
  // Thumb: w-5 = 20px, jadi offset tengah adalah 10px
  const thumbClasses = \`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white dark:bg-slate-200 border-2 shadow-sm transition-all duration-75 pointer-events-none \${error ? 'border-rose-600 dark:border-rose-500' : 'border-indigo-600 dark:border-indigo-500'}\`;
  
  // Input asli dibuat transparan (opacity-0) tapi tetap di atas (z-20) agar bisa diklik/di-drag dan diakses keyboard
  const inputClasses = 'absolute w-full h-2 opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed';

  const ariaDescribedBy = [error ? \`\${id}-error\` : null, helperText ? \`\${id}-helper\` : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={wrapperClasses} {...props}>
      {/* Header: Label & Value */}
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
          {showValue && <span className={valueClasses}>{currentValue}</span>}
        </div>
      )}

      {/* Slider Container */}
      <div className="relative h-5 flex items-center">
        {/* 1. Background Track */}
        <div className={trackBg}></div>
        
        {/* 2. Filled Track (Lebar dinamis berdasarkan persentase) */}
        <div className={trackFill} style={{ width: \`\${percentage}%\` }}></div>
        
        {/* 3. Visual Thumb (Posisi dinamis, dikurangi 10px agar tepat di tengah) */}
        <div className={thumbClasses} style={{ left: \`calc(\${percentage}% - 10px)\` }}></div>
        
        {/* 4. Actual Input (Transparan, menangkap interaksi & keyboard) */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className={inputClasses}
          aria-labelledby={label ? id : undefined}
          aria-valuenow={currentValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p id={\`\${id}-error\`} className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p id={\`\${id}-helper\`} className="text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};