// src/templates/Navbar.js

module.exports = (componentName) => {
  return `"use client";

   import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
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

  const navClasses = \`navbar bg-base-100 shadow-md \${sticky ? 'sticky top-0 z-50' : ''} \${className}\`;

  return (
    <nav className={navClasses} {...props}>
      {/* Navbar Start: Mobile Hamburger & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <label 
            tabIndex={0} 
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
              {links.map((link, idx) => (
                <li key={idx}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          )}
        </div>
        <a href="/" className="btn btn-ghost text-xl font-bold">
          {logo || 'Brand'}
        </a>
      </div>

      {/* Navbar Center: Desktop Links (Bootstrap hidden-sm concept) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links.map((link, idx) => (
            <li key={idx}>
              <a href={link.href} className="font-medium hover:bg-base-200 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End: Actions */}
      <div className="navbar-end">
        {actions || (
          <a className="btn btn-primary">Get Started</a>
        )}
      </div>
    </nav>
  );
};

export default ${componentName};
`;
};