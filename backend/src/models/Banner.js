const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    image: { type: String, required: true },
    mobileImage: { type: String },
    link: { type: String, default: '/shop' },
    ctaText: { type: String, default: 'Explore Collection' },
    position: { type: String, enum: ['hero', 'featured', 'lifestyle', 'promo'], default: 'hero' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
