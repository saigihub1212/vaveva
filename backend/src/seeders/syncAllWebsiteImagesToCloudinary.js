const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const cloudinary = require('../config/cloudinary');

async function syncAllImages() {
  console.log('[Cloudinary Sync]: Starting sync of all product & category images to Cloudinary (dqakp8ucr)...');

  const seedFilePath = path.join(__dirname, 'seed.js');
  let seedContent = fs.readFileSync(seedFilePath, 'utf8');

  // Extract all Unsplash URLs from seed.js
  const urlRegex = /https:\/\/images\.unsplash\.com\/[^\s'"]+/g;
  const matches = seedContent.match(urlRegex) || [];
  const uniqueUrls = Array.from(new Set(matches));

  console.log(`[Cloudinary Sync]: Found ${uniqueUrls.length} unique Unsplash website images to transfer to Cloudinary.`);

  const urlMap = {};
  let count = 0;

  for (const url of uniqueUrls) {
    count++;
    try {
      console.log(`[${count}/${uniqueUrls.length}] Uploading to Cloudinary: ${url.substring(0, 60)}...`);
      const uploadRes = await cloudinary.uploader.upload(url, {
        folder: 'vaveva_products'
      });
      urlMap[url] = uploadRes.secure_url;
      console.log(` -> SUCCESS: ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(` -> FAILED: ${url.substring(0, 60)}`, err.message);
    }
  }

  console.log(`\n[Cloudinary Sync]: Successfully uploaded ${Object.keys(urlMap).length} images to Cloudinary.`);

  // Replace Unsplash URLs in seed.js with Cloudinary URLs
  let replacedCount = 0;
  for (const [origUrl, cloudUrl] of Object.entries(urlMap)) {
    while (seedContent.includes(origUrl)) {
      seedContent = seedContent.replace(origUrl, cloudUrl);
      replacedCount++;
    }
  }

  fs.writeFileSync(seedFilePath, seedContent, 'utf8');
  console.log(`[Cloudinary Sync]: Replaced ${replacedCount} image references in seed.js with Cloudinary URLs!`);

  // Run database re-seed
  console.log('[Cloudinary Sync]: Re-seeding database in MongoDB Atlas with Cloudinary image URLs...');
  const { categoriesData, productsData, couponsData } = require('./seed');
  const seedData = require('./seed');
}

if (require.main === module) {
  syncAllImages();
}

module.exports = syncAllImages;
