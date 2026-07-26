// src/templates/Button.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Full Props Control + Premium Click Feedback.
 */
const ${componentName} = ({
  children,
  variant = 'primary',   // WARNA: primary, secondary, info, success, warning, error, ghost, link
  size = 'md',           // UKURAN: xs, sm, md, lg, xl
  align = 'center',      // POSISI INTERNAL: start, center, end, between
  outline = false,       // STYLE: true (garis tepi), false (solid)
  block = false,         // POSISI EKSTERNAL: true (lebar penuh/w-full), false (sesuai konten)
  loading = false,       // STATE: true (menampilkan spinner & disable)
  disabled = false,      // STATE: true (tidak bisa diklik)
  type = 'button',       // HTML: 'button', 'submit', 'reset'
  className = '',        // OVERRIDE: Hanya untuk kebutuhan sangat spesifik di luar props di atas
  ...props
}) => {

  // =========================================================================
  // 1. PUSAT KONTROL WARNA
  // =========================================================================
  const colors = {
    primary:   { solid: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:ring-indigo-500', outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30 focus:ring-indigo-500' },
    secondary: { solid: 'bg-slate-600 text-white hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 focus:ring-slate-500', outline: 'border border-slate-600 text-slate-600 hover:bg-slate-50 dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-800 focus:ring-slate-500' },
    info:      { solid: 'bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 focus:ring-sky-500', outline: 'border border-sky-600 text-sky-600 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-900/30 focus:ring-sky-500' },
    success:   { solid: 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:ring-emerald-500', outline: 'border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-900/30 focus:ring-emerald-500' },
    warning:   { solid: 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 focus:ring-amber-500', outline: 'border border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/30 focus:ring-amber-500' },
    error:     { solid: 'bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 focus:ring-rose-500', outline: 'border border-rose-600 text-rose-600 hover:bg-rose-50 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-900/30 focus:ring-rose-500' },
    ghost:     { solid: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-500', outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-500' },
    link:      { solid: 'bg-transparent text-indigo-600 hover:underline dark:text-indigo-400 focus:ring-indigo-500', outline: 'bg-transparent text-indigo-600 hover:underline dark:text-indigo-400 focus:ring-indigo-500' }
  };

  // =========================================================================
  // 2. PUSAT KONTROL UKURAN
  // =========================================================================
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs font-medium rounded',
    sm: 'px-3 py-2 text-sm font-medium rounded-md',
    md: 'px-4 py-2.5 text-sm font-semibold rounded-lg',
    lg: 'px-5 py-3 text-base font-semibold rounded-lg',
    xl: 'px-6 py-3.5 text-lg font-semibold rounded-xl',
  };

  // =========================================================================
  // 3. PUSAT KONTROL POSISI INTERNAL
  // =========================================================================
  const alignments = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  // =========================================================================
  // 4. LOGIKA PENGGABUNGAN CLASS (DITAMBAHKAN INDIKATOR KLIK PREMIUM)
  // =========================================================================
  const variantType = outline ? 'outline' : 'solid';
  
  // PERHATIKAN 2 TAMBAHAN INI:
  // 1. 'cursor-pointer' : Memaksa ikon tangan muncul saat hover (standar wajib)
  // 2. 'active:scale-95': Efek "tekan" (mengecil 5%) saat diklik, memberi sensasi taktil premium
  const baseClasses = 'inline-flex items-center cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95';
  
  const colorClass = colors[variant]?.[variantType] || colors.primary.solid;
  const sizeClass = sizes[size] || sizes.md;
  const alignClass = alignments[align] || alignments.center;
  const blockClass = block ? 'w-full' : '';
  
  // Menggabungkan semua class dan membuang nilai kosong/null
  const finalClassName = [baseClasses, colorClass, sizeClass, alignClass, blockClass, className].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default ${componentName};
`;
};