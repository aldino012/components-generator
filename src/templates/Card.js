// src/templates/Card.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Fleksibel, mendukung Dark Mode, dan tipografi yang nyaman di mata.
 */
const ${componentName} = ({
  children,
  title,
  subtitle,
  image,
  imagePosition = 'top',      // 'top' | 'background'
  variant = 'default',        // 'default' | 'elevated' | 'ghost'
  headerActions,              // React Node: Tombol/menu di pojok kanan atas (opsional)
  footer,                     // React Node: Konten di bagian bawah card (opsional)
  className = '',
  ...props
}) => {

  // =========================================================================
  // 1. PUSAT KONTROL VARIANT (Tampilan Dasar Card)
  // =========================================================================
  const variants = {
    // Standar: Border halus, cocok untuk daftar item atau form
    default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
    // Mengambang: Ada shadow, naik sedikit saat di-hover. Cocok untuk kartu produk/artikel
    elevated: 'bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-700',
    // Hantu: Background transparan dengan border putus-putus. Cocok untuk "Tambah Item Baru"
    ghost: 'bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800'
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300 flex flex-col';
  const variantClass = variants[variant] || variants.default;
  const finalClassName = [baseClasses, variantClass, className].filter(Boolean).join(' ');

  // Helper untuk menyesuaikan warna teks berdasarkan posisi gambar
  const isBgImage = imagePosition === 'background';
  const titleColor = isBgImage ? 'text-white' : 'text-slate-900 dark:text-white';
  const subColor = isBgImage ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400';
  const borderColor = isBgImage ? 'border-white/20' : 'border-slate-100 dark:border-slate-700';

  return (
    <div className={finalClassName} {...props}>
      
      {/* A. GAMBAR DI ATAS (TOP) */}
      {image && imagePosition === 'top' && (
        <div className="w-full h-48 overflow-hidden">
          <img src={image} alt={title || 'Card image'} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
      )}

      {/* B. GAMBAR SEBAGAI BACKGROUND */}
      {image && imagePosition === 'background' && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt={title || 'Card background'} className="w-full h-full object-cover" />
          {/* Gradient Overlay Profesional: Agar teks di atas gambar selalu terbaca dengan jelas */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
      )}

      {/* C. KONTEN UTAMA (BODY) */}
      <div className={\`p-6 flex flex-col flex-1 relative z-10 \${isBgImage ? 'pt-4' : ''}\`}>
        
        {/* Header: Judul, Subjudul, dan Actions */}
        {(title || subtitle || headerActions) && (
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1 min-w-0">
              {title && <h3 className={\`text-lg font-semibold leading-tight \${titleColor}\`}>{title}</h3>}
              {subtitle && <p className={\`text-sm mt-1 \${subColor}\`}>{subtitle}</p>}
            </div>
            {headerActions && (
              <div className="flex-shrink-0">
                {headerActions}
              </div>
            )}
          </div>
        )}

        {/* Isi Card (Children) */}
        {children && (
          <div className={\`flex-1 \${subColor}\`}>
            {children}
          </div>
        )}

        {/* Footer: Biasanya untuk tombol aksi atau metadata */}
        {footer && (
          <div className={\`mt-6 pt-4 border-t \${borderColor} flex justify-end gap-2\`}>
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