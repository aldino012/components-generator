// src/templates/Dropdown.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState, useRef, useEffect } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Aksesibilitas (ARIA), Animasi Halus, Dark Mode, dan Outside Click Handler.
 */
const ${componentName} = ({
  trigger,               // React Node: Elemen pemicu (biasanya <Button>)
  children,              // React Node: Isi menu (biasanya kumpulan <button> atau <a>)
  position = 'bottom-end', // POSISI: 'bottom-start', 'bottom-end', 'top-start', 'top-end'
  hoverable = false,     // Boolean: Buka menu saat hover (default: klik)
  isOpen: controlledIsOpen, // Boolean (Opsional): Untuk state terkontrol dari luar
  onOpenChange,          // Function (Opsional): Callback saat status buka/tutup berubah
  className = '',
  ...props
}) => {
  // Gunakan state internal jika tidak dikontrol dari luar
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // 1. Handler untuk mengubah state (mendukung controlled & uncontrolled)
  const setIsOpen = (value) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(value);
    }
    if (onOpenChange) {
      onOpenChange(value);
    }
  };

  // 2. Tutup saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [controlledIsOpen, onOpenChange]);

  // 3. Tutup saat tombol 'Escape' ditekan (Aksesibilitas)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 4. Posisi & Animasi Origin
  const positionClasses = {
    'bottom-start': 'top-full left-0 mt-2 origin-top-left',
    'bottom-end': 'top-full right-0 mt-2 origin-top-right',
    'top-start': 'bottom-full left-0 mb-2 origin-bottom-left',
    'top-end': 'bottom-full right-0 mb-2 origin-bottom-right'
  };
  const posClass = positionClasses[position] || positionClasses['bottom-end'];

  // 5. Logika Hover dengan Delay (Mencegah flicker)
  const handleMouseEnter = () => {
    if (hoverable) {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (hoverable) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    }
  };

  // 6. Logika Penggabungan Class
  const baseWrapperClasses = 'relative inline-block text-left';
  
  const menuClasses = \`absolute z-50 w-56 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl transition-all duration-200 ease-out \${posClass} \${
    isOpen ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-95 translate-y-1'
  }\`;

  return (
    <div
      className={\`\${baseWrapperClasses} \${className}\`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Trigger Wrapper */}
      <div
        tabIndex={0}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="cursor-pointer focus:outline-none"
        onClick={() => {
          if (!hoverable) setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (!hoverable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={menuClasses} role="menu" aria-orientation="vertical">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`;
};