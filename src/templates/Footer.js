// src/templates/Footer.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Responsif, Semantik, Dark Mode ready, dan Tata Letak Grid yang Rapi.
 */
const ${componentName} = ({
  brand,                 // React Node: Nama brand atau elemen Logo
  description,           // String: Deskripsi singkat perusahaan/produk
  columns = [],          // Array: { title: 'Produk', links: [{ label: 'Fitur', href: '/fitur' }] }
  socials,               // React Node: Ikon media sosial
  copyright,             // String: Teks hak cipta (opsional, ada defaultnya)
  bottomLinks = [],      // Array: { label: 'Privasi', href: '/privacy' } untuk bagian bawah
  className = '',
  ...props
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={\`bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 \${className}\`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            BAGIAN 1: KONTEN UTAMA (Brand & Kolom Link)
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:gap-12">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="lg:col-span-1 space-y-4">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {brand || 'MyBrand'}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {description || 'Membangun solusi digital yang inovatif dan berdampak untuk masa depan.'}
            </p>
            
            {/* Social Media Icons */}
            {socials && (
              <div className="flex gap-4 pt-2">
                {socials}
              </div>
            )}
          </div>

          {/* Kolom 2, 3, 4: Link Navigasi */}
          {columns.map((col, idx) => (
            <nav key={idx} className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* =========================================================================
            BAGIAN 2: BOTTOM BAR (Copyright & Legal Links)
        ========================================================================= */}
        <div className="border-t border-slate-200 dark:border-slate-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
            {copyright || \`© \${currentYear} \${brand || 'MyBrand'}. Hak cipta dilindungi undang-undang.\`}
          </p>

          {/* Bottom Links (Privacy, Terms, dll) */}
          {bottomLinks.length > 0 && (
            <nav className="flex flex-wrap justify-center gap-6">
              {bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

      </div>
    </footer>
  );
};

export default ${componentName};
`;
};