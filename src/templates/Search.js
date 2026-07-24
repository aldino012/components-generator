module.exports = (componentName) => {
  return `"use client";

import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Search input with icon
 */
const ${componentName} = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <div className={\`relative w-full \${className}\`} {...props}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={\`block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 transition-all duration-200 \${sizeClasses[size]}\`}
      />
      
      {value && onChange && (
        <button
          type="button"
          onClick={() => onChange({ target: { value: '' } })}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ${componentName};
`;
};