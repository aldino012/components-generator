// src/templates/Navbar.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 */
const ${componentName} = ({
  logo,                  // Logo element (img or text)
  links = [],            // Array of { label: 'Home', href: '/' }
  actions,               // Right side elements (buttons, profile dropdown)
  sticky = false,        // Stick to top on scroll
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navClasses = \`bg-white shadow-md flex items-center justify-between p-4 \${sticky ? 'sticky top-0 z-50' : ''} \${className}\`;

  return (
    <nav className={navClasses} {...props}>
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger - visible only on mobile */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          {logo || 'Brand'}
        </a>
      </div>

      {/* Center: Desktop Links - hidden on mobile */}
      <ul className="hidden lg:flex items-center gap-6 list-none">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.href} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {actions || (
          <a href="#" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </a>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 lg:hidden z-40">
          <ul className="flex flex-col p-4 gap-2">
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ${componentName};
`;
};