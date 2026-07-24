// src/templates/ProgressBar.js
module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Progress bar horizontal/vertikal dengan mode determinate & indeterminate.
 */
const ${componentName} = ({
  value = 0,
  max = 100,
  size = 'md',           
  orientation = 'horizontal', 
  variant = 'primary',   
  indeterminate = false,
  showValue = false,     // ✅ Mengganti showLabel agar sesuai dengan page.js
  label,                 // ✅ Destructure agar tidak masuk ke ...props
  labelPosition = 'top', // 'top', 'inside', 'right', 'bottom'
  className = '',
  ...props               // ✅ Sisa props valid untuk div wrapper
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  const colorMap = {
    primary: 'bg-blue-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const sizeMap = {
    sm: orientation === 'horizontal' ? 'h-2' : 'w-2',
    md: orientation === 'horizontal' ? 'h-4' : 'w-4',
    lg: orientation === 'horizontal' ? 'h-6' : 'w-6',
  };

  const containerClasses = orientation === 'horizontal'
    ? \`w-full \${sizeMap[size]} bg-gray-200 rounded-full overflow-hidden relative\`
    : \`h-40 \${sizeMap[size]} bg-gray-200 rounded-full overflow-hidden flex flex-col-reverse relative\`;

  const barClasses = orientation === 'horizontal'
    ? \`h-full \${colorMap[variant]} rounded-full transition-all duration-500 ease-in-out \${
        indeterminate ? 'animate-pulse' : ''
      }\`
    : \`w-full \${colorMap[variant]} rounded-full transition-all duration-500 ease-in-out \${
        indeterminate ? 'animate-pulse' : ''
      }\`;

  const barStyle = !indeterminate
    ? orientation === 'horizontal'
      ? { width: \`\${percent}%\` }
      : { height: \`\${percent}%\` }
    : {};

  return (
    <div className={\`flex flex-col w-full \${className}\`} {...props}>
      {/* ✅ Label di atas */}
      {label && labelPosition === 'top' && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && <span className="text-sm font-medium text-gray-900">{Math.round(percent)}%</span>}
        </div>
      )}

      <div className={containerClasses}>
        <div className={barClasses} style={barStyle}>
          {/* ✅ Label di dalam bar */}
          {showValue && labelPosition === 'inside' && orientation === 'horizontal' && percent > 10 && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white drop-shadow-md">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      </div>

      {/* ✅ Label di kanan atau bawah */}
      {label && (labelPosition === 'right' || labelPosition === 'bottom') && (
        <div className={\`flex \${labelPosition === 'right' ? 'flex-row items-center mt-1' : 'flex-col items-start mt-1'} gap-2\`}>
           <span className="text-sm font-medium text-gray-700">{label}</span>
           {showValue && <span className="text-sm font-medium text-gray-900">{Math.round(percent)}%</span>}
        </div>
      )}
      
      {/* ✅ Hanya showValue tanpa label */}
      {!label && showValue && labelPosition !== 'inside' && (
        <div className="text-right text-sm font-medium text-gray-900 mt-1">{Math.round(percent)}%</div>
      )}
    </div>
  );
};

export default ${componentName};
`;
};