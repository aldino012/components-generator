// src/templates/Switch.js

module.exports = (componentName) => {
  return `import React, { useId } from 'react';

/**
 * ${componentName} Component
 *
 * Fitur:
 * - Knob bergerak dari kiri ke kanan
 * - Mendukung keyboard melalui native button
 * - Mendukung dark mode
 * - Mendukung ukuran sm, md, dan lg
 * - Mendukung label di kiri atau kanan
 * - Mendukung error dan helper text
 * - Accessible dengan role="switch"
 */
const ${componentName} = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  helperText,
  size = 'md',
  labelPosition = 'right',
  className = '',
  ...props
}) => {
  const id = useId();

  const errorId = id + '-error';
  const helperId = id + '-helper';

  // =========================================================================
  // 1. KONFIGURASI UKURAN SWITCH
  // =========================================================================

  const sizes = {
    sm: {
      track: 'h-5 w-9',
      knob: 'h-4 w-4',
      checkedTranslate: 'translate-x-4',
    },
    md: {
      track: 'h-6 w-11',
      knob: 'h-5 w-5',
      checkedTranslate: 'translate-x-5',
    },
    lg: {
      track: 'h-7 w-14',
      knob: 'h-6 w-6',
      checkedTranslate: 'translate-x-7',
    },
  };

  const currentSize = sizes[size] || sizes.md;

  // =========================================================================
  // 2. EVENT HANDLER
  // =========================================================================

  const handleToggle = () => {
    if (disabled) return;

    if (typeof onChange === 'function') {
      onChange(!checked);
    }
  };

  // =========================================================================
  // 3. CLASS UNTUK TRACK
  // =========================================================================

  const trackBase = [
    'relative',
    'inline-flex',
    'flex-shrink-0',
    'items-center',
    'rounded-full',
    'border-2',
    'border-transparent',
    'transition-colors',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-indigo-600',
    'focus-visible:ring-offset-2',
    'dark:focus-visible:ring-indigo-400',
    'dark:focus-visible:ring-offset-slate-900',
  ].join(' ');

  const trackState = checked
    ? 'bg-indigo-600 dark:bg-indigo-500'
    : 'bg-slate-200 dark:bg-slate-700';

  const trackInteraction = disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer';

  const trackError = error
    ? 'ring-1 ring-rose-500 dark:ring-rose-400'
    : '';

  const trackClasses = [
    trackBase,
    currentSize.track,
    trackState,
    trackInteraction,
    trackError,
  ]
    .filter(Boolean)
    .join(' ');

  // =========================================================================
  // 4. CLASS UNTUK KNOB
  // =========================================================================

  const knobBase = [
    'pointer-events-none',
    'absolute',
    'left-0.5',
    'top-1/2',
    'rounded-full',
    'bg-white',
    'shadow-md',
    'ring-0',
    'transition-transform',
    'duration-200',
    'ease-in-out',
    '-translate-y-1/2',
  ].join(' ');

  const knobPosition = checked
    ? currentSize.checkedTranslate
    : 'translate-x-0';

  const knobClasses = [
    knobBase,
    currentSize.knob,
    knobPosition,
  ]
    .filter(Boolean)
    .join(' ');

  // =========================================================================
  // 5. CLASS UNTUK LABEL
  // =========================================================================

  const labelClasses = [
    'select-none',
    'text-sm',
    'font-medium',
    disabled
      ? 'cursor-not-allowed text-slate-400 dark:text-slate-600'
      : 'cursor-pointer text-slate-700 dark:text-slate-200',
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'flex',
    'items-center',
    'gap-3',
  ].join(' ');

  // =========================================================================
  // 6. ARIA DESCRIPTIONS
  // =========================================================================

  const ariaDescribedBy = [
    error ? errorId : null,
    !error && helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={className}>
      <div className={containerClasses}>
        {/* Label di sebelah kiri */}
        {label && labelPosition === 'left' && (
          <label
            htmlFor={id}
            className={labelClasses}
          >
            {label}
          </label>
        )}

        {/* Switch */}
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={ariaDescribedBy}
          disabled={disabled}
          onClick={handleToggle}
          className={trackClasses}
          {...props}
        >
          {/* Knob */}
          <span
            aria-hidden="true"
            className={knobClasses}
          />
        </button>

        {/* Label di sebelah kanan */}
        {label && labelPosition === 'right' && (
          <label
            htmlFor={id}
            className={labelClasses}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600 dark:text-rose-400"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span>{error}</span>
        </p>
      )}

      {/* Helper text */}
      {!error && helperText && (
        <p
          id={helperId}
          className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};