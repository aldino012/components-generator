// src/templates/Spinner.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Loading spinner component
 */
const ${componentName} = ({
  size = 'md',           // sm, md, lg, xl
  variant = 'default',   // default, dotted, bars
  color = 'blue',        // blue, gray, white, red, green
  text,
  textPosition = 'right', // right, bottom, left, top
  className = '',
  ...props
}) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // Color mapping for border
  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white',
    red: 'border-red-600',
    green: 'border-green-600',
    purple: 'border-purple-600',
  };

  // Text position classes
  const positionClasses = {
    right: 'flex-row',
    bottom: 'flex-col',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
  };

  // Default spinner (circular)
  const renderDefaultSpinner = () => (
    <div
      className={\`animate-spin rounded-full border-4 border-t-transparent \${sizeClasses[size]} \${colorClasses[color]} \${className}\`}
      {...props}
    />
  );

  // Dotted spinner
  const renderDottedSpinner = () => (
    <div className={\`flex space-x-1 \${className}\`} {...props}>
      <div className={\`\${sizeClasses[size]} bg-current rounded-full animate-bounce\`} style={{ animationDelay: '0ms' }} />
      <div className={\`\${sizeClasses[size]} bg-current rounded-full animate-bounce\`} style={{ animationDelay: '150ms' }} />
      <div className={\`\${sizeClasses[size]} bg-current rounded-full animate-bounce\`} style={{ animationDelay: '300ms' }} />
    </div>
  );

  // Bars spinner
  const renderBarsSpinner = () => (
    <div className={\`flex space-x-1 items-center \${className}\`} {...props}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={\`w-1 bg-current rounded-full animate-pulse \${sizeClasses[size]}\`}
          style={{ 
            animationDelay: \`\${i * 150}ms\`,
            height: size === 'sm' ? '12px' : size === 'md' ? '24px' : size === 'lg' ? '36px' : '48px'
          }}
        />
      ))}
    </div>
  );

  // Select spinner based on variant
  const renderSpinner = () => {
    switch (variant) {
      case 'dotted':
        return renderDottedSpinner();
      case 'bars':
        return renderBarsSpinner();
      default:
        return renderDefaultSpinner();
    }
  };

  // If no text, just return spinner
  if (!text) {
    return renderSpinner();
  }

  // Return spinner with text
  return (
    <div className={\`flex items-center justify-center gap-3 \${positionClasses[textPosition]}\`}>
      {renderSpinner()}
      <span className="text-sm text-gray-600 font-medium">{text}</span>
    </div>
  );
};

export default ${componentName};
`;
};