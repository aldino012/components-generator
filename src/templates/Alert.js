// src/templates/Alert.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Modern palette, Dark Mode ready, dukungan Title, dan animasi halus.
 */
const ${componentName} = ({
  children,
  title,                 // Opsional: Judul alert (akan ditampilkan tebal)
  variant = 'info',      // WARNA: info, success, warning, error
  dismissible = false,   // FITUR: true (menampilkan tombol close)
  onClose,               // FUNGSI: Dipanggil saat alert ditutup
  icon,                  // Opsional: Ikon kustom (React Node). Jika kosong, pakai default.
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true); // Trigger animasi keluar
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Sesuai dengan duration-300 Tailwind
  };

  // =========================================================================
  // 1. PUSAT KONTROL WARNA (Modern Palette & Dark Mode)
  // Format: bg-X border-Y text-Z dark:bg-A dark:border-B dark:text-C
  // =========================================================================
  const variants = {
    info:    'bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300',
    warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300',
    error:   'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-300',
  };

  // =========================================================================
  // 2. IKON DEFAULT (Menggunakan currentColor agar otomatis mengikuti warna varian)
  // =========================================================================
  const defaultIcons = {
    info: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  // =========================================================================
  // 3. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const baseClasses = 'flex items-start gap-3 p-4 rounded-lg border shadow-sm transition-all duration-300';
  const variantClass = variants[variant] || variants.info;
  
  // Jika sedang closing, tambahkan opacity-0 dan scale-95 untuk efek fade-out
  const stateClass = isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100';
  
  const finalClassName = [baseClasses, variantClass, stateClass, className].filter(Boolean).join(' ');

  return (
    <div role="alert" className={finalClassName} {...props}>
      {/* Ikon */}
      <div className="shrink-0 mt-0.5">
        {icon || defaultIcons[variant]}
      </div>

      {/* Konten: Title (opsional) + Children */}
      <div className="flex-1">
        {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
        <div className={\`text-sm \${title ? 'opacity-90' : 'font-medium'}\`}>
          {children}
        </div>
      </div>
      
      {/* Tombol Close */}
      {dismissible && (
        <button 
          type="button"
          onClick={handleClose} 
          className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current opacity-70 hover:opacity-100"
          aria-label="Tutup alert"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ${componentName};
`;
};