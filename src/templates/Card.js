// src/templates/Card.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS dan DaisyUI.
 */
const ${componentName} = ({
  children,
  title,
  subtitle,
  image,
  imagePosition = 'top',   // 'top' (Bootstrap style) or 'background' (DaisyUI image-full)
  actions,                 // Element di pojok kanan atas (seperti tombol menu)
  footer,                  // Elemen di bagian bawah card (Bootstrap card-footer)
  hoverable = false,       // Efek shadow saat di-hover
  className = '',
  ...props
}) => {
  // Base card classes (DaisyUI)
  let cardClasses = 'card bg-base-100 shadow-md transition-all duration-300';
  
  if (hoverable) cardClasses += ' hover:shadow-2xl hover:-translate-y-1 cursor-pointer';
  if (imagePosition === 'background') cardClasses += ' image-full';
  if (className) cardClasses += \` \${className}\`;

  return (
    <div className={cardClasses} {...props}>
      {/* Image Top (Bootstrap concept) */}
      {image && imagePosition === 'top' && (
        <figure className="px-4 pt-4">
          <img src={image} alt={title || 'Card image'} className="rounded-xl w-full object-cover h-48" />
        </figure>
      )}
      
      {/* Image Background (DaisyUI concept) */}
      {image && imagePosition === 'background' && (
        <figure>
          <img src={image} alt={title || 'Card image'} className="w-full object-cover" />
        </figure>
      )}

      {/* Card Body */}
      <div className="card-body">
        {/* Actions (Top Right) */}
        {actions && (
          <div className="card-actions justify-end">
            {actions}
          </div>
        )}

        {/* Title & Subtitle (Bootstrap card-header concept) */}
        {title && <h2 className="card-title">{title}</h2>}
        {subtitle && <p className="text-sm opacity-70 mt-0">{subtitle}</p>}

        {/* Main Content (Bootstrap card-body concept) */}
        <div className="flex-1">{children}</div>

        {/* Footer (Bootstrap card-footer concept) */}
        {footer && (
          <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
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