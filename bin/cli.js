#!/usr/bin/env node

const path = require('path');
const { generateComponents } = require('../src/generator');

// Ambil argumen dari terminal, default ke './src/components'
const targetDirectory = process.argv[2] || path.join(process.cwd(), 'src', 'components');

console.log('🚀 Memulai generate components...');
console.log(`📂 Target directory: ${targetDirectory}\n`);

generateComponents(targetDirectory);