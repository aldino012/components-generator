// src/templates/Skeleton.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Loading placeholder component
 */
const ${componentName} = ({
  variant = 'text',      // text, circular, rectangular, card, list
  width = 'w-full',
  height = 'h-4',
  borderRadius = 'rounded',
  className = '',
  count = 1,             // Number of skeletons to render (for list variant)
  ...props
}) => {
  // Base skeleton classes with animation
  const baseClasses = 'animate-pulse bg-gray-300';
  
  // Variant-specific classes
  const variantClasses = {
    text: \`\${width} \${height} \${borderRadius}\`,
    circular: 'rounded-full w-12 h-12',
    rectangular: \`\${width} \${height || 'h-32'} \${borderRadius}\`,
    card: 'w-full h-48 rounded-lg',
    list: \`\${width} \${height} \${borderRadius}\`,
  };

  // Render multiple skeletons for list variant
  if (variant === 'list' && count > 1) {
    return (
      <div className="space-y-3" {...props}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={\`\${baseClasses} \${variantClasses[variant]} \${className}\`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={\`\${baseClasses} \${variantClasses[variant]} \${className}\`}
      {...props}
    />
  );
};

// Pre-defined skeleton components for common use cases
export const SkeletonText = ({ lines = 3, className = '', ...props }) => (
  <div className="space-y-2" {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={\`animate-pulse bg-gray-300 rounded h-4 \${i === lines - 1 ? 'w-3/4' : 'w-full'} \${className}\`}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '', ...props }) => (
  <div className={\`p-4 space-y-3 \${className}\`} {...props}>
    <div className="animate-pulse bg-gray-300 h-32 rounded-lg" />
    <div className="space-y-2">
      <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded" />
      <div className="animate-pulse bg-gray-300 h-3 w-1/2 rounded" />
    </div>
  </div>
);

export const SkeletonAvatar = ({ size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={\`animate-pulse bg-gray-300 rounded-full \${sizeClasses[size]} \${className}\`}
      {...props}
    />
  );
};

export default ${componentName};
`;
};