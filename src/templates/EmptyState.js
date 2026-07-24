// src/templates/EmptyState.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - No external UI library dependencies
 */
const ${componentName} = ({
  icon,
  title = 'No Data Available',
  description = 'There is no data to display at the moment.',
  action,
  className = '',
  ...props
}) => {
  return (
    <div 
      className={\`flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 \${className}\`}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      
      {/* Default Icon if none provided */}
      {!icon && (
        <svg 
          className="w-16 h-16 mb-4 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        {description}
      </p>

      {/* Action Button */}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`;
};