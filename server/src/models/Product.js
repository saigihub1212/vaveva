const mongoose = require('mongoose');

const colorVariantSchema = new mongoose.Schema({
  colorName: { type: String, required: true },
  hexCode: { type: String, required: true },
  images: [{ type: String }]
});

const sizeStockSchema = new mongoose.Schema({
  colorName: { type: String, default: 'Default' },
  size: { type: String, required: true }, // 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE'
  stock: { type: Number, required: true, default: 0 }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true }, // e.g. 'Men', 'Women', 'Oversized', 'Shirts', 'Pants', 'Hoodies', 'Accessories'
    brand: { type: String, default: 'VAVEVA' },
    description: { type: String, required: true },
    materialDetails: { type: String, default: '100% Premium Organic Cotton, 280 GSM Heavyweight Fabric' },
    careInstructions: { type: String, default: 'Machine wash cold inside out, dry flat in shade, do not tumble dry.' },
    specifications: [
      {
        key: { type: String },
        value: { type: String }
      }
    ],
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    sku: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    hoverImage: { type: String },
    colorVariants: [colorVariantSchema],
    inventory: [sizeStockSchema], // Inventory breakdown by color + size
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isEditorsPick: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 24 }
  },
  { timestamps: true }
);

// Virtual property to calculate total stock
productSchema.virtual('totalStock').get(function () {
  if (!this.inventory || this.inventory.length === 0) return 0;
  return this.inventory.reduce((acc, curr) => acc + curr.stock, 0);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
