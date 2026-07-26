// src/templates/Badge.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Modern palette, Dark Mode ready, dan dukungan posisi absolut.
 */
const ${componentName} = ({
  children,
  variant = 'primary',   // WARNA: primary, secondary, info, success, warning, error, ghost
  size = 'md',           // UKURAN: xs, sm, md, lg
  outline = false,       // STYLE: true (garis tepi), false (solid)
  position,              // POSISI ABSOLUT: 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  closeable = false,     // FITUR: true (menampilkan tombol close)
  onClose,               // FUNGSI: Dipanggil saat tombol close diklik
  className = '',
  ...props
}) => {

  // =========================================================================
  // 1. PUSAT KONTROL WARNA (Modern Palette & Dark Mode)
  // =========================================================================
  const colors = {
    primary:   { solid: 'bg-indigo-600 text-white dark:bg-indigo-500', outline: 'border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' },
    secondary: { solid: 'bg-slate-600 text-white dark:bg-slate-500', outline: 'border border-slate-600 text-slate-600 dark:border-slate-400 dark:text-slate-400' },
    info:      { solid: 'bg-sky-600 text-white dark:bg-sky-500', outline: 'border border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400' },
    success:   { solid: 'bg-emerald-600 text-white dark:bg-emerald-500', outline: 'border border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400' },
    warning:   { solid: 'bg-amber-500 text-white dark:bg-amber-500', outline: 'border border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-400' },
    error:     { solid: 'bg-rose-600 text-white dark:bg-rose-500', outline: 'border border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400' },
    ghost:     { solid: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', outline: 'border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400' }
  };

  // =========================================================================
  // 2. PUSAT KONTROL UKURAN
  // =========================================================================
  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px] font-semibold',
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  // =========================================================================
  // 3. PUSAT KONTROL POSISI ABSOLUT (Untuk Notification Badge)
  // =========================================================================
  const positions = {
    'top-right': 'absolute -top-1 -right-1',
    'top-left': 'absolute -top-1 -left-1',
    'bottom-right': 'absolute -bottom-1 -right-1',
    'bottom-left': 'absolute -bottom-1 -left-1',
  };

  // =========================================================================
  // 4. LOGIKA PENGGABUNGAN CLASS (Clean & Aman)
  // =========================================================================
  const variantType = outline ? 'outline' : 'solid';
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-colors duration-200';
  
  const colorClass = colors[variant]?.[variantType] || colors.primary.solid;
  const sizeClass = sizes[size] || sizes.md;
  const positionClass = position ? positions[position] : '';
  
  const finalClassName = [baseClasses, colorClass, sizeClass, positionClass, className].filter(Boolean).join(' ');

  return (
    <span className={finalClassName} {...props}>
      {children}
      
      {closeable && (
        <button 
          type="button"
          onClick={onClose} 
          className="ml-1.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          aria-label="Tutup badge"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default ${componentName};
`;
};