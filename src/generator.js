// src/generator.js

const fs = require('fs');
const path = require('path');
const config = require('./config');
// UBAH DI SINI: Import dari folder templates/index.js
const { getTemplate } = require('./templates'); 

function generateComponents(targetDir) {
  let totalFiles = 0;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const [folderName, components] of Object.entries(config.structure)) {
    const folderPath = path.join(targetDir, folderName);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    components.forEach(componentName => {
      // UBAH DI SINI: Gunakan getTemplate dari index.js
      const content = getTemplate(componentName); 
      
      // Catatan: Jika proyek Anda menggunakan .jsx, ubah .js menjadi .jsx di baris bawah ini
      const filePath = path.join(folderPath, `${componentName}.js`); 

      fs.writeFileSync(filePath, content, 'utf8');
      totalFiles++;
      console.log(`✅ Created: ${folderName}/${componentName}.js`);
    });
  }

  console.log(`\n🎉 Selesai! ${totalFiles} component berhasil di-generate.`);
}

module.exports = {
  generateComponents
};