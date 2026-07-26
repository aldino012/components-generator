// src/templates/SEO.js

module.exports = (componentName) => {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Komponen universal untuk mengatur Meta Tag SEO (Title, Description, Open Graph).
 * Catatan: Jika menggunakan Next.js App Router, pertimbangkan untuk menggunakan generateMetadata.
 */
const ${componentName} = ({ 
  title = 'Default Title', 
  description = 'Default description for this page.', 
  image, 
  url 
}) => {
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {url && <meta name="twitter:url" content={url} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
};

export default ${componentName};
`;
};