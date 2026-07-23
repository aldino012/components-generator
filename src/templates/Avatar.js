// src/templates/Avatar.js

module.exports = (componentName) => {
  return `"use client";

   import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS dan DaisyUI.
 */
const ${componentName} = ({
  src,
  alt = 'User avatar',
  fallback = '',       // Fallback text (initials) jika gambar gagal/g tidak ada
  size = 'md',         // xs, sm, md, lg, xl
  shape = 'circle',    // circle, square
  status,              // online, offline, away (DaisyUI indicator)
  border = true,       // Menambahkan ring/border di sekeliling avatar
  className = '',
  ...props
}) => {
  const [imgError, setImgError] = useState(false);

  // 1. Size Mapping (Tailwind/DaisyUI sizing)
  const sizeMap = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  // 2. Shape Mapping (Bootstrap rounded-circle / rounded concept)
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  // 3. Border/Ring (DaisyUI style ring)
  const borderClass = border ? 'ring ring-primary ring-offset-base-1 ring-offset-2' : '';

  // 4. Status Indicator (DaisyUI native status)
  const statusClass = status ? status : '';

  // Combine wrapper classes
  const wrapperClasses = \`avatar \${statusClass} \${className}\`.trim();
  const innerClasses = \`\${sizeMap[size] || sizeMap.md} \${shapeClass} \${borderClass}\`.trim();

  // Fallback initials logic (ambil maksimal 2 huruf pertama dari setiap kata)
  const initials = fallback
    ? fallback.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className={wrapperClasses} {...props}>
      <div className={innerClasses}>
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-semibold bg-base-300 text-base-content flex items-center justify-center w-full h-full">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
};

export default ${componentName};
`;
};