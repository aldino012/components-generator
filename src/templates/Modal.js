// src/templates/Modal.js

module.exports = (componentName) => {
  return `"use client";

import React, { useEffect, useRef } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Aksesibilitas (ARIA), Tombol Escape, Animasi Halus, dan Dark Mode.
 */
const ${componentName} = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',           // UKURAN: sm, md, lg, xl, full
  closeOnBackdrop = true, // Boolean: Tutup saat area gelap di luar modal diklik
  closeOnEscape = true,   // Boolean: Tutup saat tombol 'Escape' ditekan
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);

  // 1. Kunci Scroll Body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 2. Listener untuk tombol 'Escape'
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen && closeOnEscape) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Fokus ke modal saat terbuka (Aksesibilitas)
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // =========================================================================
  // 3. PUSAT KONTROL UKURAN
  // =========================================================================
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] h-[90vh]', // Untuk modal yang hampir memenuhi layar
  };

  // =========================================================================
  // 4. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const backdropClasses = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm transition-all duration-300';
  
  const modalContainerClasses = \`relative w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 transform scale-100 opacity-100 \${sizes[size] || sizes.md} \${className}\`;

  return (
    <div 
      className={backdropClasses} 
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className={modalContainerClasses}
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
        tabIndex="-1"
        {...props}
      >
        {/* Header: Judul & Tombol Close */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          {title && (
            <h3 id="modal-title" className="text-xl font-semibold text-slate-900 dark:text-white pr-8">
              {title}
            </h3>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body: Konten Utama */}
        <div className="p-6 text-slate-600 dark:text-slate-300 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Footer: Aksi (Opsional) */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default ${componentName};
`;
};