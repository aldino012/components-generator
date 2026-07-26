// src/templates/Table.js

module.exports = (componentName) => {
  return `import React from 'react';

const ${componentName} = ({
  columns = [],
  data = [],
  onRowClick,
  emptyMessage = 'Tidak ada data untuk ditampilkan.',
  striped = false,
  stickyHeader = false,
  className = '',
  ...props
}) => {
  const containerClass = \`overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 \${className}\`;

  if (!data.length) {
    return (
      <div
        className={\`rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50 \${className}\`}
        {...props}
      >
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const getAlign = (align) =>
    align === 'center'
      ? 'text-center'
      : align === 'right'
        ? 'text-right'
        : 'text-left';

  return (
    <div className={containerClass} {...props}>
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead
          className={\`bg-slate-50 dark:bg-slate-800/50 \${
            stickyHeader ? 'sticky top-0 z-10 shadow-sm' : ''
          }\`}
        >
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={\`\${String(col.key ?? 'column')}-\${colIndex}\`}
                scope="col"
                className={\`px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 \${getAlign(col.align)} \${col.className || ''}\`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
          {data.map((row, rowIndex) => {
            const rowKey = \`\${String(row.id ?? 'row')}-\${rowIndex}\`;
            const rowColor =
              striped && rowIndex % 2
                ? 'bg-slate-50/50 dark:bg-slate-800/30'
                : 'bg-white dark:bg-slate-900';

            return (
              <tr
                key={rowKey}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={\`transition-colors \${rowColor} \${
                  onRowClick
                    ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'
                    : ''
                }\`}
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.key];

                  return (
                    <td
                      key={\`\${rowKey}-\${String(col.key ?? 'cell')}-\${colIndex}\`}
                      className={\`whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-300 \${getAlign(col.align)} \${col.className || ''}\`}
                    >
                      {col.render
                        ? col.render(value, row, rowIndex)
                        : value ?? '-'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ${componentName};
`;
};