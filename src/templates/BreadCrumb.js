// src/templates/Breadcrumb.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Semantik HTML, Aksesibilitas (ARIA) penuh, dan Separator yang fleksibel.
 */
const ${componentName} = ({
  items = [],            // Array: { label: 'Home', href: '/' }
  separator = 'chevron', // 'chevron' | 'slash' | ReactNode (Ikon kustom)
  className = '',
  ...props
}) => {
  if (!items || items.length === 0) return null;

  // =========================================================================
  // 1. RENDER SEPARATOR
  // =========================================================================
  const renderSeparator = (index) => {
    if (index === 0) return null; // Tidak ada separator di item pertama

    if (separator === 'slash') {
      return <span className="mx-2 text-slate-300 dark:text-slate-600 select-none" aria-hidden="true">/</span>;
    }
    
    if (separator === 'chevron' || !separator) {
      return (
        <svg className="mx-2 h-4 w-4 text-slate-300 dark:text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      );
    }

    // Jika separator adalah React Node kustom
    return <span className="mx-2 text-slate-300 dark:text-slate-600 flex-shrink-0" aria-hidden="true">{separator}</span>;
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const navClasses = \`flex items-center text-sm font-medium \${className}\`;
  const linkClasses = "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200 focus:outline-none focus:underline";
  const activeClasses = "text-slate-900 dark:text-white font-semibold";

  return (
    <nav aria-label="Breadcrumb" className={navClasses} {...props}>
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {renderSeparator(index)}
              
              {isLast ? (
                // Item Terakhir (Halaman Aktif)
                <span 
                  className={activeClasses} 
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                // Item Biasa (Link)
                <a 
                  href={item.href} 
                  className={linkClasses}
                >
                  {item.icon && <span className="mr-1.5 inline-flex">{item.icon}</span>}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ${componentName};
`;
};