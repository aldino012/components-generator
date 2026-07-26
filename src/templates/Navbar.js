// src/templates/Navbar.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Responsif, Dark Mode ready, dan efek Glassmorphism opsional.
 */
const ${componentName} = ({
  logo,                   // React Node: Bisa berupa <img> atau teks <span>Brand</span>
  links = [],             // Array: [{ label: 'Beranda', href: '/' }]
  actions,                // React Node: Tombol Login, Register, atau Avatar User di kanan
  variant = 'glass',      // Tampilan: 'solid' (polos), 'glass' (blur transparan), 'transparent'
  sticky = true,          // Boolean: Tetap di atas saat di-scroll
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // =========================================================================
  // 1. PUSAT KONTROL TAMPILAN NAVBAR
  // =========================================================================
  const variants = {
    solid: 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800',
    glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50',
    transparent: 'bg-transparent border-b border-white/10'
  };

  const baseClasses = \`w-full z-50 transition-all duration-300 \${sticky ? 'sticky top-0' : 'relative'} \${variants[variant] || variants.glass} \${className}\`;

  return (
    <nav className={baseClasses} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* A. KIRI: Hamburger (Mobile) & Logo */}
          <div className="flex items-center gap-4">
            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
              {logo || <span>MyBrand</span>}
            </a>
          </div>

          {/* B. TENGAH: Desktop Links (Tersembunyi di Mobile) */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* C. KANAN: Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {actions || (
              // Fallback default jika prop 'actions' tidak diisi
              <>
                <a href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Masuk</a>
                <a href="/register" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  Daftar
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* D. MOBILE MENU DROPDOWN (Muncul saat isMobileMenuOpen = true) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Links */}
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat link diklik
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Actions (Opsional: Tampilkan juga di mobile jika perlu) */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              {actions ? (
                <div className="flex flex-col gap-3">{actions}</div>
              ) : (
                <>
                  <a href="/login" className="text-center w-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                    Masuk
                  </a>
                  <a href="/register" className="text-center w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    Daftar Sekarang
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ${componentName};
`;
};