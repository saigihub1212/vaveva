import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();

  const isSaved = isInWishlist(product._id);
  const isOutOfStock = product.totalStock === 0;

  const mainImg = product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800';
  const hoverImg = product.hoverImage || (product.images && product.images.length > 1 ? product.images[1] : mainImg);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth('cart', () => {
      const color = product.colorVariants && product.colorVariants.length > 0 ? product.colorVariants[0].colorName : 'Obsidian Black';
      addToCart(product, color, selectedSize, 1);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 1800);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white rounded-[18px] overflow-hidden border border-[#F0ECE6] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container (4:5 Ratio) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F8F5F1]">
        <Link to={`/product/${product.slug || product._id}`} className="block w-full h-full">
          <img
            src={isHovered ? hoverImg : mainImg}
            alt={product.name}
            className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            requireAuth('wishlist', () => toggleWishlist(product));
          }}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full transition-all duration-300 z-10 ${
            isSaved
              ? 'bg-[#111111] text-white shadow-md'
              : 'bg-white/80 text-[#111111] opacity-90 group-hover:opacity-100 hover:bg-[#111111] hover:text-white backdrop-blur-md shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Stock Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          {isOutOfStock ? (
            <span className="bg-[#111111]/90 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.2em] font-mono font-semibold px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          ) : (
            <span className="bg-white/80 backdrop-blur-md text-[#111111] text-[9px] uppercase tracking-[0.2em] font-mono font-semibold px-2.5 py-1 rounded-full border border-[#EEEEEE]">
              Available
            </span>
          )}
        </div>

        {/* Hover Quick Action Drawer Fade-in */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col space-y-1.5 z-10">
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 text-[#111111] hover:bg-[#111111] hover:text-white py-2 text-[10px] uppercase tracking-[0.22em] font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm backdrop-blur-md border border-[#EEEEEE]"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>

          {/* Quick Add to Cart Button */}
          {!isOutOfStock && (
            <button
              onClick={handleQuickAdd}
              className="w-full bg-[#111111] text-white hover:bg-[#333333] py-2 text-[10px] uppercase tracking-[0.22em] font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md"
            >
              {addedSuccess ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span>Add To Bag</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Tag */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6F63] font-mono font-semibold">
              {product.category}
            </span>
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="flex items-center space-x-1">
                {product.colorVariants.slice(0, 3).map((c, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: c.hexCode }}
                    title={c.colorName}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug || product._id}`}
            className="font-serif text-base text-[#111111] font-semibold tracking-tight hover:text-[#7A6F63] transition-colors leading-snug line-clamp-1 block"
          >
            {product.name}
          </Link>
        </div>

        {/* Sizes & Pricing Row */}
        <div className="mt-3 pt-2.5 border-t border-[#F7F5F0] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-[#111111]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-[#999999] line-through font-mono">
                ₹{product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Available Sizes Tag */}
          <div className="flex items-center space-x-1 text-[10px] font-mono text-[#666666]">
            {['S', 'M', 'L', 'XL'].map((s) => (
              <span key={s} className="px-1 py-0.5 rounded bg-[#F8F5F1] font-medium text-[9px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
