// src/templates/ImageUpload.js

module.exports = (componentName) => {
  return `import React, { useState, useRef, useId } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Drag & Drop, Dark Mode, Aksesibilitas Keyboard, dan Preview yang Jelas.
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  preview,             // URL gambar awal (opsional)
  accept = 'image/*',  // Tipe file yang diizinkan
  onChange,            // Callback saat file dipilih/dihapus (mengembalikan File object atau null)
  disabled = false,    // Boolean: Menonaktifkan area upload
  className = '',
  ...props
}) => {
  const id = useId();
  const fileInputRef = useRef(null);
  const [localPreview, setLocalPreview] = useState(preview || null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // =========================================================================
  // 1. HANDLER FILE & DRAG-DROP
  // =========================================================================
  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (onChange) onChange(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation(); // Mencegah trigger klik pada dropzone
    setLocalPreview(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onChange) onChange(null);
  };

  // =========================================================================
  // 2. LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const containerBase = 'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-all duration-200';
  
  const containerState = disabled
    ? 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-60'
    : isDragging
      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
      : error
        ? 'border-rose-300 bg-rose-50 dark:bg-rose-900/10 dark:border-rose-800'
        : 'border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800 cursor-pointer';

  const finalContainerClasses = [containerBase, containerState, className].filter(Boolean).join(' ');
  const labelClasses = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5';
  const ariaDescribedBy = [error ? \`\${id}-error\` : null, helperText ? \`\${id}-helper\` : null].filter(Boolean).join(' ') || undefined;

  // Handler keyboard untuk aksesibilitas
  const handleKeyDown = (e) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && <label className={labelClasses}>{label}</label>}
      
      {/* Dropzone Area */}
      <div
        className={finalContainerClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Area upload gambar"
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy}
          {...props}
        />

        {localPreview ? (
          // TAMPILAN PREVIEW
          <div className="relative group">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <img 
                src={localPreview} 
                alt="Preview" 
                className="max-w-full h-40 object-contain" 
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[160px]" title={fileName}>
                {fileName}
              </p>
            </div>
            
            {/* Tombol Hapus */}
            {!disabled && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1.5 shadow-md hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label="Hapus gambar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          // TAMPILAN KOSONG (EMPTY STATE)
          <div className="text-center pointer-events-none">
            <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400 justify-center">
              <span className="relative font-semibold text-indigo-600 dark:text-indigo-400 focus-within:outline-none">
                <span>Klik untuk upload</span>
              </span>
              <p className="pl-1">atau drag and drop</p>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">PNG, JPG, GIF hingga 10MB</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p id={\`\${id}-error\`} className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600 dark:text-rose-400">
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p id={\`\${id}-helper\`} className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};