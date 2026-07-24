// src/templates/Aside.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
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
  const isActive = (href) => activePath === href
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'text-gray-700 hover:bg-gray-100';

  // Base style for links and summary buttons
  const linkBase = 'flex items-center gap-3 px-3 py-2 rounded-md transition-colors';

  return (
    <aside className={\`w-64 bg-white h-screen flex flex-col border-r border-gray-200 \${className}\`} {...props}>
      {/* Sidebar Header / Logo */}
      <div className="p-4 border-b border-gray-200">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          {logo || 'Sidebar'}
        </a>
      </div>

      {/* Custom Header (e.g. User Profile) */}
      {header && <div className="p-4 border-b border-gray-200">{header}</div>}

      {/* Menu Items (Pure Tailwind CSS) */}
      <ul className="flex-1 overflow-y-auto p-4 space-y-1 list-none">
        {menuItems.map((item, idx) => {
          // If item has children, render as collapsible dropdown
          if (item.children && item.children.length > 0) {
            return (
              <li key={idx}>
                <details open={item.children.some(child => activePath === child.href)}>
                  <summary className={\`\${linkBase} cursor-pointer list-none\`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </summary>
                  <ul className="mt-1 ml-4 space-y-1 list-none">
                    {item.children.map((child, cIdx) => (
                      <li key={cIdx}>
                        <a href={child.href} className={\`\${linkBase} \${isActive(child.href)}\`}>
                          {child.icon} <span>{child.label}</span>
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
              <a href={item.href} className={\`\${linkBase} \${isActive(item.href)}\`}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Sidebar Footer */}
      {footer && <div className="p-4 border-t border-gray-200">{footer}</div>}
    </aside>
  );
};

export default ${componentName};
`;
};