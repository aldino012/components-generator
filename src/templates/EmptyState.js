// src/templates/EmptyState.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Modern, Dark Mode ready, dengan wrapper ikon yang elegan.
 */
const ${componentName} = ({
  icon,                  // React Node: Ikon kustom (opsional)
  title = 'Tidak Ada Data',
  description = 'Belum ada data yang tersedia untuk ditampilkan saat ini.',
  action,                // React Node: Biasanya sebuah <Button> untuk memicu aksi
  className = '',
  ...props
}) => {
  // =========================================================================
  // LOGIKA PENGGABUNGAN CLASS
  // =========================================================================
  const containerClasses = [
    'flex flex-col items-center justify-center p-8 text-center rounded-2xl border-2 border-dashed transition-colors duration-200',
    'bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800',
    className
  ].filter(Boolean).join(' ');

  const iconWrapperClasses = 'w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500';
  const titleClasses = 'text-lg font-semibold text-slate-900 dark:text-white mb-2';
  const descClasses = 'text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed';
  const actionClasses = 'mt-2';

  return (
    <div className={containerClasses} {...props}>
      {/* Ikon dengan Wrapper Premium */}
      <div className={iconWrapperClasses}>
        {icon ? (
          React.cloneElement(icon, { 
            className: \`w-8 h-8 \${icon.props.className || ''}\` 
          })
        ) : (
          // Default Icon: Folder / Inbox Kosong
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>

      {/* Judul */}
      <h3 className={titleClasses}>
        {title}
      </h3>

      {/* Deskripsi */}
      <p className={descClasses}>
        {description}
      </p>

      {/* Tombol Aksi (Opsional) */}
      {action && (
        <div className={actionClasses}>
          {action}
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`;
};