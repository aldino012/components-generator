// src/templates/Dropdown.js

module.exports = (componentName) => {
  return `"use client";

   import React, { useState, useRef, useEffect } from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS dan DaisyUI.
 */
const ${componentName} = ({
  trigger,               // Element yang diklik untuk membuka dropdown (misal: Button)
  children,              // Isi menu (gunakan <li><a>Item</a></li> ala DaisyUI menu)
  position = 'bottom-start', // bottom-start, bottom-end, top-start, top-end
  hoverable = false,     // Buka saat di-hover (DaisyUI native concept)
  className = '',        // Custom class untuk container menu
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside (Bootstrap/React standard behavior)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Position mapping
  let positionClasses = 'dropdown-bottom';
  if (position.includes('end')) positionClasses += ' dropdown-end';
  if (position.includes('top')) positionClasses = 'dropdown-top' + (position.includes('end') ? ' dropdown-end' : '');

  // Menu visibility & animation classes (Tailwind)
  const menuVisibility = isOpen || hoverable 
    ? 'opacity-100 visible scale-100' 
    : 'opacity-0 invisible scale-95';

  return (
    <div 
      className={\`dropdown \${positionClasses} \${hoverable ? 'dropdown-hover' : ''}\`}
      ref={dropdownRef}
      {...props}
    >
      {/* Trigger Element */}
      <div 
        tabIndex={0} 
        role="button" 
        className="cursor-pointer outline-none"
        onClick={() => !hoverable && setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      {/* Menu Content (DaisyUI menu + Bootstrap dropdown-menu styling) */}
      <ul 
        tabIndex={0} 
        className={\`dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-200 transition-all duration-200 origin-top \${menuVisibility} \${className}\`}
      >
        {children}
      </ul>
    </div>
  );
};

export default ${componentName};
`;
};