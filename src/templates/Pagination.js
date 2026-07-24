// src/templates/Pagination.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Pagination component
 */
const ${componentName} = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  className = '',
  ...props
}) => {
  if (totalPages <= 1) return null;

  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 5;
    
    if (totalPages <= totalNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      return [1, '...', ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, '...', ...middleRange, '...', totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={\`flex items-center gap-1 \${className}\`} {...props}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={\`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 \${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }\`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className="px-3 py-2 text-sm text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange && onPageChange(page)}
            className={\`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 \${
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }\`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={\`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 \${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }\`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

export default ${componentName};
`;
};