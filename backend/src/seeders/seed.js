const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Coupon = require('../models/Coupon');

dotenv.config();

const categoriesData = [
  {
    name: 'Oversized',
    slug: 'oversized',
    description: 'Signature drop-shoulder oversized fits crafted from heavyweight 280-480 GSM fabrics.',
    image: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600749/vaveva_products/aqu1yry3k6czdlbftxvo.jpg',
    itemCount: 12,
    isFeatured: true
  },
  {
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Heavyweight organic cotton minimal tees, crew necks, and vintage washes.',
    image: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600750/vaveva_products/rj5zn1ioud5szqx2dqu8.jpg',
    itemCount: 10,
    isFeatured: true
  },
  {
    name: 'Shirts',
    slug: 'shirts',
    description: 'European linen resort shirts, heavyweight twill overshirts, and tailored Oxfords.',
    image: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600751/vaveva_products/diudtapzbmmkrwm4yzw1.jpg',
    itemCount: 10,
    isFeatured: true
  },
  {
    name: 'Pants',
    slug: 'pants',
    description: 'Deep pleated trousers, 14oz wide-leg denim, and architectural utility cargo pants.',
    image: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600752/vaveva_products/ytsdsm5phbjjlhsunaue.jpg',
    itemCount: 10,
    isFeatured: true
  },
  {
    name: 'Hoodies',
    slug: 'hoodies',
    description: '480 GSM heavyweight French Terry fleece hoodies and luxury zip-ups.',
    image: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600752/vaveva_products/ndxicribwgltthovggdv.jpg',
    itemCount: 8,
    isFeatured: true
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Full-grain leather belts, organic caps, cashmere beanies, and minimal leather bags.',
    image: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600753/vaveva_products/fusrjqylr4nfv1erlqzi.jpg',
    itemCount: 10,
    isFeatured: true
  }
];

const productsData = [
  // ==================== OVERSIZED (12 Products) ====================
  {
    name: 'Heavyweight Boxy Oversized Tee',
    slug: 'heavyweight-boxy-oversized-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Engineered from 300 GSM combed organic cotton with signature boxy drop shoulders and ribbed collar.',
    materialDetails: '100% Organic Combed Cotton (300 GSM Heavyweight)',
    careInstructions: 'Machine wash cold inside out, line dry in shade.',
    specifications: [
      { key: 'Fit', value: 'Boxy Oversized' },
      { key: 'Weight', value: '300 GSM' },
      { key: 'Material', value: 'Organic Cotton' }
    ],
    price: 1899,
    compareAtPrice: 2599,
    discountPercentage: 27,
    sku: 'VAV-OV-001',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Obsidian Black', hexCode: '#111111' },
      { colorName: 'Beige', hexCode: '#E5DFD3' },
      { colorName: 'Espresso', hexCode: '#3C2A21' }
    ],
    inventory: [
      { colorName: 'Obsidian Black', size: 'S', stock: 12 },
      { colorName: 'Obsidian Black', size: 'M', stock: 24 },
      { colorName: 'Obsidian Black', size: 'L', stock: 18 },
      { colorName: 'Obsidian Black', size: 'XL', stock: 10 }
    ],
    tags: ['Oversized', 'T-Shirt', 'Heavyweight', 'Boxy'],
    isFeatured: true,
    isTrending: true,
    rating: 4.9,
    numReviews: 128
  },
  {
    name: 'Acid Wash Oversized Vintage Tee',
    slug: 'acid-wash-oversized-vintage-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Custom sun-fade acid washed 280 GSM cotton creating a sun-bleached vintage patina with relaxed fit.',
    materialDetails: '100% Ring-Spun Cotton (280 GSM Vintage Wash)',
    price: 1999,
    compareAtPrice: 2799,
    discountPercentage: 28,
    sku: 'VAV-OV-002',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/ajsqcnprdssxrhbczjzl.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
    colorVariants: [
      { colorName: 'Washed Charcoal', hexCode: '#2B2B2B' },
      { colorName: 'Sunfade Olive', hexCode: '#5B624A' }
    ],
    inventory: [
      { colorName: 'Washed Charcoal', size: 'S', stock: 8 },
      { colorName: 'Washed Charcoal', size: 'M', stock: 16 },
      { colorName: 'Washed Charcoal', size: 'L', stock: 12 },
      { colorName: 'Washed Charcoal', size: 'XL', stock: 6 }
    ],
    tags: ['Oversized', 'Vintage', 'Acid Wash'],
    isFeatured: true,
    rating: 4.8,
    numReviews: 95
  },
  {
    name: 'Signature Drop-Shoulder Cotton Tee',
    slug: 'signature-drop-shoulder-cotton-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Minimalist drop-shoulder silhouette tailored for relaxed day-to-evening effortless dressing.',
    materialDetails: '100% Organic Combed Cotton',
    price: 1799,
    compareAtPrice: 2499,
    discountPercentage: 28,
    sku: 'VAV-OV-003',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
    colorVariants: [
      { colorName: 'Warm Sand', hexCode: '#D8CEBE' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Warm Sand', size: 'S', stock: 10 },
      { colorName: 'Warm Sand', size: 'M', stock: 18 },
      { colorName: 'Warm Sand', size: 'L', stock: 14 }
    ],
    tags: ['Oversized', 'Drop Shoulder'],
    isFeatured: false,
    rating: 4.7,
    numReviews: 64
  },
  {
    name: 'Minimalist Oversized Graphic Tee',
    slug: 'minimalist-oversized-graphic-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Heavyweight organic cotton tee featuring high-density tonal VAVEVA statement crest back embroidery.',
    materialDetails: '100% Organic Heavyweight Cotton (290 GSM)',
    price: 2099,
    compareAtPrice: 2999,
    discountPercentage: 30,
    sku: 'VAV-OV-004',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Ecru White', hexCode: '#F5F2EB' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Ecru White', size: 'M', stock: 15 },
      { colorName: 'Ecru White', size: 'L', stock: 10 }
    ],
    tags: ['Oversized', 'Graphic', 'Minimal'],
    isTrending: true,
    rating: 4.9,
    numReviews: 112
  },
  {
    name: 'Heavyweight Long Sleeve Oversized Tee',
    slug: 'heavyweight-long-sleeve-oversized-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Relaxed long-sleeve tee with rib cuffs and structured heavyweight drape engineered for cold seasons.',
    materialDetails: '100% Combed Heavy Cotton (310 GSM)',
    price: 2199,
    compareAtPrice: 2999,
    discountPercentage: 26,
    sku: 'VAV-OV-005',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
    colorVariants: [
      { colorName: 'Espresso Brown', hexCode: '#3C2A21' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Espresso Brown', size: 'S', stock: 6 },
      { colorName: 'Espresso Brown', size: 'M', stock: 12 },
      { colorName: 'Espresso Brown', size: 'L', stock: 8 }
    ],
    tags: ['Oversized', 'Long Sleeve', 'Heavyweight'],
    rating: 4.8,
    numReviews: 54
  },
  {
    name: 'Utility Pocket Oversized Tee',
    slug: 'utility-pocket-oversized-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Boxy tee with flap chest utility pocket and reinforced double stitching on shoulders.',
    materialDetails: '100% Organic Heavyweight Cotton',
    price: 1949,
    compareAtPrice: 2699,
    discountPercentage: 27,
    sku: 'VAV-OV-006',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
    colorVariants: [
      { colorName: 'Military Olive', hexCode: '#4B5320' },
      { colorName: 'Sand', hexCode: '#D8CEBE' }
    ],
    inventory: [
      { colorName: 'Military Olive', size: 'M', stock: 14 },
      { colorName: 'Military Olive', size: 'L', stock: 9 }
    ],
    tags: ['Oversized', 'Utility', 'Pocket'],
    rating: 4.7,
    numReviews: 43
  },
  {
    name: 'Heavyweight Heavy Organic Tee',
    slug: 'heavyweight-heavy-organic-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: '320 GSM thick knit tee crafted for structural elegance without sacrificing softness.',
    materialDetails: '100% Organic Heavy Cotton (320 GSM)',
    price: 1899,
    compareAtPrice: 2599,
    discountPercentage: 27,
    sku: 'VAV-OV-007',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
    colorVariants: [
      { colorName: 'Slate Grey', hexCode: '#5A636A' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Slate Grey', size: 'M', stock: 12 },
      { colorName: 'Slate Grey', size: 'L', stock: 15 }
    ],
    tags: ['Oversized', 'Heavyweight', 'Organic'],
    rating: 4.9,
    numReviews: 82
  },
  {
    name: 'Oversized Sun-Bleached Raw Hem Tee',
    slug: 'oversized-sun-bleached-raw-hem-tee',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Unfinished raw edge hemline with sun-baked pigment dye wash for an effortless aesthetic.',
    materialDetails: '100% Pigment-Dyed Cotton',
    price: 1799,
    compareAtPrice: 2499,
    discountPercentage: 28,
    sku: 'VAV-OV-008',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
    colorVariants: [
      { colorName: 'Sunfade Tan', hexCode: '#CBB799' }
    ],
    inventory: [
      { colorName: 'Sunfade Tan', size: 'S', stock: 5 },
      { colorName: 'Sunfade Tan', size: 'M', stock: 10 },
      { colorName: 'Sunfade Tan', size: 'L', stock: 8 }
    ],
    tags: ['Oversized', 'Raw Hem', 'Sunfade'],
    rating: 4.6,
    numReviews: 38
  },
  {
    name: 'Oversized Utility Cargo Pants',
    slug: 'oversized-utility-cargo-pants',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Wide-leg boxy cargo trousers with deep gusseted pockets and adjustable cuff toggles.',
    materialDetails: '100% Heavy Cotton Twill',
    price: 2499,
    compareAtPrice: 3499,
    discountPercentage: 28,
    sku: 'VAV-OV-009',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
    colorVariants: [
      { colorName: 'Dark Khaki', hexCode: '#786C5A' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Dark Khaki', size: 'M', stock: 12 },
      { colorName: 'Dark Khaki', size: 'L', stock: 14 }
    ],
    tags: ['Oversized', 'Cargo', 'Pants'],
    rating: 4.9,
    numReviews: 76
  },
  {
    name: 'Oversized Heavyweight Fleece Sweatshorts',
    slug: 'oversized-heavyweight-fleece-sweatshorts',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: '400 GSM heavyweight French Terry sweatshorts with raw knee length cut and thick waistband.',
    materialDetails: '100% French Terry Cotton (400 GSM)',
    price: 1699,
    compareAtPrice: 2299,
    discountPercentage: 26,
    sku: 'VAV-OV-010',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
    colorVariants: [
      { colorName: 'Washed Black', hexCode: '#222222' }
    ],
    inventory: [
      { colorName: 'Washed Black', size: 'M', stock: 18 },
      { colorName: 'Washed Black', size: 'L', stock: 10 }
    ],
    tags: ['Oversized', 'Shorts', 'Fleece'],
    rating: 4.8,
    numReviews: 49
  },
  {
    name: 'Oversized Boxy Drop Hoodie',
    slug: 'oversized-boxy-drop-hoodie',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Extreme oversized drop shoulder hoodie crafted from 480 GSM plush organic fleece.',
    materialDetails: '100% Organic French Terry Fleece (480 GSM)',
    price: 2799,
    compareAtPrice: 3899,
    discountPercentage: 28,
    sku: 'VAV-OV-011',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600760/vaveva_products/sbp7v7netv3fqaackv9t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600760/vaveva_products/sbp7v7netv3fqaackv9t.jpg',
    colorVariants: [
      { colorName: 'Desert Dune', hexCode: '#D0C3B0' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Desert Dune', size: 'M', stock: 15 },
      { colorName: 'Desert Dune', size: 'L', stock: 20 }
    ],
    tags: ['Oversized', 'Hoodie', 'Heavyweight'],
    rating: 5.0,
    numReviews: 134
  },
  {
    name: 'Oversized Architectural Cargo Shorts',
    slug: 'oversized-architectural-cargo-shorts',
    category: 'Oversized',
    brand: 'VAVEVA',
    description: 'Relaxed fit wide cargo shorts with 3D flap pockets and sun-baked vintage finish.',
    materialDetails: '100% Cotton Ripstop',
    price: 1799,
    compareAtPrice: 2499,
    discountPercentage: 28,
    sku: 'VAV-OV-012',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
    colorVariants: [
      { colorName: 'Olive Drab', hexCode: '#5B624A' }
    ],
    inventory: [
      { colorName: 'Olive Drab', size: 'M', stock: 8 },
      { colorName: 'Olive Drab', size: 'L', stock: 12 }
    ],
    tags: ['Oversized', 'Cargo', 'Shorts'],
    rating: 4.7,
    numReviews: 31
  },

  // ==================== T-SHIRTS (10 Products) ====================
  {
    name: 'Essential Heavyweight Crew Neck Tee',
    slug: 'essential-heavyweight-crew-neck-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Tailored everyday classic crew neck tee cut from pre-shrunk 260 GSM organic cotton.',
    materialDetails: '100% Organic Cotton (260 GSM)',
    price: 1499,
    compareAtPrice: 1999,
    discountPercentage: 25,
    sku: 'VAV-TS-001',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/ajsqcnprdssxrhbczjzl.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg',
    colorVariants: [
      { colorName: 'Pristine White', hexCode: '#FFFFFF' },
      { colorName: 'Obsidian Black', hexCode: '#111111' },
      { colorName: 'Heather Grey', hexCode: '#D1D5DB' }
    ],
    inventory: [
      { colorName: 'Pristine White', size: 'S', stock: 15 },
      { colorName: 'Pristine White', size: 'M', stock: 25 },
      { colorName: 'Pristine White', size: 'L', stock: 20 },
      { colorName: 'Pristine White', size: 'XL', stock: 12 }
    ],
    tags: ['T-Shirt', 'Crew Neck', 'Essential'],
    isFeatured: true,
    rating: 4.9,
    numReviews: 168
  },
  {
    name: 'Premium Organic Slub Cotton Tee',
    slug: 'premium-organic-slub-cotton-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Textured organic slub cotton tee with subtle natural weave variation and breathable hand-feel.',
    materialDetails: '100% Organic Slub Cotton',
    price: 1599,
    compareAtPrice: 2199,
    discountPercentage: 27,
    sku: 'VAV-TS-002',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/szgycgyi8oxcvxcbsdlx.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600762/vaveva_products/wo9zsnmhuzzxnw0zt87h.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600762/vaveva_products/wo9zsnmhuzzxnw0zt87h.jpg',
    colorVariants: [
      { colorName: 'Black Ink', hexCode: '#1A1A1A' },
      { colorName: 'Cream', hexCode: '#F4F1EA' }
    ],
    inventory: [
      { colorName: 'Black Ink', size: 'M', stock: 18 },
      { colorName: 'Black Ink', size: 'L', stock: 14 }
    ],
    tags: ['T-Shirt', 'Slub Cotton'],
    rating: 4.8,
    numReviews: 87
  },
  {
    name: 'Vintage Wash Heavyweight Tee',
    slug: 'vintage-wash-heavyweight-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Sun-washed vintage finish with soft lived-in feel and tight crew collar.',
    materialDetails: '100% Heavyweight Cotton (280 GSM)',
    price: 1699,
    compareAtPrice: 2299,
    discountPercentage: 26,
    sku: 'VAV-TS-003',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600763/vaveva_products/kkunoosk0qhwuswkxbce.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600764/vaveva_products/elzpcioeuyhllwv0hg2f.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600764/vaveva_products/elzpcioeuyhllwv0hg2f.jpg',
    colorVariants: [
      { colorName: 'Faded Grey', hexCode: '#4A4E53' }
    ],
    inventory: [
      { colorName: 'Faded Grey', size: 'M', stock: 16 },
      { colorName: 'Faded Grey', size: 'L', stock: 10 }
    ],
    tags: ['T-Shirt', 'Vintage Wash'],
    rating: 4.7,
    numReviews: 62
  },
  {
    name: 'Minimal Crest Logo Tee',
    slug: 'minimal-crest-logo-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Clean luxury tee featuring discreet high-density VAVEVA monogram chest embroidery.',
    materialDetails: '100% Organic Combed Cotton',
    price: 1599,
    compareAtPrice: 2199,
    discountPercentage: 27,
    sku: 'VAV-TS-004',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
    colorVariants: [
      { colorName: 'Warm Taupe', hexCode: '#9C8F80' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Warm Taupe', size: 'M', stock: 20 },
      { colorName: 'Warm Taupe', size: 'L', stock: 12 }
    ],
    tags: ['T-Shirt', 'Minimal Logo'],
    rating: 4.9,
    numReviews: 104
  },
  {
    name: 'Raw Edge Heavyweight Pocket Tee',
    slug: 'raw-edge-heavyweight-pocket-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Single chest pocket tee with raw distressed seam detailing and relaxed fit.',
    materialDetails: '100% Organic Heavy Cotton',
    price: 1649,
    compareAtPrice: 2299,
    discountPercentage: 28,
    sku: 'VAV-TS-005',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600762/vaveva_products/wo9zsnmhuzzxnw0zt87h.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/szgycgyi8oxcvxcbsdlx.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/szgycgyi8oxcvxcbsdlx.jpg',
    colorVariants: [
      { colorName: 'Sage Green', hexCode: '#8A9A86' }
    ],
    inventory: [
      { colorName: 'Sage Green', size: 'M', stock: 14 },
      { colorName: 'Sage Green', size: 'L', stock: 8 }
    ],
    tags: ['T-Shirt', 'Pocket', 'Raw Edge'],
    rating: 4.6,
    numReviews: 41
  },
  {
    name: 'Tailored Relaxed Fit Tee',
    slug: 'tailored-relaxed-fit-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Precision cut relaxed fit tee designed for clean layering under tailored jackets and overshirts.',
    materialDetails: '100% Mercerized Egyptian Cotton',
    price: 1799,
    compareAtPrice: 2499,
    discountPercentage: 28,
    sku: 'VAV-TS-006',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600764/vaveva_products/elzpcioeuyhllwv0hg2f.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600763/vaveva_products/kkunoosk0qhwuswkxbce.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600763/vaveva_products/kkunoosk0qhwuswkxbce.jpg',
    colorVariants: [
      { colorName: 'Navy Blue', hexCode: '#1B2A47' },
      { colorName: 'Pristine White', hexCode: '#FFFFFF' }
    ],
    inventory: [
      { colorName: 'Navy Blue', size: 'M', stock: 15 },
      { colorName: 'Navy Blue', size: 'L', stock: 11 }
    ],
    tags: ['T-Shirt', 'Relaxed Fit', 'Mercerized'],
    rating: 4.8,
    numReviews: 73
  },
  {
    name: 'Heavyweight Mock Neck Tee',
    slug: 'heavyweight-mock-neck-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Elevated high mock collar tee in 290 GSM heavy cotton for an editorial architectural profile.',
    materialDetails: '100% Heavyweight Cotton (290 GSM)',
    price: 1899,
    compareAtPrice: 2599,
    discountPercentage: 27,
    sku: 'VAV-TS-007',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600754/vaveva_products/ukkhnvqcv3ctvoorybmk.jpg',
    colorVariants: [
      { colorName: 'Off-White', hexCode: '#F4F1EA' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Off-White', size: 'M', stock: 12 },
      { colorName: 'Off-White', size: 'L', stock: 16 }
    ],
    tags: ['T-Shirt', 'Mock Neck', 'Heavyweight'],
    rating: 4.9,
    numReviews: 89
  },
  {
    name: 'Washed Heavyweight Ribbed Collar Tee',
    slug: 'washed-heavyweight-ribbed-collar-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Thick 1.25 inch double-ribbed crew collar engineered to retain shape wash after wash.',
    materialDetails: '100% Heavy Organic Cotton',
    price: 1549,
    compareAtPrice: 2099,
    discountPercentage: 26,
    sku: 'VAV-TS-008',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/ajsqcnprdssxrhbczjzl.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/ajsqcnprdssxrhbczjzl.jpg',
    colorVariants: [
      { colorName: 'Clay Terracotta', hexCode: '#B85B35' }
    ],
    inventory: [
      { colorName: 'Clay Terracotta', size: 'M', stock: 10 },
      { colorName: 'Clay Terracotta', size: 'L', stock: 7 }
    ],
    tags: ['T-Shirt', 'Ribbed Collar'],
    rating: 4.7,
    numReviews: 35
  },
  {
    name: 'Statement Typography Graphic Tee',
    slug: 'statement-typography-graphic-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Luxury back typographic campaign print celebrating architectural minimalism.',
    materialDetails: '100% Organic Heavy Cotton',
    price: 1799,
    compareAtPrice: 2499,
    discountPercentage: 28,
    sku: 'VAV-TS-009',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600762/vaveva_products/wo9zsnmhuzzxnw0zt87h.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/szgycgyi8oxcvxcbsdlx.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/szgycgyi8oxcvxcbsdlx.jpg',
    colorVariants: [
      { colorName: 'Pure Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Pure Black', size: 'M', stock: 22 },
      { colorName: 'Pure Black', size: 'L', stock: 15 }
    ],
    tags: ['T-Shirt', 'Graphic', 'Typography'],
    rating: 4.8,
    numReviews: 96
  },
  {
    name: 'Luxury Compact Cotton Crew Tee',
    slug: 'luxury-compact-cotton-crew-tee',
    category: 'T-Shirts',
    brand: 'VAVEVA',
    description: 'Ultra-smooth long staple compact yarn providing zero pilling and silky structured feel.',
    materialDetails: '100% Long Staple Compact Cotton',
    price: 1699,
    compareAtPrice: 2299,
    discountPercentage: 26,
    sku: 'VAV-TS-010',
    images: [
    ],
    inventory: [
      { colorName: 'Oatmeal Beige', size: 'M', stock: 14 },
      { colorName: 'Oatmeal Beige', size: 'L', stock: 9 }
    ],
    tags: ['T-Shirt', 'Compact Cotton'],
    rating: 4.9,
    numReviews: 61
  },

  // ==================== SHIRTS (10 Products) ====================
  {
    name: 'European Pure Linen Resort Shirt',
    slug: 'european-pure-linen-resort-shirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Sun-bleached European flax linen resort shirt with camp collar and mother-of-pearl buttons.',
    materialDetails: '100% Pure European Linen',
    careInstructions: 'Machine wash cold on gentle cycle, hang dry.',
    price: 2499,
    compareAtPrice: 3499,
    discountPercentage: 28,
    sku: 'VAV-SH-001',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
    colorVariants: [
      { colorName: 'Sunbleached White', hexCode: '#F4F1EA' },
      { colorName: 'Sand Beige', hexCode: '#D8CEBE' }
    ],
    inventory: [
      { colorName: 'Sunbleached White', size: 'S', stock: 8 },
      { colorName: 'Sunbleached White', size: 'M', stock: 18 },
      { colorName: 'Sunbleached White', size: 'L', stock: 14 },
      { colorName: 'Sunbleached White', size: 'XL', stock: 6 }
    ],
    tags: ['Shirt', 'Linen', 'Resort'],
    isFeatured: true,
    rating: 4.9,
    numReviews: 142
  },
  {
    name: 'Heavyweight Cotton Twill Overshirt',
    slug: 'heavyweight-cotton-twill-overshirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Structured 380 GSM cotton twill overshirt with dual flap chest pockets and horn button closures.',
    materialDetails: '100% Heavy Cotton Twill (380 GSM)',
    price: 2999,
    compareAtPrice: 3999,
    discountPercentage: 25,
    sku: 'VAV-SH-002',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
    colorVariants: [
      { colorName: 'Espresso Brown', hexCode: '#3C2A21' },
      { colorName: 'Military Olive', hexCode: '#4B5320' }
    ],
    inventory: [
      { colorName: 'Espresso Brown', size: 'M', stock: 16 },
      { colorName: 'Espresso Brown', size: 'L', stock: 12 }
    ],
    tags: ['Shirt', 'Overshirt', 'Twill'],
    isTrending: true,
    rating: 4.9,
    numReviews: 108
  },
  {
    name: 'Relaxed Cuban Collar Camp Shirt',
    slug: 'relaxed-cuban-collar-camp-shirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Flowy open Cuban collar shirt in garment-dyed cotton-linen blend for relaxed warm days.',
    materialDetails: '55% Linen, 45% Cotton',
    price: 2299,
    compareAtPrice: 2999,
    discountPercentage: 23,
    sku: 'VAV-SH-003',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg',
    colorVariants: [
      { colorName: 'Sand Beige', hexCode: '#D8CEBE' }
    ],
    inventory: [
      { colorName: 'Sand Beige', size: 'M', stock: 14 },
      { colorName: 'Sand Beige', size: 'L', stock: 10 }
    ],
    tags: ['Shirt', 'Cuban Collar', 'Camp'],
    rating: 4.8,
    numReviews: 76
  },
  {
    name: 'Premium Tailored Oxford Cotton Shirt',
    slug: 'premium-tailored-oxford-cotton-shirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Heavyweight basket-weave Oxford cotton shirt with button-down collar and curved hem.',
    materialDetails: '100% Heavy Oxford Cotton',
    price: 2399,
    compareAtPrice: 3199,
    discountPercentage: 25,
    sku: 'VAV-SH-004',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
    colorVariants: [
      { colorName: 'Classic Light Blue', hexCode: '#A4C3D2' },
      { colorName: 'White', hexCode: '#FFFFFF' }
    ],
    inventory: [
      { colorName: 'Classic Light Blue', size: 'M', stock: 20 },
      { colorName: 'Classic Light Blue', size: 'L', stock: 15 }
    ],
    tags: ['Shirt', 'Oxford', 'Tailored'],
    rating: 4.9,
    numReviews: 92
  },
  {
    name: 'Brushed Flannel Check Overshirt',
    slug: 'brushed-flannel-check-overshirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Ultra-soft double brushed cotton flannel in subtle muted earth check palette for effortless layering.',
    materialDetails: '100% Brushed Cotton Flannel',
    price: 2799,
    compareAtPrice: 3699,
    discountPercentage: 24,
    sku: 'VAV-SH-005',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
    colorVariants: [
      { colorName: 'Dark Charcoal & Olive', hexCode: '#3A3F37' }
    ],
    inventory: [
      { colorName: 'Dark Charcoal & Olive', size: 'M', stock: 12 },
      { colorName: 'Dark Charcoal & Olive', size: 'L', stock: 8 }
    ],
    tags: ['Shirt', 'Flannel', 'Overshirt'],
    rating: 4.7,
    numReviews: 58
  },
  {
    name: 'Sun-Washed Oxford Cotton Button-Down',
    slug: 'sun-washed-oxford-cotton-button-down',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Pre-washed Oxford shirt with relaxed roll collar and box pleat back for maximum mobility.',
    materialDetails: '100% Organic Oxford Cotton',
    price: 2299,
    compareAtPrice: 2999,
    discountPercentage: 23,
    sku: 'VAV-SH-006',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg',
    colorVariants: [
      { colorName: 'Crisp White', hexCode: '#FFFFFF' }
    ],
    inventory: [
      { colorName: 'Crisp White', size: 'M', stock: 22 },
      { colorName: 'Crisp White', size: 'L', stock: 16 }
    ],
    tags: ['Shirt', 'Oxford', 'Button-Down'],
    rating: 4.8,
    numReviews: 81
  },
  {
    name: 'Silk-Linen Blend Resort Shirt',
    slug: 'silk-linen-blend-resort-shirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Sumptuous silk-linen weave providing a subtle sheen and airy drape for luxury evening resorts.',
    materialDetails: '70% European Linen, 30% Mulberry Silk',
    price: 3299,
    compareAtPrice: 4499,
    discountPercentage: 26,
    sku: 'VAV-SH-007',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
    colorVariants: [
      { colorName: 'Oat Tan', hexCode: '#D2C3AA' }
    ],
    inventory: [
      { colorName: 'Oat Tan', size: 'M', stock: 9 },
      { colorName: 'Oat Tan', size: 'L', stock: 6 }
    ],
    tags: ['Shirt', 'Silk', 'Linen', 'Resort'],
    rating: 5.0,
    numReviews: 49
  },
  {
    name: 'Utility Multi-Pocket Workwear Shirt',
    slug: 'utility-multi-pocket-workwear-shirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Rugged workwear shirt featuring triple needle stitching and concealed utility zip compartment.',
    materialDetails: '100% Heavy Canvas Cotton',
    price: 2899,
    compareAtPrice: 3799,
    discountPercentage: 23,
    sku: 'VAV-SH-008',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
    colorVariants: [
      { colorName: 'Military Green', hexCode: '#4B5320' }
    ],
    inventory: [
      { colorName: 'Military Green', size: 'M', stock: 11 },
      { colorName: 'Military Green', size: 'L', stock: 8 }
    ],
    tags: ['Shirt', 'Utility', 'Workwear'],
    rating: 4.7,
    numReviews: 39
  },
  {
    name: 'Structured Heavy Linen Overshirt',
    slug: 'structured-heavy-linen-overshirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'High-density heavy linen jacket-shirt with horn button closure and side welt pockets.',
    materialDetails: '100% Heavy European Linen (320 GSM)',
    price: 3099,
    compareAtPrice: 4199,
    discountPercentage: 26,
    sku: 'VAV-SH-009',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600757/vaveva_products/rnsqxf7eitc1ziitxh6t.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
    colorVariants: [
      { colorName: 'Black Obsidian', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Black Obsidian', size: 'M', stock: 14 },
      { colorName: 'Black Obsidian', size: 'L', stock: 10 }
    ],
    tags: ['Shirt', 'Linen', 'Overshirt'],
    rating: 4.9,
    numReviews: 67
  },
  {
    name: 'Minimalist Mandarin Collar Linen Shirt',
    slug: 'minimalist-mandarin-collar-linen-shirt',
    category: 'Shirts',
    brand: 'VAVEVA',
    description: 'Sleek band collar shirt in soft washed organic linen with clean French placket.',
    materialDetails: '100% Washed Organic Linen',
    price: 2399,
    compareAtPrice: 3099,
    discountPercentage: 22,
    sku: 'VAV-SH-010',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/tfuow92dzj6fejxjaeh5.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600765/vaveva_products/qtvdlgekxgqojg9blcg4.jpg',
    colorVariants: [
      { colorName: 'Cream Neutral', hexCode: '#FAF6F0' }
    ],
    inventory: [
      { colorName: 'Cream Neutral', size: 'M', stock: 16 },
      { colorName: 'Cream Neutral', size: 'L', stock: 12 }
    ],
    tags: ['Shirt', 'Mandarin Collar', 'Linen'],
    rating: 4.8,
    numReviews: 53
  },

  // ==================== PANTS (10 Products) ====================
  {
    name: 'Architectural Deep Pleated Trousers',
    slug: 'architectural-deep-pleated-trousers',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Sculpted wide-leg trousers featuring deep double front pleats and extended tab closure.',
    materialDetails: '65% Fine Wool, 35% Organic Cotton',
    careInstructions: 'Dry clean only.',
    price: 2799,
    compareAtPrice: 3799,
    discountPercentage: 26,
    sku: 'VAV-PT-001',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
    colorVariants: [
      { colorName: 'Stone Beige', hexCode: '#C8BEAE' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Stone Beige', size: '30', stock: 8 },
      { colorName: 'Stone Beige', size: '32', stock: 18 },
      { colorName: 'Stone Beige', size: '34', stock: 12 },
      { colorName: 'Stone Beige', size: '36', stock: 6 }
    ],
    tags: ['Pants', 'Pleated', 'Trousers'],
    isFeatured: true,
    rating: 4.9,
    numReviews: 124
  },
  {
    name: 'Baggy 14oz Vintage Denim Jeans',
    slug: 'baggy-14oz-vintage-denim-jeans',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Heavyweight ring-spun 14oz rigid denim washed to an authentic vintage indigo patina with wide leg drape.',
    materialDetails: '100% Cotton 14 oz Rigid Denim',
    price: 2499,
    compareAtPrice: 3499,
    discountPercentage: 28,
    sku: 'VAV-PT-002',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
    colorVariants: [
      { colorName: 'Washed Indigo', hexCode: '#3E5C76' }
    ],
    inventory: [
      { colorName: 'Washed Indigo', size: '30', stock: 10 },
      { colorName: 'Washed Indigo', size: '32', stock: 20 },
      { colorName: 'Washed Indigo', size: '34', stock: 14 }
    ],
    tags: ['Pants', 'Denim', 'Baggy'],
    isTrending: true,
    rating: 4.9,
    numReviews: 156
  },
  {
    name: 'Utility Multi-Pocket Cargo Pants',
    slug: 'utility-multi-pocket-cargo-pants',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Structured 3D cargo trousers with magnetic pocket flaps and articulated knee darts.',
    materialDetails: '100% Heavy Cotton Ripstop',
    price: 2699,
    compareAtPrice: 3599,
    discountPercentage: 25,
    sku: 'VAV-PT-003',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
    colorVariants: [
      { colorName: 'Dark Olive', hexCode: '#3D432D' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Dark Olive', size: '32', stock: 16 },
      { colorName: 'Dark Olive', size: '34', stock: 10 }
    ],
    tags: ['Pants', 'Cargo', 'Utility'],
    rating: 4.8,
    numReviews: 88
  },
  {
    name: 'Straight Leg Tailored Wool Trousers',
    slug: 'straight-leg-tailored-wool-trousers',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Refined straight-fit dress pants woven from fine tropical wool blend with clean press crease.',
    materialDetails: '70% Wool, 30% Polyester',
    price: 2899,
    compareAtPrice: 3899,
    discountPercentage: 25,
    sku: 'VAV-PT-004',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg',
    colorVariants: [
      { colorName: 'Charcoal Black', hexCode: '#1C1C1C' }
    ],
    inventory: [
      { colorName: 'Charcoal Black', size: '32', stock: 12 },
      { colorName: 'Charcoal Black', size: '34', stock: 8 }
    ],
    tags: ['Pants', 'Tailored', 'Wool'],
    rating: 4.9,
    numReviews: 64
  },
  {
    name: 'Relaxed Wide Leg Linen Trousers',
    slug: 'relaxed-wide-leg-linen-trousers',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Airy pure linen pants featuring an elasticized waistband and internal drawstring.',
    materialDetails: '100% Pure European Linen',
    price: 2399,
    compareAtPrice: 3199,
    discountPercentage: 25,
    sku: 'VAV-PT-005',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
    colorVariants: [
      { colorName: 'Off-White Cream', hexCode: '#F4F1EA' }
    ],
    inventory: [
      { colorName: 'Off-White Cream', size: '30', stock: 6 },
      { colorName: 'Off-White Cream', size: '32', stock: 15 },
      { colorName: 'Off-White Cream', size: '34', stock: 10 }
    ],
    tags: ['Pants', 'Linen', 'Wide Leg'],
    rating: 4.8,
    numReviews: 79
  },
  {
    name: 'Heavyweight Cotton Canvas Utility Pants',
    slug: 'heavyweight-cotton-canvas-utility-pants',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Durable 12oz duck canvas trousers with double knee panel reinforcement.',
    materialDetails: '100% Cotton Duck Canvas',
    price: 2599,
    compareAtPrice: 3499,
    discountPercentage: 25,
    sku: 'VAV-PT-006',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
    colorVariants: [
      { colorName: 'Caramel Tan', hexCode: '#A8763E' }
    ],
    inventory: [
      { colorName: 'Caramel Tan', size: '32', stock: 14 },
      { colorName: 'Caramel Tan', size: '34', stock: 9 }
    ],
    tags: ['Pants', 'Canvas', 'Utility'],
    rating: 4.7,
    numReviews: 51
  },
  {
    name: 'Pleated Tapered Chino Trousers',
    slug: 'pleated-tapered-chino-trousers',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Single-pleated chino trousers with subtle taper below knee and coin welt pocket.',
    materialDetails: '98% Organic Cotton, 2% Elastane',
    price: 2299,
    compareAtPrice: 2999,
    discountPercentage: 23,
    sku: 'VAV-PT-007',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg',
    colorVariants: [
      { colorName: 'Navy Obsidian', hexCode: '#1B2A47' }
    ],
    inventory: [
      { colorName: 'Navy Obsidian', size: '32', stock: 18 },
      { colorName: 'Navy Obsidian', size: '34', stock: 11 }
    ],
    tags: ['Pants', 'Chino', 'Pleated'],
    rating: 4.8,
    numReviews: 67
  },
  {
    name: 'Minimalist Drawstring Relaxed Pants',
    slug: 'minimalist-drawstring-relaxed-pants',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Slub cotton-linen pull-on pants with clean straight leg silhouette.',
    materialDetails: '60% Cotton, 40% Linen',
    price: 2199,
    compareAtPrice: 2899,
    discountPercentage: 24,
    sku: 'VAV-PT-008',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
    colorVariants: [
      { colorName: 'Taupe Grey', hexCode: '#8E857B' }
    ],
    inventory: [
      { colorName: 'Taupe Grey', size: '32', stock: 15 },
      { colorName: 'Taupe Grey', size: '34', stock: 10 }
    ],
    tags: ['Pants', 'Drawstring', 'Relaxed'],
    rating: 4.7,
    numReviews: 42
  },
  {
    name: 'Carpenter Wide Leg Denim Trousers',
    slug: 'carpenter-wide-leg-denim-trousers',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Raw indigo carpenter jeans with tool loop, hammer pocket, and tonal contrast stitching.',
    materialDetails: '100% Cotton 13.5 oz Denim',
    price: 2599,
    compareAtPrice: 3499,
    discountPercentage: 25,
    sku: 'VAV-PT-009',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/bowyqkrcf709mkzxqcge.jpg',
    colorVariants: [
      { colorName: 'Raw Blue Denim', hexCode: '#1E3A5F' }
    ],
    inventory: [
      { colorName: 'Raw Blue Denim', size: '32', stock: 16 },
      { colorName: 'Raw Blue Denim', size: '34', stock: 12 }
    ],
    tags: ['Pants', 'Carpenter', 'Denim'],
    rating: 4.9,
    numReviews: 91
  },
  {
    name: 'Sculpted Cargo Pleated Pants',
    slug: 'sculpted-cargo-pleated-pants',
    category: 'Pants',
    brand: 'VAVEVA',
    description: 'Double front pleats combined with clean hidden zip cargo side pockets.',
    materialDetails: '100% Cotton Twill',
    price: 2699,
    compareAtPrice: 3599,
    discountPercentage: 25,
    sku: 'VAV-PT-010',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600758/vaveva_products/uvz02xnb2qqfcxblz2fo.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600766/vaveva_products/bs2cszbeskfsbuvgyvdk.jpg',
    colorVariants: [
      { colorName: 'Smoky Slate', hexCode: '#4E545C' }
    ],
    inventory: [
      { colorName: 'Smoky Slate', size: '32', stock: 10 },
      { colorName: 'Smoky Slate', size: '34', stock: 8 }
    ],
    tags: ['Pants', 'Cargo', 'Pleated'],
    rating: 4.8,
    numReviews: 57
  },

  // ==================== HOODIES (8 Products - All 100% Male Models Wearing Hoodies) ====================
  {
    name: 'Heavyweight 480 GSM French Terry Hoodie',
    slug: 'heavyweight-480-gsm-french-terry-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Plush 480 GSM organic cotton French Terry fleece hoodie with double layer structured hood.',
    materialDetails: '100% Organic Cotton French Terry Fleece (480 GSM)',
    careInstructions: 'Wash inside out cold, tumble dry low or lay flat.',
    price: 2999,
    compareAtPrice: 3999,
    discountPercentage: 25,
    sku: 'VAV-HD-001',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600760/vaveva_products/sbp7v7netv3fqaackv9t.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600760/vaveva_products/sbp7v7netv3fqaackv9t.jpg',
    colorVariants: [
      { colorName: 'Obsidian Black', hexCode: '#111111' },
      { colorName: 'Washed Cream', hexCode: '#F4F1EA' },
      { colorName: 'Espresso Brown', hexCode: '#3C2A21' }
    ],
    inventory: [
      { colorName: 'Obsidian Black', size: 'S', stock: 12 },
      { colorName: 'Obsidian Black', size: 'M', stock: 24 },
      { colorName: 'Obsidian Black', size: 'L', stock: 18 },
      { colorName: 'Obsidian Black', size: 'XL', stock: 10 }
    ],
    tags: ['Hoodie', 'Heavyweight', 'Fleece'],
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    numReviews: 184
  },
  {
    name: 'Double-Lined Minimal Zip Hoodie',
    slug: 'double-lined-minimal-zip-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Full-zip hoodie featuring custom gunmetal hardware and clean rib cuffs.',
    materialDetails: '100% Organic Heavy Cotton Fleece (450 GSM)',
    price: 3199,
    compareAtPrice: 4299,
    discountPercentage: 26,
    sku: 'VAV-HD-002',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600767/vaveva_products/egjfzhtw2ashwcwngtyn.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600767/vaveva_products/egjfzhtw2ashwcwngtyn.jpg',
    colorVariants: [
      { colorName: 'Espresso Brown', hexCode: '#3C2A21' }
    ],
    inventory: [
      { colorName: 'Espresso Brown', size: 'M', stock: 15 },
      { colorName: 'Espresso Brown', size: 'L', stock: 12 }
    ],
    tags: ['Hoodie', 'Zip Hoodie'],
    rating: 4.9,
    numReviews: 110
  },
  {
    name: 'Signature Drop-Shoulder Oversized Hoodie',
    slug: 'signature-drop-shoulder-oversized-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Relaxed drop-shoulder hoodie without drawstrings for a sleek minimalist silhouette.',
    materialDetails: '100% Heavy Organic Cotton (460 GSM)',
    price: 2899,
    compareAtPrice: 3799,
    discountPercentage: 24,
    sku: 'VAV-HD-003',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600768/vaveva_products/nouchorjyw1gw91nva5z.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg',
    colorVariants: [
      { colorName: 'Washed Cream', hexCode: '#F4F1EA' }
    ],
    inventory: [
      { colorName: 'Washed Cream', size: 'M', stock: 18 },
      { colorName: 'Washed Cream', size: 'L', stock: 14 }
    ],
    tags: ['Hoodie', 'Oversized'],
    rating: 4.8,
    numReviews: 92
  },
  {
    name: 'Raw Edge Luxury Fleece Hoodie',
    slug: 'raw-edge-luxury-fleece-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Distressed raw edge hems with custom pigment dye wash and kangaroo pouch.',
    materialDetails: '100% Heavy Cotton Fleece',
    price: 2799,
    compareAtPrice: 3699,
    discountPercentage: 24,
    sku: 'VAV-HD-004',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600760/vaveva_products/sbp7v7netv3fqaackv9t.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg',
    colorVariants: [
      { colorName: 'Slate Grey', hexCode: '#5A636A' }
    ],
    inventory: [
      { colorName: 'Slate Grey', size: 'M', stock: 12 },
      { colorName: 'Slate Grey', size: 'L', stock: 8 }
    ],
    tags: ['Hoodie', 'Raw Edge'],
    rating: 4.7,
    numReviews: 64
  },
  {
    name: 'Sun-Bleached Heavyweight Hoodie',
    slug: 'sun-bleached-heavyweight-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Vintage sun-bake wash fleece pullover with heavy ribbed side gusset panels.',
    materialDetails: '100% Cotton Fleece (460 GSM)',
    price: 2899,
    compareAtPrice: 3799,
    discountPercentage: 24,
    sku: 'VAV-HD-005',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600768/vaveva_products/v0io4tu7olskcywbqnsd.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600767/vaveva_products/egjfzhtw2ashwcwngtyn.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600767/vaveva_products/egjfzhtw2ashwcwngtyn.jpg',
    colorVariants: [
      { colorName: 'Dusty Sage', hexCode: '#879788' }
    ],
    inventory: [
      { colorName: 'Dusty Sage', size: 'M', stock: 14 },
      { colorName: 'Dusty Sage', size: 'L', stock: 10 }
    ],
    tags: ['Hoodie', 'Sun-Bleached'],
    rating: 4.9,
    numReviews: 78
  },
  {
    name: 'Thermal Lined Heavyweight Pullover',
    slug: 'thermal-lined-heavyweight-pullover',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Internal waffle thermal lining providing supreme warmth during cold winter nights.',
    materialDetails: 'Outer: 100% Cotton, Lining: 100% Waffle Thermal',
    price: 3299,
    compareAtPrice: 4499,
    discountPercentage: 26,
    sku: 'VAV-HD-006',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600767/vaveva_products/egjfzhtw2ashwcwngtyn.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg',
    colorVariants: [
      { colorName: 'Mocha Tan', hexCode: '#9E836A' }
    ],
    inventory: [
      { colorName: 'Mocha Tan', size: 'M', stock: 10 },
      { colorName: 'Mocha Tan', size: 'L', stock: 7 }
    ],
    tags: ['Hoodie', 'Thermal'],
    rating: 4.8,
    numReviews: 45
  },
  {
    name: 'Minimalist French Terry Zip Hoodie',
    slug: 'minimalist-french-terry-zip-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Clean front 2-way RiRi zip hoodie with subtle welt pockets.',
    materialDetails: '100% French Terry Cotton',
    price: 2999,
    compareAtPrice: 3999,
    discountPercentage: 25,
    sku: 'VAV-HD-007',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600769/vaveva_products/rnvjhyyffjrb3camki22.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600761/vaveva_products/sdzpgjgwvzbtn4e5t8z5.jpg',
    colorVariants: [
      { colorName: 'Midnight Navy', hexCode: '#151D2A' }
    ],
    inventory: [
      { colorName: 'Midnight Navy', size: 'M', stock: 16 },
      { colorName: 'Midnight Navy', size: 'L', stock: 12 }
    ],
    tags: ['Hoodie', 'Zip Hoodie', 'French Terry'],
    rating: 4.9,
    numReviews: 83
  },
  {
    name: 'Heavyweight Fleece Essential Hoodie',
    slug: 'heavyweight-fleece-essential-hoodie',
    category: 'Hoodies',
    brand: 'VAVEVA',
    description: 'Clean essential hoodie in neutral ivory shade with thick double rib waistband.',
    materialDetails: '100% Organic Heavy Cotton Fleece',
    price: 2699,
    compareAtPrice: 3599,
    discountPercentage: 25,
    sku: 'VAV-HD-008',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600759/vaveva_products/whgicsdwgnsjzhvzz6cd.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600768/vaveva_products/nouchorjyw1gw91nva5z.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600768/vaveva_products/nouchorjyw1gw91nva5z.jpg',
    colorVariants: [
      { colorName: 'Off-White Neutral', hexCode: '#FAF6F0' }
    ],
    inventory: [
      { colorName: 'Off-White Neutral', size: 'M', stock: 20 },
      { colorName: 'Off-White Neutral', size: 'L', stock: 15 }
    ],
    tags: ['Hoodie', 'Essential'],
    rating: 4.8,
    numReviews: 97
  },

  // ==================== ACCESSORIES (10 Products) ====================
  {
    name: 'Heavyweight Organic Cotton Cap',
    slug: 'heavyweight-organic-cotton-cap',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Unstructured 6-panel baseball cap in sun-washed 100% organic cotton twill with brass buckle strap.',
    materialDetails: '100% Organic Cotton Twill',
    price: 999,
    compareAtPrice: 1499,
    discountPercentage: 33,
    sku: 'VAV-AC-001',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
    colorVariants: [
      { colorName: 'Washed Black', hexCode: '#222222' },
      { colorName: 'Beige', hexCode: '#E5DFD3' }
    ],
    inventory: [
      { colorName: 'Washed Black', size: 'ONE SIZE', stock: 30 }
    ],
    tags: ['Cap', 'Accessories'],
    isFeatured: true,
    rating: 4.9,
    numReviews: 142
  },
  {
    name: 'Ribbed Cashmere-Wool Blend Beanie',
    slug: 'ribbed-cashmere-wool-blend-beanie',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Ultra-soft fine gauge rib beanie spun from Mongolian cashmere and Merino wool.',
    materialDetails: '70% Merino Wool, 30% Cashmere',
    price: 1299,
    compareAtPrice: 1799,
    discountPercentage: 27,
    sku: 'VAV-AC-002',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Oatmeal Cream', hexCode: '#E4DAC7' }
    ],
    inventory: [
      { colorName: 'Oatmeal Cream', size: 'ONE SIZE', stock: 25 }
    ],
    tags: ['Beanie', 'Cashmere', 'Accessories'],
    rating: 4.9,
    numReviews: 98
  },
  {
    name: 'Handcrafted Full-Grain Leather Belt',
    slug: 'handcrafted-full-grain-leather-belt',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: '35mm vegetable-tanned full grain Italian leather belt with solid brushed metal buckle.',
    materialDetails: '100% Full-Grain Italian Leather',
    price: 1899,
    compareAtPrice: 2499,
    discountPercentage: 24,
    sku: 'VAV-AC-003',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600770/vaveva_products/vulhpsrzmzcqskgzraqz.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Dark Espresso', hexCode: '#3C2A21' }
    ],
    inventory: [
      { colorName: 'Dark Espresso', size: '32', stock: 15 },
      { colorName: 'Dark Espresso', size: '34', stock: 12 }
    ],
    tags: ['Belt', 'Leather', 'Accessories'],
    rating: 4.8,
    numReviews: 86
  },
  {
    name: 'Heavyweight Cushioned Ribbed Socks 3-Pack',
    slug: 'heavyweight-cushioned-ribbed-socks-3-pack',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Thick combed organic cotton ribbed crew socks with padded footbed for daily comfort.',
    materialDetails: '85% Organic Cotton, 13% Nylon, 2% Elastane',
    price: 799,
    compareAtPrice: 1199,
    discountPercentage: 33,
    sku: 'VAV-AC-004',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
    colorVariants: [
      { colorName: 'Neutral Earth Tones', hexCode: '#C8BEAE' }
    ],
    inventory: [
      { colorName: 'Neutral Earth Tones', size: 'ONE SIZE', stock: 40 }
    ],
    tags: ['Socks', 'Accessories'],
    rating: 4.9,
    numReviews: 114
  },
  {
    name: 'Minimalist Leather Crossbody Bag',
    slug: 'minimalist-leather-crossbody-bag',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Sleek structured full-grain leather pouch with adjustable strap and YKK metal zipper.',
    materialDetails: '100% Full-Grain Cowhide Leather',
    price: 3499,
    compareAtPrice: 4999,
    discountPercentage: 30,
    sku: 'VAV-AC-005',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600771/vaveva_products/pdjdak38nxvukmlutg3z.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Obsidian Black', size: 'ONE SIZE', stock: 15 }
    ],
    tags: ['Bag', 'Crossbody', 'Leather', 'Accessories'],
    isFeatured: true,
    rating: 5.0,
    numReviews: 72
  },
  {
    name: 'Full-Grain Bifold Leather Wallet',
    slug: 'full-grain-bifold-leather-wallet',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Compact slim bifold wallet holding 8 cards plus cash in vegetable tanned leather.',
    materialDetails: '100% Italian Full-Grain Leather',
    price: 1499,
    compareAtPrice: 1999,
    discountPercentage: 25,
    sku: 'VAV-AC-006',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600770/vaveva_products/vulhpsrzmzcqskgzraqz.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600771/vaveva_products/pdjdak38nxvukmlutg3z.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600771/vaveva_products/pdjdak38nxvukmlutg3z.jpg',
    colorVariants: [
      { colorName: 'Tan Brown', hexCode: '#A8763E' }
    ],
    inventory: [
      { colorName: 'Tan Brown', size: 'ONE SIZE', stock: 20 }
    ],
    tags: ['Wallet', 'Leather', 'Accessories'],
    rating: 4.8,
    numReviews: 61
  },
  {
    name: 'Matte Stainless Steel Minimal Bracelet',
    slug: 'matte-stainless-steel-minimal-bracelet',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Subtle brushed surgical grade 316L stainless steel cuff bracelet with engraved logo.',
    materialDetails: '316L Stainless Steel',
    price: 1199,
    compareAtPrice: 1699,
    discountPercentage: 29,
    sku: 'VAV-AC-007',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Silver Chrome', hexCode: '#C0C0C0' }
    ],
    inventory: [
      { colorName: 'Silver Chrome', size: 'ONE SIZE', stock: 18 }
    ],
    tags: ['Bracelet', 'Jewelry', 'Accessories'],
    rating: 4.9,
    numReviews: 53
  },
  {
    name: 'Structured Canvas Tote Bag',
    slug: 'structured-canvas-tote-bag',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Heavy 16oz cotton duck canvas carryall tote with inner zip security pocket.',
    materialDetails: '100% Heavy Cotton Canvas (16 oz)',
    price: 1999,
    compareAtPrice: 2699,
    discountPercentage: 26,
    sku: 'VAV-AC-008',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600771/vaveva_products/pdjdak38nxvukmlutg3z.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Ecru & Black', hexCode: '#F4F1EA' }
    ],
    inventory: [
      { colorName: 'Ecru & Black', size: 'ONE SIZE', stock: 14 }
    ],
    tags: ['Tote Bag', 'Canvas', 'Accessories'],
    rating: 4.8,
    numReviews: 47
  },
  {
    name: 'Acetate Sunglasses with Tinted Lenses',
    slug: 'acetate-sunglasses-with-tinted-lenses',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Handcrafted Italian acetate frames featuring 100% UV400 protection category 3 lenses.',
    materialDetails: 'Italian Mazzucchelli Acetate',
    price: 2499,
    compareAtPrice: 3499,
    discountPercentage: 28,
    sku: 'VAV-AC-009',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600756/vaveva_products/ituoepzja9hfapmswmgh.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Tortoiseshell Brown', hexCode: '#5C3826' },
      { colorName: 'Obsidian Black', hexCode: '#111111' }
    ],
    inventory: [
      { colorName: 'Tortoiseshell Brown', size: 'ONE SIZE', stock: 16 }
    ],
    tags: ['Eyewear', 'Sunglasses', 'Accessories'],
    rating: 5.0,
    numReviews: 89
  },
  {
    name: 'Braided Italian Leather Belt',
    slug: 'braided-italian-leather-belt',
    category: 'Accessories',
    brand: 'VAVEVA',
    description: 'Woven braided full-grain leather belt providing adjustable custom fit without fixed belt holes.',
    materialDetails: '100% Braided Italian Cowhide Leather',
    price: 1799,
    compareAtPrice: 2399,
    discountPercentage: 25,
    sku: 'VAV-AC-010',
    images: [
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600770/vaveva_products/vulhpsrzmzcqskgzraqz.jpg',
      'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg'
    ],
    hoverImage: 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600755/vaveva_products/t83nlmvhwdrxtea6yoyu.jpg',
    colorVariants: [
      { colorName: 'Cognac Tan', hexCode: '#9C5B23' }
    ],
    inventory: [
      { colorName: 'Cognac Tan', size: '32', stock: 10 },
      { colorName: 'Cognac Tan', size: '34', stock: 8 }
    ],
    tags: ['Belt', 'Braided Leather', 'Accessories'],
    rating: 4.8,
    numReviews: 38
  }
];

const couponsData = [
  { code: 'VAVEVA15', discountType: 'percentage', discountValue: 15, minPurchase: 1499, expiryDate: new Date('2027-12-31'), isActive: true },
  { code: 'WELCOME500', discountType: 'fixed', discountValue: 500, minPurchase: 2000, expiryDate: new Date('2027-12-31'), isActive: true }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vaveva_db';
    await mongoose.connect(mongoUri);
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Coupon.deleteMany();
    await Order.deleteMany();

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@vaveva.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    await User.create({
      name: 'VAVEVA Executive Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    await User.create({
      name: 'Arjun Kumar',
      email: 'customer@vaveva.com',
      password: 'password123',
      role: 'customer'
    });

    await Category.insertMany(categoriesData);
    const createdProducts = await Product.insertMany(productsData);
    await Coupon.insertMany(couponsData);

    const customerUser = await User.findOne({ email: 'customer@vaveva.com' });

    if (customerUser && createdProducts.length >= 3) {
      const ordersData = [
        {
          orderId: 'VAV-89201',
          user: customerUser._id,
          orderItems: [
            {
              product: createdProducts[0]._id,
              name: createdProducts[0].name,
              image: createdProducts[0].images[0] || 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600773/vaveva_products/qa4soc3oh3fapdsa6xtx.jpg',
              price: createdProducts[0].price,
              color: 'Obsidian Black',
              size: 'L',
              quantity: 2,
              subtotal: createdProducts[0].price * 2
            }
          ],
          shippingAddress: {
            fullName: 'Arjun Kumar',
            phone: '+91 99887 76655',
            street: '42 MG Road, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            zipCode: '560038',
            country: 'India'
          },
          paymentMethod: 'Razorpay',
          paymentResult: { id: 'pay_Lx902341829', status: 'captured' },
          isPaid: true,
          paidAt: new Date(Date.now() - 86400000 * 5),
          itemsPrice: createdProducts[0].price * 2,
          shippingPrice: 0,
          taxPrice: 0,
          discountPrice: 0,
          totalPrice: createdProducts[0].price * 2,
          orderStatus: 'Delivered',
          courier: 'FedEx Air Express',
          trackingNumber: 'FX-98214981-IN',
          estimatedDelivery: 'Delivered on May 12'
        },
        {
          orderId: 'VAV-89202',
          user: customerUser._id,
          orderItems: [
            {
              product: createdProducts[1]._id,
              name: createdProducts[1].name,
              image: createdProducts[1].images[0] || 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600774/vaveva_products/tvdmkb6tnocobmb3l6dx.jpg',
              price: createdProducts[1].price,
              color: 'Washed Charcoal',
              size: 'M',
              quantity: 1,
              subtotal: createdProducts[1].price
            }
          ],
          shippingAddress: {
            fullName: 'Arjun Kumar',
            phone: '+91 99887 76655',
            street: '42 MG Road, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            zipCode: '560038',
            country: 'India'
          },
          paymentMethod: 'Razorpay',
          isPaid: true,
          paidAt: new Date(Date.now() - 86400000 * 2),
          itemsPrice: createdProducts[1].price,
          shippingPrice: 0,
          taxPrice: 0,
          discountPrice: 0,
          totalPrice: createdProducts[1].price,
          orderStatus: 'Shipped',
          courier: 'BlueDart Express',
          trackingNumber: 'BD-77621092',
          estimatedDelivery: 'Estimated by Tomorrow'
        },
        {
          orderId: 'VAV-89203',
          user: customerUser._id,
          orderItems: [
            {
              product: createdProducts[2]._id,
              name: createdProducts[2].name,
              image: createdProducts[2].images[0] || 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600775/vaveva_products/j5gkpzopojjo6esrkuj9.jpg',
              price: createdProducts[2].price,
              color: 'Warm Sand',
              size: 'M',
              quantity: 1,
              subtotal: createdProducts[2].price
            }
          ],
          shippingAddress: {
            fullName: 'Arjun Kumar',
            phone: '+91 99887 76655',
            street: '42 MG Road, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            zipCode: '560038',
            country: 'India'
          },
          paymentMethod: 'Cash On Delivery',
          isPaid: false,
          itemsPrice: createdProducts[2].price,
          shippingPrice: 0,
          taxPrice: 0,
          discountPrice: 0,
          totalPrice: createdProducts[2].price,
          orderStatus: 'Confirmed',
          courier: 'Delhivery Express',
          trackingNumber: 'DL-5541092',
          estimatedDelivery: '3 - 5 Business Days'
        },
        {
          orderId: 'VAV-89204',
          user: customerUser._id,
          orderItems: [
            {
              product: createdProducts[3]._id,
              name: createdProducts[3].name,
              image: createdProducts[3].images[0] || 'https://res.cloudinary.com/dqakp8ucr/image/upload/v1785600773/vaveva_products/qa4soc3oh3fapdsa6xtx.jpg',
              price: createdProducts[3].price,
              color: 'Ecru White',
              size: 'L',
              quantity: 1,
              subtotal: createdProducts[3].price
            }
          ],
          shippingAddress: {
            fullName: 'Rahul Verma',
            phone: '+91 98765 43210',
            street: '15 Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            zipCode: '500033',
            country: 'India'
          },
          paymentMethod: 'Razorpay',
          isPaid: true,
          paidAt: new Date(Date.now() - 3600000 * 4),
          itemsPrice: createdProducts[3].price,
          shippingPrice: 0,
          taxPrice: 0,
          discountPrice: 0,
          totalPrice: createdProducts[3].price,
          orderStatus: 'Pending',
          courier: 'FedEx Air Express',
          trackingNumber: '',
          estimatedDelivery: '3 - 5 Business Days'
        }
      ];

      await Order.insertMany(ordersData);
    }

    console.log(`[Seed]: Success! Populated database with ${productsData.length} products & dummy orders!`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

if (require.main === module) seedData();

module.exports = { categoriesData, productsData, couponsData };
