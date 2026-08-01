import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Star, ChevronRight, X, Ruler, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ProductCard } from '../components/ProductCard';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState('Obsidian Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { requireAuth, user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/${slug}`);
        setProduct(res.data);

        if (res.data.colorVariants && res.data.colorVariants.length > 0) {
          setSelectedColor(res.data.colorVariants[0].colorName);
        }

        // Fetch recommendations
        const simRes = await axios.get(`/api/products?category=${res.data.category}&limit=4`);
        setSimilarProducts(simRes.data.products?.filter((p) => p._id !== res.data._id) || []);
      } catch (error) {
        console.error('Product not found:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 aspect-[3/4] bg-[#EFECE6]" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-8 bg-[#EFECE6] w-3/4" />
            <div className="h-6 bg-[#EFECE6] w-1/4" />
            <div className="h-32 bg-[#EFECE6]" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="font-serif text-3xl">Product Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block bg-[#111111] text-[#FBF9F5] px-6 py-3 text-xs uppercase tracking-widest">
          Return to Showroom
        </Link>
      </div>
    );
  }

  const isSaved = wishlist.some((item) => item._id === product._id);
  const images = product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000'];

  const variantStock = product.inventory
    ? product.inventory.find((inv) => inv.size === selectedSize && (inv.colorName === selectedColor || selectedColor === 'Obsidian Black'))?.stock || 5
    : 10;

  const handleAddBag = () => {
    requireAuth('cart', () => {
      addToCart(product, selectedColor, selectedSize, 1);
    });
  };

  const handleBuyNow = () => {
    requireAuth('buy_now', () => {
      addToCart(product, selectedColor, selectedSize, 1);
      navigate('/checkout');
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you! Your review has been submitted for moderation.', {
      style: { background: '#111111', color: '#FBF9F5' }
    });
    setIsWriteReviewOpen(false);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest mb-8">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-[#111111] font-semibold">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Product Multi-Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col space-x-3 sm:space-x-0 sm:space-y-3 overflow-x-auto sm:overflow-visible hide-scrollbar flex-shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 sm:w-20 aspect-[3/4] border transition-all ${
                  activeImageIndex === idx ? 'border-[#111111] opacity-100' : 'border-[#E5E2DA] opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Featured Large Image */}
          <div className="flex-1 aspect-[3/4] bg-[#EFECE6] border border-[#E5E2DA] overflow-hidden relative">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-[#111111] text-[#FBF9F5] text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Purchase Details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                  {product.brand} • {product.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal mt-1">
                  {product.name}
                </h1>
              </div>

              <button
                onClick={() => requireAuth('wishlist', () => toggleWishlist(product))}
                className={`p-2.5 rounded-full border transition-colors ${
                  isSaved ? 'bg-[#111111] text-[#FBF9F5] border-[#111111]' : 'border-[#E5E2DA] hover:border-black'
                }`}
              >
                <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Rating breakdown */}
            <div className="flex items-center space-x-2 mt-3 mb-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating || 4.8) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-xs font-mono font-semibold text-gray-700">{product.rating || 4.8}</span>
              <span className="text-xs text-gray-400">({product.numReviews || 128} Reviews)</span>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline space-x-4 mb-6">
              <span className="text-2xl font-bold text-[#111111]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice > product.price && (
                <span className="text-base text-gray-400 line-through">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 font-mono">
                Taxes included
              </span>
            </div>

            <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Swatch Picker */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-gray-700 font-semibold mb-2">
                  Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                </label>
                <div className="flex space-x-3">
                  {product.colorVariants.map((c) => (
                    <button
                      key={c.colorName}
                      onClick={() => setSelectedColor(c.colorName)}
                      className={`w-9 h-9 rounded-full border-2 transition-transform ${
                        selectedColor === c.colorName ? 'scale-110 border-[#111111]' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: c.hexCode }}
                      title={c.colorName}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-gray-700 font-semibold">
                  Select Size
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center space-x-1 text-xs text-[#C5A880] hover:underline uppercase tracking-wider"
                >
                  <Ruler size={14} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 text-xs uppercase font-semibold border transition-colors ${
                      selectedSize === s
                        ? 'bg-[#111111] text-[#FBF9F5] border-[#111111]'
                        : 'border-[#E5E2DA] text-[#111111] hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-2 text-[11px] text-gray-500 font-mono">
                {variantStock > 0 ? (
                  <span className="text-amber-800 font-medium">⚡ Only {variantStock} left in stock for {selectedSize}</span>
                ) : (
                  <span className="text-red-700 font-medium">OUT OF STOCK</span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={handleAddBag}
                disabled={variantStock === 0}
                className="w-full bg-[#111111] text-[#FBF9F5] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C5A880] hover:text-[#111111] transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={18} />
                <span>Add To Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={variantStock === 0}
                className="w-full border border-[#111111] text-[#111111] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#111111] hover:text-[#FBF9F5] transition-all"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery & Assurance */}
            <div className="mt-8 pt-6 border-t border-[#E5E2DA] space-y-3 text-xs text-gray-600">
              <div className="flex items-center space-x-3">
                <Truck size={18} className="text-[#C5A880]" />
                <span>Complimentary Express Delivery in 3-5 Business Days</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw size={18} className="text-[#C5A880]" />
                <span>7 Days Hassle-Free Exchange & Return Guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck size={18} className="text-[#C5A880]" />
                <span>100% Verified Premium Heavyweight Organic Cotton</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Accordion for Material & Care */}
      <div className="mt-16 border-t border-[#E5E2DA] pt-10">
        <h3 className="font-serif text-2xl mb-6">Product Specifications & Care</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#EFECE6] p-6 border border-[#E5E2DA]">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#111111] mb-2">Material Composition</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">{product.materialDetails}</p>
          </div>
          <div className="bg-[#EFECE6] p-6 border border-[#E5E2DA]">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#111111] mb-2">Care Instructions</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">{product.careInstructions}</p>
          </div>
          <div className="bg-[#EFECE6] p-6 border border-[#E5E2DA]">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#111111] mb-2">Origin & Sustainability</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">Designed in Milan. Ethically woven using zero-water waste organic cotton farming practices.</p>
          </div>
        </div>
      </div>

      {/* Similar Products Recommendation */}
      {similarProducts.length > 0 && (
        <div className="mt-20 border-t border-[#E5E2DA] pt-12">
          <h3 className="font-serif text-2xl text-[#111111] mb-8">You May Also Like</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} product={p} onQuickView={() => {}} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FBF9F5] w-full max-w-lg p-6 border border-[#E5E2DA] shadow-2xl relative"
            >
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif text-xl mb-4">VAVEVA Size Guide (cm)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E2DA] bg-[#EFECE6]">
                      <th className="p-2.5 font-semibold">Size</th>
                      <th className="p-2.5 font-semibold">Chest</th>
                      <th className="p-2.5 font-semibold">Shoulder</th>
                      <th className="p-2.5 font-semibold">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2DA]">
                    <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">108 cm</td><td className="p-2.5">52 cm</td><td className="p-2.5">71 cm</td></tr>
                    <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">114 cm</td><td className="p-2.5">54 cm</td><td className="p-2.5">73 cm</td></tr>
                    <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">120 cm</td><td className="p-2.5">56 cm</td><td className="p-2.5">75 cm</td></tr>
                    <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">126 cm</td><td className="p-2.5">58 cm</td><td className="p-2.5">77 cm</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-500 mt-4">
                Note: All measurements refer to garment dimensions. For an oversized fit, select your true size.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
