// src/templates/Button.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Hybrid Style: Tailwind CSS + DaisyUI + Bootstrap concepts
 * Requirement: Pastikan proyek target sudah menginstall Tailwind CSS dan DaisyUI.
 */
const ${componentName} = ({
  children,
  variant = 'primary',   // primary, secondary, accent, ghost, link, error, success, warning, info
  size = 'md',           // xs, sm, md, lg
  outline = false,
  block = false,         // Full width (Bootstrap concept)
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  // Base classes (DaisyUI btn + Tailwind transitions)
  let classes = 'btn transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  // 1. Variant & Outline Logic (DaisyUI/Bootstrap style)
  if (outline) {
    classes += ' btn-outline';
    if (variant !== 'primary') classes += \` btn-\${variant}\`;
  } else {
    classes += \` btn-\${variant}\`;
  }

  // 2. Size Logic (DaisyUI/Bootstrap sizing)
  if (size === 'xs') classes += ' btn-xs text-xs';
  else if (size === 'sm') classes += ' btn-sm text-sm';
  else if (size === 'lg') classes += ' btn-lg text-base';
  // 'md' is default in DaisyUI

  // 3. Block / Full Width (Bootstrap 'btn-block' concept via Tailwind/DaisyUI)
  if (block) classes += ' btn-block w-full';

  // 4. Loading State (DaisyUI native loading)
  if (loading) classes += ' loading';

  // Append custom className if provided
  if (className) classes += \` \${className}\`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="loading loading-spinner loading-xs"></span>}
      {children}
    </button>
  );
};

export default ${componentName};
`;
};