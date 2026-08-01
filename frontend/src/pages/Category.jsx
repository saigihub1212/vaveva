import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  X,
  ChevronDown,
  RefreshCw,
  PackageX,
  Check,
  Sparkles
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import axios from 'axios';

// ── 1. Category Banner Metadata ──────────────────────────────────────────────
const CATEGORY_BANNERS = {
  All: {
    tag: 'CATALOGUE 2026',
    title: 'THE COMPLETE COLLECTION',
    desc: 'Explore timeless silhouettes, architectural fits, and premium organic fabrications engineered for modern men.',
    bgImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600'
  },
  Oversized: {
    tag: 'CATALOGUE 2026',
    title: 'OVERSIZED COLLECTION',
    desc: 'Signature drop-shoulder fits and boxy heavyweight cotton essentials engineered for statement everyday wear.',
    bgImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600'
  },
  'T-Shirts': {
    tag: 'CATALOGUE 2026',
    title: 'T-SHIRTS & HEAVYWEIGHT TEES',
    desc: 'Pre-shrunk 260-320 GSM organic cotton tees, tight crew necks, slub textures, and sun-washed vintage patinas.',
    bgImg: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1600'
  },
  Shirts: {
    tag: 'CATALOGUE 2026',
    title: 'TAILORED & RESORT SHIRTS',
    desc: 'Sunbleached European linen resort shirts, structured cotton twill overshirts, and basket-weave Oxford button-downs.',
    bgImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1600'
  },
  Pants: {
    tag: 'CATALOGUE 2026',
    title: 'TROUSERS & DENIM PANTS',
    desc: 'Architectural double-pleated trousers, 14oz wide-leg denim jeans, and multi-pocket utility cargo pants.',
    bgImg: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1600'
  },
  Hoodies: {
    tag: 'CATALOGUE 2026',
    title: 'LUXURY FLEECE HOODIES',
    desc: 'Ultra-plush 480 GSM French Terry fleece hoodies, double-lined hoods, and custom gunmetal zip-ups.',
    bgImg: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1600'
  },
  Accessories: {
    tag: 'CATALOGUE 2026',
    title: 'MINIMAL ACCESSORIES',
    desc: 'Handcrafted Italian full-grain leather belts, cashmere beanies, organic cotton caps, and minimal leather bags.',
    bgImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1600'
  }
};

// ── 2. Subcategory Mapping Per Category ──────────────────────────────────────
const SUBCATEGORIES_MAP = {
  Oversized: [
    'All Oversized',
    'Oversized T-Shirts',
    'Oversized Shirts',
    'Oversized Hoodies',
    'Oversized Sweatshirts',
    'Oversized Co-ord Sets'
  ],
  'T-Shirts': [
    'All T-Shirts',
    'Plain T-Shirts',
    'Graphic T-Shirts',
    'Printed T-Shirts',
    'Polo T-Shirts',
    'Henley T-Shirts',
    'Full Sleeve T-Shirts',
    'Half Sleeve T-Shirts'
  ],
  Shirts: [
    'All Shirts',
    'Casual Shirts',
    'Formal Shirts',
    'Linen Shirts',
    'Oxford Shirts',
    'Cuban Collar Shirts',
    'Flannel Shirts',
    'Checked Shirts',
    'Printed Shirts'
  ],
  Pants: [
    'All Pants',
    'Cargo Pants',
    'Jeans',
    'Trousers',
    'Track Pants',
    'Joggers',
    'Chinos',
    'Linen Pants',
    'Shorts'
  ],
  Hoodies: [
    'All Hoodies',
    'Zip Hoodies',
    'Pullover Hoodies',
    'Graphic Hoodies',
    'Oversized Hoodies',
    'Sweatshirts'
  ],
  Accessories: [
    'All Accessories',
    'Caps',
    'Bags',
    'Socks',
    'Belts',
    'Wallets',
    'Sunglasses',
    'Chains'
  ],
  All: [
    'All Catalogue',
    'Oversized',
    'T-Shirts',
    'Shirts',
    'Pants',
    'Hoodies',
    'Accessories'
  ]
};

// ── 3. Category-Specific Dynamic Filter Configurations ───────────────────────
const DYNAMIC_FILTERS_CONFIG = {
  Pants: [
    { key: 'fit', label: 'Fit & Silhouette', options: ['Relaxed', 'Regular', 'Slim', 'Baggy', 'Straight'] },
    { key: 'waistSize', label: 'Waist Size', options: ['28', '30', '32', '34', '36', '38'] },
    { key: 'length', label: 'Length', options: ['Regular', 'Ankle Length', 'Cropped'] },
    { key: 'fabric', label: 'Fabric', options: ['Cotton', 'Denim', 'Linen', 'Twill', 'Polyester'] }
  ],
  Shirts: [
    { key: 'collarType', label: 'Collar Type', options: ['Spread', 'Cuban Collar', 'Button-Down', 'Mandarin'] },
    { key: 'sleeveType', label: 'Sleeve Type', options: ['Half Sleeve', 'Full Sleeve'] },
    { key: 'fit', label: 'Fit', options: ['Regular', 'Slim', 'Oversized', 'Relaxed'] },
    { key: 'pattern', label: 'Pattern', options: ['Solid', 'Checked', 'Printed', 'Striped'] },
    { key: 'fabric', label: 'Fabric', options: ['Linen', 'Cotton', 'Oxford', 'Flannel'] },
    { key: 'size', label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
  ],
  'T-Shirts': [
    { key: 'neckType', label: 'Neck Type', options: ['Crew Neck', 'Henley', 'Polo', 'V-Neck'] },
    { key: 'sleeveLength', label: 'Sleeve Length', options: ['Half Sleeve', 'Full Sleeve', 'Drop Shoulder'] },
    { key: 'fit', label: 'Fit', options: ['Oversized', 'Regular', 'Boxy', 'Slim'] },
    { key: 'graphicPlain', label: 'Graphic / Plain', options: ['Plain', 'Graphic', 'Minimal Logo', 'Back Print'] },
    { key: 'size', label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
  ],
  Hoodies: [
    { key: 'styleType', label: 'Zip / Pullover', options: ['Zip Hoodies', 'Pullover Hoodies', 'Sweatshirts'] },
    { key: 'fabric', label: 'Fabric', options: ['Heavyweight Fleece', 'French Terry', 'Organic Cotton'] },
    { key: 'fit', label: 'Fit', options: ['Oversized', 'Boxy', 'Regular'] },
    { key: 'size', label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
  ],
  Accessories: [
    { key: 'type', label: 'Accessory Type', options: ['Caps', 'Bags', 'Socks', 'Belts', 'Wallets', 'Sunglasses', 'Chains'] },
    { key: 'material', label: 'Material', options: ['Leather', 'Canvas', 'Stainless Steel', 'Cashmere', 'Cotton'] },
    { key: 'brand', label: 'Collection / Brand', options: ['VAVEVA Minimal', 'VAVEVA Leather', 'VAVEVA Hardware'] }
    // Size and Fit are explicitly EXCLUDED for Accessories
  ],
  Oversized: [
    { key: 'fit', label: 'Fit & Cut', options: ['Boxy Oversized', 'Drop Shoulder', 'Relaxed'] },
    { key: 'fabric', label: 'Fabric', options: ['Heavyweight Organic Cotton', 'French Terry', 'Linen Blend'] },
    { key: 'size', label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
  ],
  All: [
    { key: 'fit', label: 'Fit & Silhouette', options: ['Boxy Oversized', 'Relaxed Fit', 'Tailored Fit', 'Wide Leg'] },
    { key: 'size', label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34'] },
    { key: 'material', label: 'Fabric & Material', options: ['Organic Cotton', 'European Linen', 'French Terry', 'Cotton Denim', 'Italian Leather'] }
  ]
};

const COLOR_PALETTE = [
  { name: 'Black', hex: '#111111' },
  { name: 'Beige', hex: '#E5DFD3' },
  { name: 'Brown', hex: '#3C2A21' },
  { name: 'Olive', hex: '#4B5320' },
  { name: 'Grey', hex: '#5A636A' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#1B2A47' },
  { name: 'Tan', hex: '#A8763E' }
];

export const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL search params
  const currentCategory = searchParams.get('category') || 'All';
  const currentSubcategory = searchParams.get('subcategory') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Active Category State
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(currentSubcategory);

  // Common Filters State
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '');
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('inStockOnly') === 'true');
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 5000);
  const [sortOption, setSortOption] = useState(currentSort);
  const [gridCols, setGridCols] = useState(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Dynamic Specific Filter Selections (Key-Value map)
  const [dynamicFilterValues, setDynamicFilterValues] = useState({
    fit: searchParams.get('fit') || '',
    size: searchParams.get('size') || '',
    waistSize: searchParams.get('waistSize') || '',
    length: searchParams.get('length') || '',
    collarType: searchParams.get('collarType') || '',
    sleeveType: searchParams.get('sleeveType') || '',
    neckType: searchParams.get('neckType') || '',
    sleeveLength: searchParams.get('sleeveLength') || '',
    graphicPlain: searchParams.get('graphicPlain') || '',
    styleType: searchParams.get('styleType') || '',
    fabric: searchParams.get('fabric') || '',
    material: searchParams.get('material') || '',
    pattern: searchParams.get('pattern') || '',
    brand: searchParams.get('brand') || ''
  });

  // Accordion open/collapse states
  const [openSections, setOpenSections] = useState({
    categories: true,
    subcategories: true,
    price: true,
    color: true,
    availability: true
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Sync category changes from URL searchParams
  useEffect(() => {
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
      setSelectedSubcategory('');
    }
  }, [currentCategory]);

  // Handle Main Category Change: Reset subcategory to "All" and clean up invalid category-specific filters
  const handleMainCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const subList = SUBCATEGORIES_MAP[catName] || SUBCATEGORIES_MAP.All;
    setSelectedSubcategory(subList[0]); // Auto-select "All" for chosen category

    // Reset category-specific filters while keeping global filters like color & price
    setDynamicFilterValues({
      fit: '',
      size: '',
      waistSize: '',
      length: '',
      collarType: '',
      sleeveType: '',
      neckType: '',
      sleeveLength: '',
      graphicPlain: '',
      styleType: '',
      fabric: '',
      material: '',
      pattern: '',
      brand: ''
    });

    // Update URL Search Params
    const newParams = new URLSearchParams();
    if (catName !== 'All') newParams.set('category', catName);
    if (currentSearch) newParams.set('search', currentSearch);
    if (sortOption) newParams.set('sort', sortOption);
    setSearchParams(newParams);
  };

  // Handle Subcategory Selection
  const handleSubcategoryChange = (subName) => {
    setSelectedSubcategory(subName);
    const newParams = new URLSearchParams(searchParams);
    if (subName && !subName.startsWith('All ')) {
      newParams.set('subcategory', subName);
    } else {
      newParams.delete('subcategory');
    }
    setSearchParams(newParams);
  };

  // Handle Dynamic Filter Selection
  const handleDynamicFilterToggle = (key, value) => {
    setDynamicFilterValues((prev) => {
      const updatedVal = prev[key] === value ? '' : value;
      const newParams = new URLSearchParams(searchParams);
      if (updatedVal) {
        newParams.set(key, updatedVal);
      } else {
        newParams.delete(key);
      }
      setSearchParams(newParams);
      return { ...prev, [key]: updatedVal };
    });
  };

  // Fetch products from backend based on all active parameters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();

        if (selectedCategory && selectedCategory !== 'All') query.append('category', selectedCategory);
        if (selectedSubcategory && !selectedSubcategory.startsWith('All ')) {
          query.append('subcategory', selectedSubcategory);
        }
        if (currentSearch) query.append('search', currentSearch);
        if (selectedColor) query.append('color', selectedColor);
        if (inStockOnly) query.append('inStockOnly', 'true');
        if (maxPrice < 5000) query.append('maxPrice', maxPrice);
        if (sortOption) query.append('sort', sortOption);

        // Append active dynamic filter fields
        Object.entries(dynamicFilterValues).forEach(([key, val]) => {
          if (val) query.append(key, val);
        });

        const res = await axios.get(`/api/products?${query.toString()}`);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error('Error fetching filtered catalogue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    selectedCategory,
    selectedSubcategory,
    currentSearch,
    selectedColor,
    inStockOnly,
    maxPrice,
    sortOption,
    dynamicFilterValues
  ]);

  // Clear All Filters Function
  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('');
    setSelectedColor('');
    setInStockOnly(false);
    setMaxPrice(5000);
    setDynamicFilterValues({
      fit: '',
      size: '',
      waistSize: '',
      length: '',
      collarType: '',
      sleeveType: '',
      neckType: '',
      sleeveLength: '',
      graphicPlain: '',
      styleType: '',
      fabric: '',
      material: '',
      pattern: '',
      brand: ''
    });
    setSearchParams({});
  };

  // Count active applied filters
  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSubcategory && !selectedSubcategory.startsWith('All ') ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 5000 ? 1 : 0) +
    Object.values(dynamicFilterValues).filter(Boolean).length;

  const mainCategoriesList = ['All', 'Oversized', 'T-Shirts', 'Shirts', 'Pants', 'Hoodies', 'Accessories'];
  const activeSubcategories = SUBCATEGORIES_MAP[selectedCategory] || SUBCATEGORIES_MAP.All;
  const activeDynamicFilters = DYNAMIC_FILTERS_CONFIG[selectedCategory] || DYNAMIC_FILTERS_CONFIG.All;
  const activeBanner = CATEGORY_BANNERS[selectedCategory] || CATEGORY_BANNERS.All;

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#111111] pt-4 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── 1. Editorial Category Hero Banner ─────────────────── */}
        <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[340px] rounded-[24px] overflow-hidden mb-8 shadow-sm border border-[#EAE5DC] bg-[#E5DFD3]">
          <img
            src={activeBanner.bgImg}
            alt={activeBanner.title}
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent p-6 sm:p-12 flex flex-col justify-center text-white z-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/70 font-mono font-semibold mb-2">
              {activeBanner.tag}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase max-w-2xl">
              {activeBanner.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed max-w-xl mt-2.5 font-sans">
              {activeBanner.desc}
            </p>
            {currentSearch && (
              <span className="inline-block mt-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono w-fit">
                Search Results: "{currentSearch}"
              </span>
            )}
          </div>
        </div>

        {/* ── 2. Top Filter & Sort Bar ──────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E0DAD0] pb-4 mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 bg-[#111111] text-white px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-sm"
            >
              <Filter size={14} />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            <span className="text-xs text-[#7A6F63] font-mono font-semibold">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
            </span>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-[#111111] underline font-medium hover:text-[#7A6F63] transition-colors"
              >
                <RefreshCw size={12} />
                <span>Reset All Filters ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Desktop View & Sorting Options */}
          <div className="flex items-center space-x-6">
            {/* Grid Column Switcher */}
            <div className="hidden sm:flex items-center space-x-2 border-r border-[#E0DAD0] pr-6">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 rounded-lg transition-colors ${gridCols === 2 ? 'bg-[#111111] text-white' : 'text-[#7A6F63] hover:text-[#111111]'}`}
                title="2 Column Grid"
              >
                <Grid2X2 size={16} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded-lg transition-colors ${gridCols === 3 ? 'bg-[#111111] text-white' : 'text-[#7A6F63] hover:text-[#111111]'}`}
                title="3 Column Grid"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 rounded-lg transition-colors ${gridCols === 4 ? 'bg-[#111111] text-white' : 'text-[#7A6F63] hover:text-[#111111]'}`}
                title="4 Column Grid"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider text-[#7A6F63] font-semibold">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-[#E0DAD0] rounded-xl py-2 px-4 text-xs font-semibold uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111] shadow-sm cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 3. Main Catalogue Layout (Sticky Dynamic Sidebar + Product Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Desktop Sticky Context-Aware Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 pr-2 sticky top-24 max-h-[calc(100vh-110px)] overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-[20px] p-6 border border-[#EAE5DC] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">

              {/* Header with Active Filters Count */}
              <div className="flex items-center justify-between border-b border-[#F5F2EB] pb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles size={14} className="text-[#111111]" />
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#111111]">
                    Refine Catalogue
                  </span>
                </div>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#111111] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {activeFiltersCount} Active
                  </span>
                )}
              </div>

              {/* 2. Dynamic Subcategories Accordion (Contextual to Selected Main Category) */}
              <div className="border-b border-[#F5F2EB] pb-5">
                <button
                  onClick={() => toggleSection('subcategories')}
                  className="flex items-center justify-between w-full text-xs uppercase tracking-[0.25em] font-bold text-[#111111] mb-3"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{selectedCategory} Types</span>
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${openSections.subcategories ? 'rotate-180' : ''}`} />
                </button>
                {openSections.subcategories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 pt-1"
                  >
                    {activeSubcategories.map((sub) => {
                      const isActive =
                        selectedSubcategory === sub ||
                        (!selectedSubcategory && sub.startsWith('All '));
                      return (
                        <button
                          key={sub}
                          onClick={() => handleSubcategoryChange(sub)}
                          className={`flex items-center justify-between w-full text-left text-xs tracking-wide py-1.5 px-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-[#111111] text-white font-bold shadow-sm'
                              : 'text-[#555555] hover:bg-[#F8F5F1] hover:text-[#111111]'
                          }`}
                        >
                          <span>{sub}</span>
                          {isActive && <Check size={12} className="text-white" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* 3. Category-Specific Dynamic Filters (Fit, Collar, Neck, Sleeve, Pattern, Material, etc.) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {activeDynamicFilters.map((group) => {
                    const activeVal = dynamicFilterValues[group.key] || '';
                    return (
                      <div key={group.key} className="border-b border-[#F5F2EB] pb-5">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] font-bold text-[#111111] mb-3">
                          <span>{group.label}</span>
                          {activeVal && (
                            <span className="text-[10px] text-[#7A6F63] font-normal lowercase tracking-normal">
                              ({activeVal})
                            </span>
                          )}
                        </div>

                        {/* Button Options Grid */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {group.options.map((opt) => {
                            const isOptActive = activeVal === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => handleDynamicFilterToggle(group.key, opt)}
                                className={`py-1.5 px-3 text-[11px] font-sans uppercase tracking-wider border rounded-xl transition-all ${
                                  isOptActive
                                    ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-sm'
                                    : 'border-[#EAE5DC] text-[#666666] hover:border-[#111111] hover:text-[#111111] bg-white'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* 4. Color Palette Accordion (Universal) */}
              <div className="border-b border-[#F5F2EB] pb-5">
                <button
                  onClick={() => toggleSection('color')}
                  className="flex items-center justify-between w-full text-xs uppercase tracking-[0.25em] font-bold text-[#111111] mb-3"
                >
                  <span>Color Palette</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${openSections.color ? 'rotate-180' : ''}`} />
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {COLOR_PALETTE.map((c) => {
                      const isColorActive = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(isColorActive ? '' : c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center relative ${
                            isColorActive ? 'scale-110 border-[#111111] shadow-md' : 'border-gray-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {isColorActive && (
                            <span className={`w-2 h-2 rounded-full ${c.name === 'White' ? 'bg-black' : 'bg-white'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. Max Price Slider Accordion */}
              <div className="border-b border-[#F5F2EB] pb-5">
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full text-xs uppercase tracking-[0.25em] font-bold text-[#111111] mb-3"
                >
                  <span>Max Price</span>
                  <span className="font-mono text-[#7A6F63]">₹{maxPrice.toLocaleString()}</span>
                </button>
                {openSections.price && (
                  <div className="pt-2">
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#111111] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#888888] font-mono mt-1">
                      <span>₹500</span>
                      <span>₹5,000</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Availability Toggle Accordion */}
              <div className="pb-2">
                <button
                  onClick={() => toggleSection('availability')}
                  className="flex items-center justify-between w-full text-xs uppercase tracking-[0.25em] font-bold text-[#111111] mb-3"
                >
                  <span>Stock Availability</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${openSections.availability ? 'rotate-180' : ''}`} />
                </button>
                {openSections.availability && (
                  <label className="flex items-center justify-between cursor-pointer pt-1">
                    <span className="text-xs text-[#666666] font-medium">In Stock Only</span>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 accent-[#111111] rounded cursor-pointer"
                    />
                  </label>
                )}
              </div>

              {/* Clear All Filters Button */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-[#F8F5F1] border border-[#E0DAD0] text-[#111111] hover:bg-[#111111] hover:text-white py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <RefreshCw size={13} />
                  <span>Clear All Filters ({activeFiltersCount})</span>
                </button>
              )}

            </div>
          </aside>

          {/* Product Grid Main Content Area */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-[#EAE5DC] rounded-[18px]" />
                ))}
              </div>
            ) : products.length === 0 ? (
              /* Editorial Empty State */
              <div className="bg-white rounded-[24px] border border-[#EAE5DC] p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm my-6">
                <div className="w-16 h-16 bg-[#F8F5F1] rounded-full flex items-center justify-center mx-auto mb-4 text-[#7A6F63]">
                  <PackageX size={32} />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-tight">
                  No Products Found
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6F63] mt-2 leading-relaxed">
                  No items in our catalogue match your current dynamic filter criteria. Try adjusting your subcategory or clearing selected filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center space-x-2 bg-[#111111] text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-all shadow-md"
                >
                  <RefreshCw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div
                className={`grid gap-6 sm:gap-8 ${
                  gridCols === 2
                    ? 'grid-cols-2'
                    : gridCols === 3
                    ? 'grid-cols-2 md:grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ────────────────────────────────────────────── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 space-y-6 animate-slideLeft">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-4">
              <h2 className="text-sm uppercase tracking-[0.25em] font-bold text-[#111111]">
                Refine Catalogue ({activeFiltersCount})
              </h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-[#111111]">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Subcategories */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-2">{selectedCategory} Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {activeSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubcategoryChange(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold ${
                      selectedSubcategory === sub ? 'bg-[#111111] text-white' : 'bg-[#F8F5F1] text-[#666666]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Dynamic Filters */}
            {activeDynamicFilters.map((group) => {
              const activeVal = dynamicFilterValues[group.key] || '';
              return (
                <div key={group.key}>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-2">{group.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleDynamicFilterToggle(group.key, opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider border font-medium ${
                          activeVal === opt ? 'bg-[#111111] text-white border-[#111111]' : 'border-gray-200 text-[#666666]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-[#111111] text-white py-3.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-md"
            >
              Show {products.length} Products
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};
