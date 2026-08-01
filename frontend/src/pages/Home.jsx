import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ShopByCollection } from '../components/ShopByCollection';
import { ProductCard } from '../components/ProductCard';
import { PromoBanners } from '../components/PromoBanners';
import { WhyVaveva } from '../components/WhyVaveva';
import { StyleInspiration } from '../components/StyleInspiration';
import { QuickViewModal } from '../components/QuickViewModal';
import axios from 'axios';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products?limit=10');
        setProducts(res.data.products || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white text-[#111111]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Editorial Masonry Shop By Collection */}
      <ShopByCollection />

      {/* 3. New Arrivals */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              New Arrivals
            </h2>
            <Link
              to="/shop?sort=newest"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold hover:text-[#666666] transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-[3/4] bg-[#F5F5F5] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.slice(0, 5).map((product) => (
                <ProductCard key={product._id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Side-by-side Promotional Banners */}
      <PromoBanners />

      {/* 5. Quote Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#F5F5F5] border border-[#EEEEEE] p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#666666] font-semibold">Essential Statement</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight">
              Minimal. Modern. <br />
              <span>Made for You.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-normal max-w-md leading-relaxed">
              Designed for modern men who value clean tailoring, uncompromised quality, and subtle confidence.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-[#111111] text-white px-7 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#333333] transition-colors"
            >
              <span>Shop Essentials</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="lg:col-span-5 relative flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"
              alt="VAVEVA Minimal Hoodie"
              className="w-full aspect-[4/3] object-cover rounded-2xl border border-white shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Best Sellers
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold hover:text-[#666666] transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(2, 6).map((product) => (
              <ProductCard key={product._id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why VAVEVA Trust Badges */}
      <WhyVaveva />

      {/* 8. Style Inspiration Instagram Gallery */}
      <StyleInspiration />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};
