// src/templates/ImageUpload.js

module.exports = (componentName) => {
  return `import React, { useState, useRef, useId } from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Drag & Drop / Click to upload image
 */
const ${componentName} = ({
  label,
  error,
  helperText,
  preview,          // Initial preview URL
  accept = 'image/*',
  onChange,
  className = '',
  ...props
}) => {
  const id = useId();
  const fileInputRef = useRef(null);
  const [localPreview, setLocalPreview] = useState(preview || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (onChange) onChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (onChange) onChange(file);
    }
  };

  const removeImage = () => {
    setLocalPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onChange) onChange(null);
  };

  return (
    <div className={\`w-full \${className}\`}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">
          {label}
        </label>
      )}
      
      <div
        className={\`relative flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-all duration-200 cursor-pointer \${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }\`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />

        {localPreview ? (
          <div className="relative group">
            <img 
              src={localPreview} 
              alt="Preview" 
              className="h-32 w-32 object-cover rounded-md shadow-sm" 
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeImage(); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
              <span className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                Upload a file
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-1.5 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ${componentName};
`;
};