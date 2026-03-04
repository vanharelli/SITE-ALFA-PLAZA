const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public');

const optimizeImages = async (dir) => {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await optimizeImages(fullPath);
    } else if (/\.(jpe?g|png)$/i.test(file.name)) {
      const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`Optimized and converted ${fullPath} to ${webpPath}`);
        await fs.promises.unlink(fullPath);
        console.log(`Deleted original file: ${fullPath}`);
      } catch (error) {
        console.error(`Failed to process ${fullPath}:`, error);
      }
    }
  }
};

optimizeImages(assetsDir)
  .then(() => console.log('Image optimization complete.'))
  .catch(err => console.error('Image optimization failed:', err));
