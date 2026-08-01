import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PromoBanners = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Banner 1: Summer Collection */}
          <div className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-[#F5F5F5] group border border-[#EEEEEE] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
              alt="Summer Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
                Summer Collection 2026
              </h3>
              <p className="text-xs text-gray-200 mb-4 font-light max-w-xs">
                Discover the latest drops in organic linen and heavyweight cotton.
              </p>
              <Link
                to="/shop?category=Shirts"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:underline w-fit"
              >
                <span>Shop now</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Banner 2: Premium Quality */}
          <div className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-[#F5F5F5] group border border-[#EEEEEE] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000"
              alt="Premium Quality"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
                Premium Quality
              </h3>
              <p className="text-xs text-gray-200 mb-4 font-light max-w-xs">
                Crafted for comfort. Designed for you. Tailored fit built to last.
              </p>
              <Link
                to="/shop?category=Oversized"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:underline w-fit"
              >
                <span>Explore Essentials</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
