// src/templates/Spinner.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Aksesibel (ARIA), Dark Mode ready, dan mendukung berbagai varian animasi.
 */
const ${componentName} = ({
  size = 'md',           // UKURAN: 'sm', 'md', 'lg', 'xl'
  color = 'indigo',      // WARNA: 'indigo', 'slate', 'white', 'rose', 'emerald'
  variant = 'circle',    // TIPE: 'circle', 'dots', 'bars'
  text,                  // TEKS: Opsional, teks pendamping (misal: "Memuat...")
  textPosition = 'right', // POSISI TEKS: 'right', 'left', 'top', 'bottom'
  className = '',
  ...props
}) => {
  // =========================================================================
  // 1. PUSAT KONTROL UKURAN
  // =========================================================================
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  const currentSize = sizes[size] || sizes.md;

  // =========================================================================
  // 2. PUSAT KONTROL WARNA (Mendukung Border, Background, dan Text)
  // =========================================================================
  const colors = {
    indigo:  { border: 'border-indigo-600 border-t-transparent dark:border-indigo-500 dark:border-t-transparent', bg: 'bg-indigo-600 dark:bg-indigo-500' },
    slate:   { border: 'border-slate-600 border-t-transparent dark:border-slate-400 dark:border-t-transparent', bg: 'bg-slate-600 dark:bg-slate-400' },
    white:   { border: 'border-white border-t-transparent', bg: 'bg-white' },
    rose:    { border: 'border-rose-600 border-t-transparent dark:border-rose-500 dark:border-t-transparent', bg: 'bg-rose-600 dark:bg-rose-500' },
    emerald: { border: 'border-emerald-600 border-t-transparent dark:border-emerald-500 dark:border-t-transparent', bg: 'bg-emerald-600 dark:bg-emerald-500' },
  };
  const currentColor = colors[color] || colors.indigo;

  // =========================================================================
  // 3. POSISI TEKS
  // =========================================================================
  const textPositions = {
    right: 'flex-row',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };
  const textGap = variant === 'circle' ? 'gap-3' : 'gap-2';

  // =========================================================================
  // 4. RENDER VARIAN SPINNER
  // =========================================================================
  
  // A. Circle (Default, paling umum)
  const renderCircle = () => (
    <div
      className={\`animate-spin rounded-full border-4 \${currentSize} \${currentColor.border} \${className}\`}
      role="status"
      aria-label="Sedang memuat"
      {...props}
    >
      <span className="sr-only">Sedang memuat...</span>
    </div>
  );

  // B. Dots (Animasi memantul)
  const renderDots = () => (
    <div className={\`flex items-center gap-1.5 \${className}\`} role="status" aria-label="Sedang memuat" {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={\`\${currentSize.split(' ')[0]} \${currentSize.split(' ')[1]} rounded-full animate-bounce \${currentColor.bg}\`}
          style={{ animationDelay: \`\${i * 150}ms\` }}
        />
      ))}
      <span className="sr-only">Sedang memuat...</span>
    </div>
  );

  // C. Bars (Animasi gelombang)
  const renderBars = () => (
    <div className={\`flex items-end gap-1.5 \${className}\`} role="status" aria-label="Sedang memuat" {...props}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={\`w-1.5 rounded-full animate-pulse \${currentColor.bg}\`}
          style={{ 
            height: size === 'sm' ? '12px' : size === 'md' ? '24px' : size === 'lg' ? '36px' : '48px',
            animationDelay: \`\${i * 150}ms\` }}
        />
      ))}
      <span className="sr-only">Sedang memuat...</span>
    </div>
  );

  // Pilih komponen berdasarkan varian
  const SpinnerComponent = variant === 'dots' ? renderDots : variant === 'bars' ? renderBars : renderCircle;

  // =========================================================================
  // 5. LOGIKA PENGGABUNGAN DENGAN TEKS
  // =========================================================================
  if (text) {
    return (
      <div className={\`flex items-center justify-center \${textPositions[textPosition]} \${textGap}\`}>
        <SpinnerComponent />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
          {text}
        </span>
      </div>
    );
  }

  return <SpinnerComponent />;
};

export default ${componentName};
`;
};