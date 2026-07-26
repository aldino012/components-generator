// src/templates/Hero.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Split layout responsif, hierarki tipografi yang kuat, dan dukungan Dark Mode.
 */
const ${componentName} = ({
  eyebrow,               // String/Node: Teks kecil di atas judul (misal: "🚀 Versi 2.0 Telah Rilis")
  title,                 // String/Node: Judul utama (H1)
  description,           // String/Node: Paragraf deskripsi
  primaryAction,         // React Node: Biasanya <Button variant="primary">
  secondaryAction,       // React Node: Biasanya <Button variant="ghost">
  image,                 // React Node/String: URL gambar, atau komponen SVG/Ilustrasi kustom
  trustBadges,           // React Node: Bagian "Dipercaya oleh..." (opsional)
  align = 'left',        // 'left' (split layout) | 'center' (layout terpusat)
  className = '',
  ...props
}) => {
  // =========================================================================
  // 1. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const containerClasses = \`relative overflow-hidden bg-white dark:bg-slate-950 py-16 sm:py-24 lg:py-32 \${className}\`;
  
  const contentAlignment = align === 'center' 
    ? 'text-center items-center max-w-3xl mx-auto' 
    : 'lg:text-left';

  const gridClasses = align === 'center'
    ? 'flex flex-col items-center'
    : 'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center';

  // =========================================================================
  // 2. RENDER KOMPONEN
  // =========================================================================
  return (
    <section className={containerClasses} {...props}>
      {/* Background Decorative Glow (Opsional, menambah kesan premium) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={gridClasses}>
          
          {/* Kolom Kiri / Atas: Konten Teks */}
          <div className={\`flex flex-col \${contentAlignment}\`}>
            
            {/* Eyebrow Text */}
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 w-fit mx-auto lg:mx-0">
                {eyebrow}
              </div>
            )}

            {/* Title (H1) */}
            {title && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {description}
              </p>
            )}

            {/* Actions (Buttons) */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4 mb-10 w-full lg:w-auto justify-center lg:justify-start">
                {primaryAction}
                {secondaryAction}
              </div>
            )}

            {/* Trust Badges */}
            {trustBadges && (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 w-full">
                {trustBadges}
              </div>
            )}
          </div>

          {/* Kolom Kanan / Bawah: Visual / Gambar */}
          {image && (
            <div className="relative w-full flex justify-center lg:justify-end">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900">
                {typeof image === 'string' ? (
                  <img 
                    src={image} 
                    alt="Hero Illustration" 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  image
                )}
                
                {/* Decorative border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ${componentName};
`;
};