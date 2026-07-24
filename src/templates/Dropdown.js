// src/templates/Dropdown.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState, useRef, useEffect } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS.
 */
const ${componentName} = ({
  trigger,               // Elemen pemicu (biasanya button)
  children,              // Isi menu, dirender di dalam <ul>
  position = 'bottom-start', // bottom-start, bottom-end, top-start, top-end
  hoverable = false,     // Tampil saat hover
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Tutup saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Posisi menu
  const positionClasses = {
    'bottom-start': 'top-full left-0 mt-1 origin-top-left',
    'bottom-end': 'top-full right-0 mt-1 origin-top-right',
    'top-start': 'bottom-full left-0 mb-1 origin-bottom-left',
    'top-end': 'bottom-full right-0 mb-1 origin-bottom-right'
  };
  const posClass = positionClasses[position] || positionClasses['bottom-start'];

  // Status buka: berdasarkan hover atau klik
  const showMenu = hoverable || isOpen;
  const menuVisibility = showMenu
    ? 'opacity-100 visible scale-100'
    : 'opacity-0 invisible scale-95';

  // Handler hover dengan delay kecil agar tidak langsung hilang
  const handleMouseEnter = () => { if (hoverable) { clearTimeout(timeoutRef.current); setIsOpen(true); } };
  const handleMouseLeave = () => { if (hoverable) timeoutRef.current = setTimeout(() => setIsOpen(false), 100); };

  return (
    <div
      className={\`relative inline-block \${className}\`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Trigger */}
      <div
        tabIndex={0}
        role="button"
        className="cursor-pointer"
        onClick={() => { if (!hoverable) setIsOpen(prev => !prev); }}
      >
        {trigger}
      </div>

      {/* Menu dropdown */}
      <ul
        className={\`absolute \${posClass} z-10 w-52 p-2 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 \${menuVisibility}\`}
      >
        {children}
      </ul>
    </div>
  );
};

export default ${componentName};
`;
};