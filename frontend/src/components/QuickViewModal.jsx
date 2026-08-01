import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  Lock,
  ZoomIn,
  Ruler,
  Check,
  Feather,
  Sun
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { requireAuth } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // State Management
  const [selectedColor, setSelectedColor] = useState(
    product.colorVariants && product.colorVariants.length > 0
      ? product.colorVariants[0].colorName
      : 'Obsidian Black'
  );
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Gallery Images List (Fallback if only 1 image provided)
  const imageGallery =
    product.images && product.images.length > 0
      ? product.images
      : [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
        ];

  const currentActiveImage = imageGallery[activeImageIndex] || imageGallery[0];
  const isWished = isInWishlist(product._id);

  // Inventory Stock
  const variantStock = product.inventory
    ? product.inventory.find(
        (inv) =>
          inv.size === selectedSize &&
          (inv.colorName === selectedColor || selectedColor === 'Obsidian Black')
      )?.stock || 15
    : 15;

  const handleAdd = () => {
    requireAuth('cart', () => {
      addToCart(product, selectedColor, selectedSize, 1);
      onClose();
    });
  };

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 25;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white w-[92vw] max-w-[1360px] h-[88vh] max-h-[840px] rounded-[20px] shadow-2xl relative border border-[#EEEEEE] overflow-hidden flex flex-col justify-between"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-md border border-[#EAEAEAE]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* ── Main 2-Column Content ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full overflow-hidden">

            {/* ── Left Section: Product Gallery (60% Desktop) ───────────────── */}
            <div className="lg:col-span-7 bg-[#FFFFFF] p-4 sm:p-8 flex flex-col sm:flex-row gap-4 h-full relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#F0F0F0]">
              
              {/* Product Badges (Top-Left Corner) */}
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-1.5 pointer-events-none">
                <span className="bg-[#111111] text-white text-[9.5px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full shadow-sm">
                  Best Seller
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-[#111111] text-[9.5px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full border border-[#EEEEEE] shadow-sm">
                  260 GSM Heavyweight
                </span>
              </div>

              {/* Vertical Thumbnail Column (Left side) */}
              <div className="hidden sm:flex flex-col gap-3 z-10 w-[76px] shrink-0 justify-center">
                {imageGallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-[70px] h-[86px] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#111111] scale-[1.04] shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Product Image Container with Pure White Canvas */}
              <div className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden rounded-[16px] bg-white group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentActiveImage}
                    initial={{ opacity: 0.3, scale: 0.98 }}
                    animate={{ opacity: 1, scale: isZoomed ? 1.3 : 1 }}
                    exit={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                    src={currentActiveImage}
                    alt={product.name}
                    className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                  />
                </AnimatePresence>

                {/* Zoom Icon Indicator */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-[#666666] pointer-events-none shadow-sm">
                  <ZoomIn size={16} />
                </div>

                {/* Mobile Horizontal Thumbnail Carousel */}
                <div className="sm:hidden absolute bottom-3 inset-x-0 flex justify-center gap-2 z-20">
                  {imageGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeImageIndex === idx ? 'w-6 bg-[#111111]' : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right Section: Product Details (40% Desktop) ──────────────── */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-white">
              
              {/* Scrollable Information Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                
                {/* 1. Category */}
                <span className="text-xs uppercase tracking-[0.35em] text-[#666666] font-mono font-semibold">
                  {product.category || 'Apparel'}
                </span>

                {/* 2. Product Title */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] leading-tight">
                  {product.name}
                </h2>

                {/* 3. Pricing & Discount Badge */}
                <div className="flex items-center space-x-3 pt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                    ₹{product.price?.toLocaleString()}
                  </span>
                  {product.compareAtPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through font-mono">
                      ₹{product.compareAtPrice?.toLocaleString()}
                    </span>
                  )}
                  <span className="bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {discountPercent}% OFF
                  </span>
                </div>

                {/* 4. Short Description */}
                <p className="text-xs sm:text-sm text-[#555555] font-normal leading-relaxed line-clamp-2">
                  {product.description ||
                    'Architecturally tailored from heavyweight organic cotton. Engineered for ultimate structure, breathability, and timeless luxury.'}
                </p>

                {/* 5. Product Highlight Feature Cards */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="bg-[#F8F5F1] p-2.5 rounded-xl border border-[#EAE5DC] flex flex-col items-center text-center">
                    <Feather size={15} className="text-[#111111] mb-1" />
                    <span className="text-[9.5px] font-bold uppercase tracking-tight text-[#111111]">
                      100% Organic
                    </span>
                    <span className="text-[8.5px] text-[#7A6F63]">Cotton</span>
                  </div>
                  <div className="bg-[#F8F5F1] p-2.5 rounded-xl border border-[#EAE5DC] flex flex-col items-center text-center">
                    <Sun size={15} className="text-[#111111] mb-1" />
                    <span className="text-[9.5px] font-bold uppercase tracking-tight text-[#111111]">
                      Breathable
                    </span>
                    <span className="text-[8.5px] text-[#7A6F63]">All Season</span>
                  </div>
                  <div className="bg-[#F8F5F1] p-2.5 rounded-xl border border-[#EAE5DC] flex flex-col items-center text-center">
                    <Sparkles size={15} className="text-[#111111] mb-1" />
                    <span className="text-[9.5px] font-bold uppercase tracking-tight text-[#111111]">
                      Pre-Shrunk
                    </span>
                    <span className="text-[8.5px] text-[#7A6F63]">Heavyweight</span>
                  </div>
                </div>

                {/* 6. Color Selector */}
                {product.colorVariants && product.colorVariants.length > 0 && (
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs uppercase tracking-widest text-[#111111] font-bold">
                        Color: <span className="font-normal text-[#555555]">{selectedColor}</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      {product.colorVariants.map((c) => (
                        <button
                          key={c.colorName}
                          onClick={() => setSelectedColor(c.colorName)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedColor === c.colorName
                              ? 'scale-110 border-[#111111] shadow-md'
                              : 'border-gray-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hexCode }}
                          title={c.colorName}
                        >
                          {selectedColor === c.colorName && (
                            <Check
                              size={11}
                              className={c.colorName === 'White' || c.hexCode === '#FFFFFF' ? 'text-black' : 'text-white'}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Size Selector & Size Guide */}
                <div className="pt-1">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-widest text-[#111111] font-bold">
                      Select Size
                    </label>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="inline-flex items-center space-x-1 text-xs text-[#111111] underline font-medium hover:text-[#666666] transition-colors"
                    >
                      <Ruler size={13} />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 rounded-xl text-xs font-bold uppercase transition-all border ${
                          selectedSize === size
                            ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                            : 'bg-white text-[#111111] border-[#E0DAD0] hover:border-[#111111]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8. Stock Status Indicator */}
                <div className="flex items-center space-x-2 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-800 font-semibold font-mono">
                    ● In Stock & Ready to Ship (Only {variantStock} left)
                  </span>
                </div>

                {/* 9. Delivery & Benefits */}
                <div className="bg-[#F8F5F1] rounded-xl p-3 space-y-2 border border-[#EAE5DC] text-xs text-[#444444]">
                  <div className="flex items-center space-x-2.5">
                    <Truck size={14} className="text-[#111111] shrink-0" />
                    <span>Free Shipping on orders above ₹999</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <RotateCcw size={14} className="text-[#111111] shrink-0" />
                    <span>Easy 7-Day Hassle-Free Returns</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck size={14} className="text-[#111111] shrink-0" />
                    <span>100% Encrypted & Secure Checkout</span>
                  </div>
                </div>

              </div>

              {/* 10. Always-Visible Fixed Bottom Action Buttons: Add to Bag & Wishlist */}
              <div className="flex items-center space-x-3 pt-4 border-t border-[#F0F0F0] mt-2 shrink-0">
                <button
                  onClick={handleAdd}
                  disabled={variantStock === 0}
                  className="flex-1 h-[54px] bg-[#111111] disabled:bg-gray-400 text-white rounded-[999px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-all flex items-center justify-center space-x-2.5 shadow-md"
                >
                  <ShoppingBag size={18} />
                  <span>{variantStock > 0 ? 'Add To Bag' : 'Out Of Stock'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-[54px] h-[54px] rounded-full border transition-all flex items-center justify-center shrink-0 ${
                    isWished
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart size={20} className={isWished ? 'fill-red-600' : ''} />
                </button>
              </div>

            </div>

          </div>

          {/* ── 11. Bottom Trust Bar Footer ─────────────────────────────────── */}
          <div className="bg-[#FAF8F5] border-t border-[#EEEEEE] px-6 py-3.5 flex items-center justify-around text-[11px] font-mono text-[#555555] uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Zap size={14} className="text-[#111111]" />
              <span>Dispatch in 24–48 Hours</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <RotateCcw size={14} className="text-[#111111]" />
              <span>Easy 7-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock size={14} className="text-[#111111]" />
              <span>Guaranteed Safe Checkout</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Size Guide Modal Overlay ────────────────────────────────────────── */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold uppercase text-[#111111]">
                VAVEVA Size Guide
              </h3>
              <button onClick={() => setIsSizeGuideOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              All measurements are in inches. Fits true to size with an architectural relaxed cut.
            </p>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b bg-[#F8F5F1] text-[#111111] uppercase font-mono">
                  <th className="p-2">Size</th>
                  <th className="p-2">Chest</th>
                  <th className="p-2">Length</th>
                  <th className="p-2">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700 font-mono">
                <tr>
                  <td className="p-2 font-bold">S</td>
                  <td className="p-2">38 - 40"</td>
                  <td className="p-2">27.5"</td>
                  <td className="p-2">20.5"</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">M</td>
                  <td className="p-2">40 - 42"</td>
                  <td className="p-2">28.5"</td>
                  <td className="p-2">21.5"</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">L</td>
                  <td className="p-2">42 - 44"</td>
                  <td className="p-2">29.5"</td>
                  <td className="p-2">22.5"</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">XL</td>
                  <td className="p-2">44 - 46"</td>
                  <td className="p-2">30.5"</td>
                  <td className="p-2">23.5"</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">XXL</td>
                  <td className="p-2">46 - 48"</td>
                  <td className="p-2">31.5"</td>
                  <td className="p-2">24.5"</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full bg-[#111111] text-white py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
