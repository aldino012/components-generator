// src/templates/Skeleton.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Unified API, Dark Mode ready, dan Aksesibilitas (aria-busy).
 */
const ${componentName} = ({
  variant = 'rectangular', // 'rectangular', 'circular', 'text', 'card'
  width = 'w-full',
  height = 'h-4',
  lines = 1,               // Jumlah baris (khusus untuk variant="text")
  size = 'md',             // Ukuran (khusus untuk variant="circular": 'sm', 'md', 'lg', 'xl')
  className = '',
  ...props
}) => {
  // =========================================================================
  // 1. PUSAT KONTROL WARNA & ANIMASI
  // =========================================================================
  // Menggunakan slate agar konsisten dengan desain sistem, dan mendukung dark mode
  const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-700';

  // =========================================================================
  // 2. LOGIKA RENDER BERDASARKAN VARIANT
  // =========================================================================
  
  // A. Variant: Card (Layout komposit siap pakai)
  if (variant === 'card') {
    return (
      <div className={\`space-y-3 \${className}\`} aria-busy="true" aria-label="Memuat kartu" {...props}>
        <div className={\`\${baseClasses} h-48 w-full rounded-xl\`} />
        <div className="space-y-2 px-1">
          <div className={\`\${baseClasses} h-5 w-3/4 rounded-md\`} />
          <div className={\`\${baseClasses} h-4 w-1/2 rounded-md\`} />
        </div>
      </div>
    );
  }

  // B. Variant: Text (Multi-line dengan panjang bervariasi agar terlihat natural)
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2.5" aria-busy="true" aria-label="Memuat teks" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={\`\${baseClasses} h-4 rounded-md \${i === lines - 1 ? 'w-3/4' : 'w-full'} \${className}\`}
          />
        ))}
      </div>
    );
  }

  // C. Variant: Circular (Untuk Avatar atau Icon)
  if (variant === 'circular') {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    };
    return (
      <div
        className={\`\${baseClasses} rounded-full \${sizeClasses[size] || sizeClasses.md} \${className}\`}
        aria-busy="true"
        aria-label="Memuat avatar"
        {...props}
      />
    );
  }

  // D. Variant: Rectangular (Default, untuk gambar, thumbnail, atau blok umum)
  return (
    <div
      className={\`\${baseClasses} rounded-md \${width} \${height} \${className}\`}
      aria-busy="true"
      aria-label="Memuat konten"
      {...props}
    />
  );
};

export default ${componentName};
`;
};