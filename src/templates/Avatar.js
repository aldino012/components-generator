// src/templates/Avatar.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Fallback otomatis, Dark Mode ready, dan Status Indicator yang dinamis.
 */
const ${componentName} = ({
  src,
  alt = 'User avatar',
  fallback = '',       // Teks fallback (inisial) jika gambar gagal/tidak ada
  size = 'md',         // UKURAN: xs, sm, md, lg, xl
  shape = 'circle',    // BENTUK: circle, square
  status,              // STATUS: online, offline, away, busy
  bordered = false,    // STYLE: true (menambahkan ring warna brand di sekeliling)
  className = '',
  ...props
}) => {
  const [imgError, setImgError] = useState(false);

  // =========================================================================
  // 1. PUSAT KONTROL UKURAN (Width, Height, Text Size)
  // =========================================================================
  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
  };

  // =========================================================================
  // 2. PUSAT KONTROL BENTUK & STYLE
  // =========================================================================
  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-xl', // Lebih modern dan lembut daripada rounded-lg
  };

  const baseClasses = 'inline-flex items-center justify-center overflow-hidden transition-all duration-200';
  const shapeClass = shapes[shape] || shapes.circle;
  const sizeClass = sizes[size] || sizes.md;
  const borderClass = bordered ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : '';

  // =========================================================================
  // 3. PUSAT KONTROL FALLBACK & STATUS
  // =========================================================================
  // Ambil maksimal 2 huruf pertama dari setiap kata, lalu uppercase
  const initials = fallback
    ? fallback.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  // Fallback harus nyaman di mata baik di mode terang maupun gelap
  const fallbackClasses = 'w-full h-full font-semibold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200';

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    away: 'bg-amber-500',
    busy: 'bg-rose-500',
  };
  const statusClass = status ? statusColors[status] : '';
  
  // Dot status menyesuaikan ukuran avatar agar proporsional
  const dotSize = (size === 'xl' || size === 'lg') ? 'w-4 h-4' : 'w-3 h-3';

  // =========================================================================
  // 4. LOGIKA PENGGABUNGAN CLASS (Clean & Aman)
  // =========================================================================
  const containerClasses = [status ? 'relative inline-flex' : 'inline-flex', className].filter(Boolean).join(' ');
  const avatarClasses = [baseClasses, sizeClass, shapeClass, borderClass].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      <div className={avatarClasses}>
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={fallbackClasses}>
            {initials}
          </span>
        )}
      </div>

      {/* Status Indicator Dot */}
      {status && (
        <span
          className={\`absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-slate-900 \${statusClass} \${dotSize}\`}
          aria-label={\`Status: \${status}\`}
          title={\`Status: \${status}\`}
        ></span>
      )}
    </div>
  );
};

export default ${componentName};
`;
};