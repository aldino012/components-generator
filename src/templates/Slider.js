// src/templates/Slider.js
module.exports = (componentName) => {
  return `"use client";

import React, { useState } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
 * Input range / slider dengan styling custom.
 */
const ${componentName} = ({
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  showValue = true,
  label,
  helperText,          // ✅ Destructure agar tidak masuk ke ...props
  className = '',
  ...props             // ✅ Sisa props yang valid untuk div wrapper
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isControlled) setInternalValue(newValue);
    if (onChange) onChange(e); // ✅ Kembalikan event object agar kompatibel dengan page.js
  };

  const percentage = ((value - min) / (max - min)) * 100;

  const rangeClasses = \`w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer \${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:border-0
    [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-0\`;

  return (
    <div className={\`flex flex-col space-y-1 \${className}\`} {...props}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-900">{value}</span>
          )}
        </div>
      )}
      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={rangeClasses}
          style={{
            background: \`linear-gradient(to right, #2563eb 0%, #2563eb \${percentage}%, #e5e7eb \${percentage}%, #e5e7eb 100%)\`,
          }}
        />
      </div>
      {!label && showValue && (
        <div className="text-right text-sm font-medium text-gray-900">{value}</div>
      )}
      {/* ✅ Render helperText secara eksplisit */}
      {helperText && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};