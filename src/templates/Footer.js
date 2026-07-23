// src/templates/Footer.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
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
      <footer className={\`footer p-10 bg-base-200 text-base-content \${className}\`} {...props}>
        {/* Brand & Description (Bootstrap aside concept) */}
        <aside>
          <h2 className="text-2xl font-bold mb-2">{brand || 'Brand'}</h2>
          <p className="max-w-xs">{description || 'Providing awesome services since 2024.'}</p>
          {socials && <div className="mt-4 flex gap-4">{socials}</div>}
        </aside>

        {/* Link Columns (Bootstrap grid columns concept) */}
        {columns.map((col, idx) => (
          <nav key={idx}>
            <h6 className="footer-title">{col.title}</h6>
            {col.links.map((link, linkIdx) => (
              <a key={linkIdx} href={link.href} className="link link-hover">
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </footer>

      {/* Bottom Bar / Copyright */}
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          <p>{copyright || \`© \${new Date().getFullYear()} - All right reserved\`}</p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            {/* Optional bottom links */}
            <a href="/privacy" className="link link-hover text-sm">Privacy Policy</a>
            <a href="/terms" className="link link-hover text-sm">Terms of Service</a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default ${componentName};
`;
};