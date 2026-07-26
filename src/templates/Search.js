// src/templates/Search.js

module.exports = (componentName) => {
  return `import React, { useId, useRef } from 'react';

/**
 * ${componentName} Component
 *
 * Fitur:
 * - Mendukung controlled input
 * - Mendukung loading state
 * - Memiliki satu tombol clear custom
 * - Mendukung light dan dark theme
 * - Mendukung disabled dan read-only
 * - Accessible untuk keyboard dan screen reader
 */
const ${componentName} = ({
  value = '',
  onChange,
  placeholder = 'Cari sesuatu...',
  size = 'md',
  isLoading = false,
  disabled = false,
  readOnly = false,
  className = '',
  inputClassName = '',
  'aria-label': ariaLabel = 'Pencarian',
  ...props
}) => {
  const inputId = useId();
  const inputRef = useRef(null);

  // =========================================================================
  // 1. KONFIGURASI UKURAN
  // =========================================================================

  const sizes = {
    sm: {
      input: 'h-9 py-1.5 text-sm rounded-md',
      leftPadding: 'pl-9',
      rightPadding: 'pr-9',
      searchIcon: 'h-4 w-4',
      actionIcon: 'h-4 w-4',
      leftPosition: 'pl-3',
      rightPosition: 'pr-2',
    },
    md: {
      input: 'h-11 py-2.5 text-sm rounded-lg',
      leftPadding: 'pl-10',
      rightPadding: 'pr-10',
      searchIcon: 'h-5 w-5',
      actionIcon: 'h-4 w-4',
      leftPosition: 'pl-3',
      rightPosition: 'pr-3',
    },
    lg: {
      input: 'h-13 py-3 text-base rounded-lg',
      leftPadding: 'pl-12',
      rightPadding: 'pr-12',
      searchIcon: 'h-6 w-6',
      actionIcon: 'h-5 w-5',
      leftPosition: 'pl-4',
      rightPosition: 'pr-3',
    },
  };

  const currentSize = sizes[size] || sizes.md;

  // =========================================================================
  // 2. STATUS INPUT
  // =========================================================================

  const isInputReadOnly = readOnly || typeof onChange !== 'function';

  const hasValue =
    value !== null &&
    value !== undefined &&
    String(value).length > 0;

  const showClearButton =
    hasValue &&
    !isLoading &&
    !disabled &&
    !isInputReadOnly;

  const showRightAction = isLoading || showClearButton;

  // =========================================================================
  // 3. CLASS INPUT
  // =========================================================================

  const baseClasses = [
    'block',
    'w-full',
    'border-0',
    'bg-white',
    'text-slate-900',
    'shadow-sm',
    'ring-1',
    'ring-inset',
    'ring-slate-300',
    'placeholder:text-slate-400',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-inset',
    'focus:ring-indigo-600',

    'dark:bg-slate-900',
    'dark:text-white',
    'dark:ring-slate-700',
    'dark:placeholder:text-slate-500',
    'dark:focus:ring-indigo-500',

    'disabled:cursor-not-allowed',
    'disabled:bg-slate-100',
    'disabled:text-slate-500',
    'disabled:opacity-70',

    'dark:disabled:bg-slate-800',
    'dark:disabled:text-slate-400',

    'read-only:cursor-default',
    'read-only:bg-slate-50',
    'dark:read-only:bg-slate-900',
  ].join(' ');

  const horizontalPadding = [
    currentSize.leftPadding,
    showRightAction ? currentSize.rightPadding : 'pr-3',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    baseClasses,
    currentSize.input,
    horizontalPadding,
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'relative',
    'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const searchIconClasses = [
    currentSize.searchIcon,
    'flex-shrink-0',
  ]
    .filter(Boolean)
    .join(' ');

  const actionIconClasses = [
    currentSize.actionIcon,
    'flex-shrink-0',
  ]
    .filter(Boolean)
    .join(' ');

  // =========================================================================
  // 4. HANDLER
  // =========================================================================

  const handleClear = () => {
    if (
      disabled ||
      isInputReadOnly ||
      typeof onChange !== 'function'
    ) {
      return;
    }

    onChange({
      target: {
        value: '',
        name: props.name,
        id: props.id || inputId,
      },
      currentTarget: {
        value: '',
        name: props.name,
        id: props.id || inputId,
      },
    });

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleClearMouseDown = (event) => {
    // Menjaga fokus agar tidak berpindah dari input ke tombol.
    event.preventDefault();
  };

  // =========================================================================
  // 5. RENDER
  // =========================================================================

  return (
    <div className={containerClasses}>
      {/* Ikon pencarian */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute',
          'inset-y-0',
          'left-0',
          'z-10',
          'flex',
          'items-center',
          'text-slate-400',
          'dark:text-slate-500',
          currentSize.leftPosition,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <svg
          className={searchIconClasses}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      {/* Input pencarian */}
      <input
        ref={inputRef}
        id={props.id || inputId}
        type="text"
        inputMode="search"
        enterKeyHint="search"
        role="searchbox"
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isInputReadOnly}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        className={inputClasses}
        {...props}
      />

      {/* Loading spinner */}
      {isLoading && (
        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',
            'absolute',
            'inset-y-0',
            'right-0',
            'z-10',
            'flex',
            'items-center',
            currentSize.rightPosition,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <svg
            className={[
              actionIconClasses,
              'animate-spin',
              'text-indigo-600',
              'dark:text-indigo-400',
            ]
              .filter(Boolean)
              .join(' ')}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />

            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>

          <span className="sr-only">Sedang mencari...</span>
        </div>
      )}

      {/* Satu tombol clear custom */}
      {showClearButton && (
        <div
          className={[
            'absolute',
            'inset-y-0',
            'right-0',
            'z-10',
            'flex',
            'items-center',
            currentSize.rightPosition,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            type="button"
            onMouseDown={handleClearMouseDown}
            onClick={handleClear}
            className={[
              'inline-flex',
              'items-center',
              'justify-center',
              'rounded-full',
              'p-1',
              'text-slate-400',
              'transition-colors',
              'duration-150',
              'hover:bg-slate-100',
              'hover:text-slate-700',
              'focus:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-indigo-500',
              'focus-visible:ring-offset-1',
              'dark:text-slate-500',
              'dark:hover:bg-slate-800',
              'dark:hover:text-slate-200',
              'dark:focus-visible:ring-offset-slate-900',
            ].join(' ')}
            aria-label="Hapus pencarian"
          >
            <svg
              aria-hidden="true"
              className={actionIconClasses}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`;
};