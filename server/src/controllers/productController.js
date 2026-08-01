const Product = require('../models/Product');

// @desc    Get all products with filtering, search, sorting & pagination
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      minPrice,
      maxPrice,
      color,
      size,
      waistSize,
      length,
      fit,
      material,
      fabric,
      collarType,
      neckType,
      sleeveType,
      pattern,
      brand,
      collection,
      inStockOnly,
      search,
      sort,
      isFeatured,
      isTrending,
      isBestSeller,
      isEditorsPick,
      page = 1,
      limit = 50
    } = req.query;

    let query = { isActive: true };

    // Category exact or regex match
    if (category && category !== 'All' && category !== 'HOME') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Subcategory matching (name, tags, description)
    if (subcategory && subcategory !== 'All' && !subcategory.startsWith('All ')) {
      const subRegex = new RegExp(subcategory.replace(/^All\s+/i, ''), 'i');
      query.$or = query.$or || [];
      query.$or.push(
        { name: subRegex },
        { tags: { $in: [subRegex] } },
        { description: subRegex },
        { category: subRegex }
      );
    }

    // Price filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Color variant filtering
    if (color) {
      query['colorVariants.colorName'] = { $regex: new RegExp(color, 'i') };
    }

    // Size or Waist Size filtering
    const targetSize = size || waistSize;
    if (targetSize) {
      query['inventory.size'] = targetSize;
    }

    // In Stock Only filtering
    if (inStockOnly === 'true') {
      query['inventory.stock'] = { $gt: 0 };
    }

    // Fit filtering
    if (fit) {
      const fitRegex = new RegExp(fit, 'i');
      query.$or = query.$or || [];
      query.$or.push(
        { tags: { $in: [fitRegex] } },
        { 'specifications.value': fitRegex },
        { description: fitRegex }
      );
    }

    // Material or Fabric filtering
    const targetMaterial = material || fabric;
    if (targetMaterial) {
      const matRegex = new RegExp(targetMaterial, 'i');
      query.$or = query.$or || [];
      query.$or.push(
        { materialDetails: matRegex },
        { tags: { $in: [matRegex] } },
        { description: matRegex }
      );
    }

    // Specific garment attributes (Collar, Neck, Sleeve, Pattern, Brand, Length)
    [collarType, neckType, sleeveType, pattern, brand, length].forEach((attribute) => {
      if (attribute) {
        const attrRegex = new RegExp(attribute, 'i');
        query.$or = query.$or || [];
        query.$or.push(
          { name: attrRegex },
          { tags: { $in: [attrRegex] } },
          { description: attrRegex }
        );
      }
    });

    // Search query
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
        { category: searchRegex }
      ];
    }

    if (isFeatured === 'true') query.isFeatured = true;
    if (isTrending === 'true') query.isTrending = true;
    if (isBestSeller === 'true') query.isBestSeller = true;
    if (isEditorsPick === 'true') query.isEditorsPick = true;

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { price: 1 };
    if (sort === 'price-high') sortOptions = { price: -1 };
    if (sort === 'best-selling' || sort === 'popular') sortOptions = { numReviews: -1, rating: -1 };
    if (sort === 'alphabetical') sortOptions = { name: 1 };
    if (sort === 'newest') sortOptions = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip(skip);

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(count / Number(limit)) || 1,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching products' });
  }
};

// @desc    Get single product by slug or ID
// @route   GET /api/products/:slug
exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let product = await Product.findOne({ slug });

    if (!product && slug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(slug);
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product inventory stock per variant
// @route   GET /api/products/:id/stock
exports.getProductStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({
      sku: product.sku,
      totalStock: product.totalStock,
      inventory: product.inventory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
