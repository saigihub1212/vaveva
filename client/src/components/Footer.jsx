import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Twitter, Facebook, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to VAVEVA Men Journal.', {
      icon: '✨',
      style: { background: '#111111', color: '#FFFFFF' }
    });
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 border-2 border-white flex items-center justify-center font-serif text-base font-bold">
                V
              </div>
              <span className="font-serif text-2xl tracking-[0.25em] uppercase font-bold">
                VAVEVA
              </span>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              International Men's Luxury Apparel. Dedicated to minimalist oversized silhouettes, heavyweight organic cotton, and timeless elegance.
            </p>
            <div className="flex space-x-4 text-gray-400 pt-2">
              <a href="#instagram" className="hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#twitter" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#facebook" className="hover:text-white transition-colors"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Men's Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-bold">Men's Shop</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/shop?category=Oversized" className="hover:text-white">Oversized Fits</Link></li>
              <li><Link to="/shop?category=T-Shirts" className="hover:text-white">Heavyweight Tees</Link></li>
              <li><Link to="/shop?category=Shirts" className="hover:text-white">Linen Shirts</Link></li>
              <li><Link to="/shop?category=Pants" className="hover:text-white">Baggy Denim & Cargo</Link></li>
              <li><Link to="/shop?category=Hoodies" className="hover:text-white">Fleece Hoodies</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white">Leather Accessories</Link></li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-bold">Client Care</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/dashboard?tab=orders" className="hover:text-white">Track Order</Link></li>
              <li><a href="#returns" className="hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#size-guide" className="hover:text-white">Size Guide</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-bold">VAVEVA Journal</h4>
            <p className="text-xs text-gray-400 font-light">
              Subscribe to receive private invitations to new lookbooks and seasonal releases.
            </p>
            <form onSubmit={handleNewsletter} className="flex pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="bg-gray-900 border border-gray-800 text-xs px-4 py-3 flex-1 focus:outline-none focus:border-white text-white rounded-l-xl"
              />
              <button
                type="submit"
                className="bg-white text-[#111111] px-5 py-3 text-xs uppercase tracking-wider font-bold hover:bg-gray-200 transition-colors flex items-center justify-center rounded-r-xl"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 space-y-4 sm:space-y-0">
          <p>© 2026 VAVEVA MEN'S LUXURY INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1"><Globe size={12} /><span>India (INR ₹)</span></span>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
