const express = require('express');
const router = express.Router();
const { getProducts, getProductBySlug, getProductStock } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.get('/:id/stock', getProductStock);

module.exports = router;
