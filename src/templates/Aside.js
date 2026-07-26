// src/templates/Aside.js

module.exports = (componentName) => {
  return `import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Stateful dropdown, Route matching cerdas, Dark Mode, dan Aksesibilitas penuh.
 */
const ${componentName} = ({
  logo,                  // React Node: Logo atau nama brand
  menuItems = [],        // Array: { icon, label, href, children?: [{label, href}] }
  activePath = '',       // String: URL path saat ini (misal: window.location.pathname)
  header,                // React Node: Konten atas (misal: profil user)
  footer,                // React Node: Konten bawah (misal: tombol logout)
  className = '',
  ...props
}) => {
  // State untuk mengontrol dropdown menu
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Helper: Cek apakah link aktif (mendukung exact match atau prefix untuk nested routes)
  const isActive = (href) => {
    if (!activePath) return false;
    return activePath === href || (href !== '/' && activePath.startsWith(href + '/'));
  };

  // =========================================================================
  // PUSAT KONTROL CLASS
  // =========================================================================
  const asideClasses = \`w-64 bg-white dark:bg-slate-900 h-full flex flex-col border-r border-slate-200 dark:border-slate-800 transition-all duration-300 \${className}\`;
  
  const linkBase = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200";
  const linkInactive = "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100";
  const linkActive = "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300";
  
  const dropdownBtnBase = \`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 \`;
  const dropdownBtnInactive = "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100";
  const dropdownBtnActive = "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100";

  return (
    <aside className={asideClasses} {...props}>
      {/* 1. Header / Logo Area */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800">
        <a href="/" className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          {logo || 'MyBrand'}
        </a>
      </div>

      {/* 2. Custom Header (Opsional) */}
      {header && <div className="p-4 border-b border-slate-200 dark:border-slate-800">{header}</div>}

      {/* 3. Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        {menuItems.map((item, idx) => {
          const hasChildren = item.children && item.children.length > 0;
          const isItemActive = item.href ? isActive(item.href) : false;
          const isOpen = openMenus[item.label];

          if (hasChildren) {
            // Cek apakah ada child yang aktif untuk membuka dropdown secara otomatis
            const hasActiveChild = item.children.some(child => isActive(child.href));
            
            return (
              <div key={idx} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleMenu(item.label)}
                  className={\`\${dropdownBtnBase} \${isItemActive || hasActiveChild ? dropdownBtnActive : dropdownBtnInactive}\`}
                  aria-expanded={isOpen || hasActiveChild}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {/* Chevron Icon */}
                  <svg 
                    className={\`w-4 h-4 transition-transform duration-200 \${(isOpen || hasActiveChild) ? 'rotate-180' : ''}\`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Child Links */}
                {(isOpen || hasActiveChild) && (
                  <ul className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700 space-y-1 mt-1">
                    {item.children.map((child, cIdx) => {
                      const isChildActive = isActive(child.href);
                      return (
                        <li key={cIdx}>
                          <a
                            href={child.href}
                            className={\`\${linkBase} \${isChildActive ? linkActive : linkInactive}\`}
                            aria-current={isChildActive ? 'page' : undefined}
                          >
                            {child.icon && <span className="w-4 h-4 flex items-center justify-center">{child.icon}</span>}
                            <span>{child.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          }

          // Standard Link
          return (
            <a
              key={idx}
              href={item.href}
              className={\`\${linkBase} \${isItemActive ? linkActive : linkInactive}\`}
              aria-current={isItemActive ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* 4. Custom Footer (Opsional) */}
      {footer && <div className="p-4 border-t border-slate-200 dark:border-slate-800">{footer}</div>}
    </aside>
  );
};

export default ${componentName};
`;
};