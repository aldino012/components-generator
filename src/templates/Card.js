// src/templates/Card.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  children,
  title,
  subtitle,
  image,
  imagePosition = 'top',   // 'top' atau 'background'
  actions,                 // Elemen di pojok kanan atas
  footer,                  // Elemen di bagian bawah card
  hoverable = false,       // Efek shadow saat di-hover
  className = '',
  ...props
}) => {
  // Base card classes
  let cardClasses = 'bg-white rounded-lg shadow-md transition-all duration-300';
  
  if (hoverable) cardClasses += ' hover:shadow-2xl hover:-translate-y-1 cursor-pointer';
  if (imagePosition === 'background') cardClasses += ' relative overflow-hidden';
  if (className) cardClasses += \` \${className}\`;

  // Body classes – jika background image, tambahkan relative z-10 dan teks putih
  const bodyClasses = \`p-6 flex-1\${imagePosition === 'background' ? ' relative z-10 text-white' : ''}\`;

  return (
    <div className={cardClasses} {...props}>
      {/* Gambar di atas (top) */}
      {image && imagePosition === 'top' && (
        <figure className="px-4 pt-4">
          <img src={image} alt={title || 'Card image'} className="rounded-xl w-full object-cover h-48" />
        </figure>
      )}

      {/* Gambar sebagai background (image-full) */}
      {image && imagePosition === 'background' && (
        <>
          <figure className="absolute inset-0">
            <img src={image} alt={title || 'Card image'} className="w-full h-full object-cover" />
          </figure>
          {/* Overlay semi-transparan agar teks terbaca */}
          <div className="absolute inset-0 bg-black/40"></div>
        </>
      )}

      {/* Card Body */}
      <div className={bodyClasses}>
        {/* Actions di pojok kanan atas */}
        {actions && (
          <div className="flex justify-end">
            {actions}
          </div>
        )}

        {/* Judul & Subjudul */}
        {title && <h2 className="font-bold text-lg">{title}</h2>}
        {subtitle && <p className="text-sm opacity-70 mt-0">{subtitle}</p>}

        {/* Konten utama */}
        <div className="flex-1">{children}</div>

        {/* Footer (seperti card-footer Bootstrap) */}
        {footer && (
          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
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