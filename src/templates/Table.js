// src/templates/Table.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS - Responsive data table
 */
const ${componentName} = ({
  columns = [],          // Array of { key: 'name', label: 'Name', render?: (value, row) => JSX }
  data = [],             // Array of data objects
  onRowClick,            // Optional callback when row is clicked
  emptyMessage = 'No data available',
  className = '',
  ...props
}) => {
  if (data.length === 0) {
    return (
      <div className={\`text-center py-8 text-gray-500 \${className}\`} {...props}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={\`overflow-x-auto rounded-lg border border-gray-200 \${className}\`} {...props}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={\`transition-colors duration-150 \${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}\`}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.render 
                    ? col.render(row[col.key], row)
                    : row[col.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ${componentName};
`;
};