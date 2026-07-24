// src/templates/Footer.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  brand,                 // Brand name or logo element
  description,           // Short description text
  columns = [],          // Array of { title: 'Services', links: [{label, href}] }
  socials,               // Social media icons element
  copyright,             // Copyright text
  className = '',
  ...props
}) => {
  return (
    <>
      {/* Main Footer Content */}
      <footer className={\`bg-gray-100 text-gray-700 p-10 \${className}\`} {...props}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-10 justify-between">
          {/* Brand & Description */}
          <aside className="flex-shrink-0 max-w-xs">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{brand || 'Brand'}</h2>
            <p className="text-sm text-gray-600">{description || 'Providing awesome services since 2024.'}</p>
            {socials && <div className="mt-4 flex gap-4">{socials}</div>}
          </aside>

          {/* Link Columns */}
          {columns.map((col, idx) => (
            <nav key={idx} className="flex flex-col gap-2">
              <h6 className="font-semibold text-gray-800 uppercase tracking-wider text-sm mb-1">{col.title}</h6>
              {col.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </footer>

      {/* Bottom Bar / Copyright */}
      <footer className="bg-gray-100 text-gray-600 border-t border-gray-300 px-10 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <aside>
            <p className="text-sm">{copyright || \`© \${new Date().getFullYear()} - All right reserved\`}</p>
          </aside>
          <nav className="flex gap-4">
            <a href="/privacy" className="text-sm hover:text-blue-600 hover:underline transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:text-blue-600 hover:underline transition-colors">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default ${componentName};
`;
};