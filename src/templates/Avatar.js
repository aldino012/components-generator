// src/templates/Avatar.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  src,
  alt = 'User avatar',
  fallback = '',       // Fallback text (initials) jika gambar gagal/tidak ada
  size = 'md',         // xs, sm, md, lg, xl
  shape = 'circle',    // circle, square
  status,              // online, offline, away (status indicator dot)
  border = true,       // Menambahkan ring di sekeliling avatar
  className = '',
  ...props
}) => {
  const [imgError, setImgError] = useState(false);

  // 1. Size Mapping (Tailwind width/height)
  const sizeMap = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  // 2. Shape Mapping
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  // 3. Border/Ring (warna biru sebagai pengganti DaisyUI "primary")
  const borderClass = border ? 'ring-2 ring-blue-500 ring-offset-2' : '';

  // 4. Status indicator colors
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  // Gabungan kelas untuk div gambar/fallback
  const innerClasses = \`\${sizeMap[size] || sizeMap.md} \${shapeClass} \${borderClass} overflow-hidden\`.trim();

  // Fallback initials logic (maksimal 2 huruf pertama)
  const initials = fallback
    ? fallback.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className={\`\${status ? 'relative inline-flex' : 'inline-flex'} \${className}\`} {...props}>
      <div className={innerClasses}>
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-semibold bg-gray-200 text-gray-600 flex items-center justify-center w-full h-full">
            {initials}
          </span>
        )}
      </div>
      {/* Status indicator dot */}
      {status && (
        <span className={\`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white \${statusColors[status] || statusColors.offline}\`}></span>
      )}
    </div>
  );
};

export default ${componentName};
`;
};