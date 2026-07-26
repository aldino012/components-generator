// src/generator.js

const fs = require('fs');
const path = require('path');
const config = require('./config');
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
      const content = getTemplate(componentName); 
      
      // PERBAIKAN: Ubah ekstensi menjadi .jsx agar kompatibel dengan Vite, Next.js, dan framework modern lainnya
      const filePath = path.join(folderPath, `${componentName}.jsx`); 

      fs.writeFileSync(filePath, content, 'utf8');
      totalFiles++;
      
      // PERBAIKAN: Update log console agar sesuai dengan ekstensi baru
      console.log(`✅ Created: ${folderName}/${componentName}.jsx`);
    });
  }

  console.log(`\n🎉 Selesai! ${totalFiles} component berhasil di-generate dengan ekstensi .jsx`);
}

module.exports = {
  generateComponents
};