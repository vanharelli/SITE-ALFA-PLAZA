const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDirs = ['public', 'src/assets'];

async function optimizeImages(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      await optimizeImages(filePath);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const webpPath = path.join(dir, `${name}.webp`);
      
      console.log(`Optimizing: ${filePath} -> ${webpPath}`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        // Delete original file after conversion
        fs.unlinkSync(filePath);
        console.log(`Deleted original: ${filePath}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
}

async function run() {
  for (const dir of targetDirs) {
    const absoluteDir = path.resolve(__dirname, '..', dir);
    console.log(`Scanning directory: ${absoluteDir}`);
    await optimizeImages(absoluteDir);
  }
}

run().then(() => console.log('Optimization complete.'));