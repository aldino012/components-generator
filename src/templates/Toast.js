// src/templates/Toast.js

module.exports = (componentName) => {
  return `"use client";

import React, { useEffect, useState, useRef } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Pause-on-hover, Animasi halus, Dark Mode, dan Aksesibilitas (ARIA).
 */
const ${componentName} = ({
  isOpen,
  onClose,
  variant = 'info',       // 'info', 'success', 'warning', 'error'
  position = 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  title,
  children,
  duration = 5000,        // ms. Set 0 untuk nonaktifkan auto-hide.
  className = '',
  ...props
}) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef(null);

  // =========================================================================
  // 1. LOGIKA ANIMASI KELUAR (Exit Animation)
  // =========================================================================
  const handleClose = () => {
    setIsLeaving(true);
    // Tunggu animasi selesai sebelum benar-benar memanggil onClose dari parent
    setTimeout(() => {
      onClose();
    }, 300); // Harus sesuai dengan duration-300 di class transition
  };

  // =========================================================================
  // 2. LOGIKA AUTO-HIDE DENGAN PAUSE ON HOVER
  // =========================================================================
  const startTimer = () => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsLeaving(false);
      startTimer();
    }
    return () => clearTimer();
  }, [isOpen, duration]);

  if (!isOpen && !isLeaving) return null;

  // =========================================================================
  // 3. PUSAT KONTROL POSISI & WARNA
  // =========================================================================
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const accentColors = {
    info: 'border-indigo-500 text-indigo-600 dark:text-indigo-400',
    success: 'border-emerald-500 text-emerald-600 dark:text-emerald-400',
    warning: 'border-amber-500 text-amber-600 dark:text-amber-400',
    error: 'border-rose-500 text-rose-600 dark:text-rose-400',
  };

  const icons = {
    info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    success: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    warning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    error: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };

  // A11y: Error/Warning menggunakan 'alert' dan 'assertive', lainnya 'status' dan 'polite'
  const isUrgent = variant === 'error' || variant === 'warning';
  const role = isUrgent ? 'alert' : 'status';
  const ariaLive = isUrgent ? 'assertive' : 'polite';

  // =========================================================================
  // 4. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const containerClasses = \`fixed z-[100] \${positionClasses[position]} \${className}\`;
  
  const toastClasses = \`
    flex items-start gap-3 p-4 min-w-[320px] max-w-md rounded-lg shadow-xl border-l-4 
    bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800
    transition-all duration-300 ease-in-out
    \${isLeaving ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}
  \`;

  return (
    <div 
      className={containerClasses} 
      role={role} 
      aria-live={ariaLive}
      onMouseEnter={clearTimer}   // Pause timer saat hover
      onMouseLeave={startTimer}   // Lanjutkan timer saat mouse keluar
      {...props}
    >
      <div className={toastClasses}>
        {/* Ikon Varian */}
        <div className={\`flex-shrink-0 mt-0.5 \${accentColors[variant]}\`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[variant]}
          </svg>
        </div>

        {/* Konten: Title & Message */}
        <div className="flex-1 min-w-0">
          {title && <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">{title}</h3>}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-words">
            {children}
          </p>
        </div>

        {/* Tombol Close */}
        <button
          type="button"
          onClick={handleClose}
          className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Tutup notifikasi"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ${componentName};
`;
};