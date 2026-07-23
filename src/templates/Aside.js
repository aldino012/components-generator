// src/templates/Aside.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 */
const ${componentName} = ({
  logo,                  // Logo element
  menuItems = [],        // Array of { icon, label, href, children: [{label, href}] }
  activePath = '',       // Current active URL path for highlighting
  header,                // Custom header element (e.g., user profile summary)
  footer,                // Custom footer element inside sidebar
  className = '',
  ...props
}) => {
  // Helper to check if a link is active
  const isActive = (href) => activePath === href ? 'active bg-primary text-primary-content' : '';

  return (
    <aside className={\`w-64 bg-base-100 h-screen flex flex-col border-r border-base-200 \${className}\`} {...props}>
      {/* Sidebar Header / Logo */}
      <div className="p-4 border-b border-base-200">
        <a href="/" className="flex items-center gap-2 text-xl font-bold">
          {logo || 'Sidebar'}
        </a>
      </div>

      {/* Custom Header (e.g. User Profile) */}
      {header && <div className="p-4 border-b border-base-200">{header}</div>}

      {/* Menu Items (DaisyUI menu + Bootstrap collapsible concept) */}
      <ul className="menu p-4 flex-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          // If item has children, render as collapsible dropdown
          if (item.children && item.children.length > 0) {
            return (
              <li key={idx}>
                <details open={item.children.some(child => activePath === child.href)}>
                  <summary className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </summary>
                  <ul>
                    {item.children.map((child, cIdx) => (
                      <li key={cIdx}>
                        <a href={child.href} className={isActive(child.href)}>
                          {child.icon} {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          }
          
          // Else, render as standard link
          return (
            <li key={idx}>
              <a href={item.href} className={\`flex items-center gap-3 \${isActive(item.href)}\`}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Sidebar Footer */}
      {footer && <div className="p-4 border-t border-base-200">{footer}</div>}
    </aside>
  );
};

export default ${componentName};
`;
};