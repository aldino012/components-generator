// src/templates/ProgressBar.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 *
 * Fitur:
 * - Mendukung light dan dark theme
 * - Mendukung progress horizontal dan vertical
 * - Mendukung mode determinate dan indeterminate
 * - Mendukung label dan nilai persentase
 * - Mendukung ukuran sm, md, dan lg
 * - Accessible menggunakan role="progressbar"
 */
const ${componentName} = ({
  value = 0,
  max = 100,
  size = 'md',
  orientation = 'horizontal',
  variant = 'primary',
  indeterminate = false,
  showValue = false,
  label,
  labelPosition = 'top',
  className = '',
  ...props
}) => {
  // =========================================================================
  // 1. NORMALISASI PROPS
  // =========================================================================

  const isVertical = orientation === 'vertical';

  const numericValue = Number(value);
  const numericMax = Number(max);

  const safeValue = Number.isFinite(numericValue)
    ? numericValue
    : 0;

  const safeMax =
    Number.isFinite(numericMax) && numericMax > 0
      ? numericMax
      : 100;

  const percent = Math.min(
    100,
    Math.max(0, (safeValue / safeMax) * 100)
  );

  const roundedPercent = Math.round(percent);

  // =========================================================================
  // 2. KONFIGURASI WARNA
  // =========================================================================

  const colors = {
    primary: 'bg-indigo-600 dark:bg-indigo-500',
    success: 'bg-emerald-600 dark:bg-emerald-500',
    warning: 'bg-amber-500 dark:bg-amber-400',
    error: 'bg-rose-600 dark:bg-rose-500',
    info: 'bg-sky-600 dark:bg-sky-500',
  };

  const currentColor = colors[variant] || colors.primary;

  // =========================================================================
  // 3. KONFIGURASI UKURAN
  // =========================================================================

  const horizontalSizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const verticalSizes = {
    sm: 'w-2',
    md: 'w-3',
    lg: 'w-4',
  };

  const currentSize = isVertical
    ? verticalSizes[size] || verticalSizes.md
    : horizontalSizes[size] || horizontalSizes.md;

  // =========================================================================
  // 4. CLASS CONTAINER UTAMA
  // =========================================================================

  const rootClasses = [
    isVertical
      ? 'inline-flex items-center'
      : 'flex w-full flex-col',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // =========================================================================
  // 5. CLASS TRACK
  // =========================================================================

  const trackClasses = [
    'relative',
    'overflow-hidden',
    'rounded-full',
    'bg-slate-200',
    'dark:bg-slate-700',
    currentSize,
    isVertical ? 'h-40' : 'w-full',
  ]
    .filter(Boolean)
    .join(' ');

  // =========================================================================
  // 6. CLASS PROGRESS BAR
  // =========================================================================

  const barBaseClasses = [
    'relative',
    'rounded-full',
    currentColor,
    'transition-all',
    'duration-500',
    'ease-out',
  ]
    .filter(Boolean)
    .join(' ');

  const barSizeClasses = isVertical
    ? 'absolute bottom-0 left-0 w-full'
    : 'h-full';

  const determinateBarClasses = [
    barBaseClasses,
    barSizeClasses,
  ]
    .filter(Boolean)
    .join(' ');

  const indeterminateBarClasses = [
    barBaseClasses,
    isVertical
      ? 'absolute bottom-0 left-0 h-1/3 w-full animate-pulse'
      : 'h-full w-1/3 animate-pulse',
  ]
    .filter(Boolean)
    .join(' ');

  // =========================================================================
  // 7. INLINE STYLE
  // =========================================================================

  const barStyle = indeterminate
    ? undefined
    : isVertical
      ? { height: percent + '%' }
      : { width: percent + '%' };

  // =========================================================================
  // 8. CLASS LABEL
  // =========================================================================

  const labelClasses = [
    'text-sm',
    'font-medium',
    'text-slate-700',
    'dark:text-slate-300',
  ].join(' ');

  const valueClasses = [
    'text-sm',
    'font-medium',
    'tabular-nums',
    'text-slate-900',
    'dark:text-white',
  ].join(' ');

  // =========================================================================
  // 9. ACCESSIBILITY
  // =========================================================================

  const accessibilityProps = indeterminate
    ? {
        role: 'progressbar',
        'aria-label': label || 'Sedang memuat',
        'aria-busy': true,
      }
    : {
        role: 'progressbar',
        'aria-label': label || 'Progress',
        'aria-valuenow': safeValue,
        'aria-valuemin': 0,
        'aria-valuemax': safeMax,
        'aria-valuetext': roundedPercent + '%',
        'aria-busy': false,
      };

  // =========================================================================
  // 10. PROGRESS TRACK
  // =========================================================================

  const progressTrack = (
    <div
      className={trackClasses}
      {...accessibilityProps}
    >
      {indeterminate ? (
        <div
          aria-hidden="true"
          className={indeterminateBarClasses}
        />
      ) : (
        <div
          aria-hidden="true"
          className={determinateBarClasses}
          style={barStyle}
        >
          {showValue &&
            labelPosition === 'inside' &&
            !isVertical &&
            percent >= 20 && (
              <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-1 text-xs font-bold text-white drop-shadow-sm">
                {roundedPercent}%
              </span>
            )}
        </div>
      )}
    </div>
  );

  // =========================================================================
  // 11. VERTICAL PROGRESS
  // =========================================================================

  if (isVertical) {
    return (
      <div className={rootClasses} {...props}>
        <div className="flex flex-col items-center gap-2">
          {label && labelPosition === 'top' && (
            <span className={labelClasses}>
              {label}
            </span>
          )}

          {showValue &&
            !indeterminate &&
            labelPosition === 'top' && (
              <span className={valueClasses}>
                {roundedPercent}%
              </span>
            )}

          {progressTrack}

          {label && labelPosition === 'bottom' && (
            <span className={labelClasses}>
              {label}
            </span>
          )}

          {showValue &&
            !indeterminate &&
            labelPosition !== 'inside' &&
            labelPosition !== 'top' && (
              <span className={valueClasses}>
                {roundedPercent}%
              </span>
            )}
        </div>

        {labelPosition === 'right' && (
          <div className="ml-3 flex flex-col gap-1">
            {label && (
              <span className={labelClasses}>
                {label}
              </span>
            )}

            {showValue && !indeterminate && (
              <span className={valueClasses}>
                {roundedPercent}%
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 12. HORIZONTAL PROGRESS
  // =========================================================================

  return (
    <div className={rootClasses} {...props}>
      {/* Label bagian atas */}
      {(labelPosition === 'top' || labelPosition === 'right') &&
        (label || (showValue && !indeterminate)) && (
          <div className="mb-1.5 flex items-center justify-between gap-3">
            {label && (
              <span className={labelClasses}>
                {label}
              </span>
            )}

            {showValue && !indeterminate && (
              <span className={valueClasses}>
                {roundedPercent}%
              </span>
            )}
          </div>
        )}

      {/* Track dan progress bar */}
      {progressTrack}

      {/* Label bagian bawah */}
      {labelPosition === 'bottom' &&
        (label || (showValue && !indeterminate)) && (
          <div className="mt-1.5 flex items-center justify-between gap-3">
            {label && (
              <span className={labelClasses}>
                {label}
              </span>
            )}

            {showValue && !indeterminate && (
              <span className={valueClasses}>
                {roundedPercent}%
              </span>
            )}
          </div>
        )}

      {/* Value tanpa label */}
      {!label &&
        showValue &&
        !indeterminate &&
        labelPosition !== 'inside' &&
        labelPosition !== 'top' &&
        labelPosition !== 'bottom' &&
        labelPosition !== 'right' && (
          <div className="mt-1.5 text-right text-sm font-medium tabular-nums text-slate-900 dark:text-white">
            {roundedPercent}%
          </div>
        )}
    </div>
  );
};

export default ${componentName};
`;
};