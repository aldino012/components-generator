// src/templates/Pagination.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Aksesibilitas (ARIA), Dark Mode ready, dan logika ellipsis yang robust.
 */
const ${componentName} = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,    // Jumlah halaman di kiri/kanan halaman aktif
  className = '',
  ...props
}) => {
  if (totalPages <= 1) return null;

  // Helper untuk membuat array angka
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Logika untuk menghasilkan nomor halaman dengan ellipsis (...)
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 5;
    
    // Jika total halaman sedikit, tampilkan semua
    if (totalPages <= totalNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1; // -1 karena kita selalu tampilkan halaman terakhir

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
      return [1, '...', ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, '...', ...middleRange, '...', totalPages];
  };

  const pageNumbers = getPageNumbers();

  // =========================================================================
  // PUSAT KONTROL CLASS (Clean & Konsisten)
  // =========================================================================
  const baseButtonClasses = "inline-flex items-center justify-center min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900";
  
  const activeClasses = "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm border border-transparent";
  
  const inactiveClasses = "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900";
  
  const disabledClasses = "text-slate-400 dark:text-slate-600 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700";
  
  const ellipsisClasses = "inline-flex items-center justify-center min-w-[36px] h-9 text-sm text-slate-400 dark:text-slate-600 select-none";

  return (
    <nav className={\`flex items-center gap-1 \${className}\`} aria-label="Pagination" {...props}>
      
      {/* 1. Tombol Previous */}
      <button
        type="button"
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={\`\${baseButtonClasses} \${currentPage === 1 ? disabledClasses : inactiveClasses}\`}
        aria-label="Halaman sebelumnya"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 2. Nomor Halaman */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={\`ellipsis-\${index}\`} className={ellipsisClasses} aria-hidden="true">
              •••
            </span>
          );
        }

        const isActive = currentPage === page;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange && onPageChange(page)}
            className={\`\${baseButtonClasses} \${isActive ? activeClasses : inactiveClasses}\`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={\`Halaman \${page}\${isActive ? ' (Aktif)' : ''}\`}
          >
            {page}
          </button>
        );
      })}

      {/* 3. Tombol Next */}
      <button
        type="button"
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={\`\${baseButtonClasses} \${currentPage === totalPages ? disabledClasses : inactiveClasses}\`}
        aria-label="Halaman berikutnya"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
    </nav>
  );
};

export default ${componentName};
`;
};