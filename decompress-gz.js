#!/usr/bin/env node

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Files to decompress
const filesToDecompress = [
  'triangulate/Build/Builds.data.gz',
  'triangulate/Build/Builds.framework.js.gz',
  'triangulate/Build/Builds.wasm.gz'
];

function decompressFile(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(/\.gz$/, '');
    
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const gunzip = zlib.createGunzip();

    readStream
      .pipe(gunzip)
      .pipe(writeStream)
      .on('finish', () => {
        console.log(`✓ Decompressed ${inputPath} → ${outputPath}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`✗ Error decompressing ${inputPath}:`, err);
        reject(err);
      });

    readStream.on('error', (err) => {
      console.error(`✗ Error reading ${inputPath}:`, err);
      reject(err);
    });
  });
}

async function main() {
  try {
    console.log('Starting decompression of Unity WebGL files...\n');
    
    for (const file of filesToDecompress) {
      const fullPath = path.join(__dirname, file);
      if (fs.existsSync(fullPath)) {
        await decompressFile(fullPath);
      } else {
        console.warn(`⚠ File not found: ${fullPath}`);
      }
    }
    
    console.log('\n✓ All files decompressed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Decompression failed:', error);
    process.exit(1);
  }
}

main();
