const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const cloudinary = require('../config/cloudinary');

async function uploadLocalImages() {
  const imagesDir = path.join(__dirname, '../../../frontend/public/images');
  if (!fs.existsSync(imagesDir)) {
    console.log('[Cloudinary Upload]: No local images directory found at:', imagesDir);
    return;
  }

  function getFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getFiles(fullPath, arrayOfFiles);
      } else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    });
    return arrayOfFiles;
  }

  const imageFiles = getFiles(imagesDir);
  console.log(`[Cloudinary Upload]: Found ${imageFiles.length} local images to upload to dqakp8ucr...`);

  const results = {};
  for (const filePath of imageFiles) {
    const relativeName = path.relative(imagesDir, filePath).replace(/\\/g, '/');
    try {
      console.log(`[Uploading]: ${relativeName}...`);
      const uploadRes = await cloudinary.uploader.upload(filePath, { folder: 'vaveva_assets' });

      results[relativeName] = uploadRes.secure_url;
      console.log(`[Uploaded Success]: ${relativeName} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`[Upload Failed]: ${relativeName}`, err.message);
    }
  }

  console.log('\n========================================');
  console.log('CLOUDINARY UPLOAD COMPLETE (dqakp8ucr)');
  console.log('========================================');
  console.log(JSON.stringify(results, null, 2));
}

if (require.main === module) {
  uploadLocalImages();
}

module.exports = uploadLocalImages;
