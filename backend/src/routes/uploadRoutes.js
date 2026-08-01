const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload - Upload file or base64 to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let fileStr = '';
    
    if (req.file) {
      // Buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      fileStr = `data:${req.file.mimetype};base64,${b64}`;
    } else if (req.body.image) {
      fileStr = req.body.image;
    } else {
      return res.status(400).json({ message: 'No image file or image data provided' });
    }

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'vaveva_products'
    });

    res.json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });
  } catch (error) {
    console.error('[Cloudinary Upload Error]:', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
});

module.exports = router;
