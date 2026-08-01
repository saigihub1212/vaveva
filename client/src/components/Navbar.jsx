import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, LogOut, Package, UserCheck, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const NAVBAR_HEIGHT = 60;

export const Navbar = ({ isIntroPlaying }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { cartItems, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout, setIsAuthModalOpen } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Only apply transparent-to-white transition on the homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'NEW IN', path: '/shop?sort=newest' },
    { name: 'OVERSIZED', path: '/shop?category=Oversized' },
    { name: 'T-SHIRTS', path: '/shop?category=T-Shirts' },
    { name: 'SHIRTS', path: '/shop?category=Shirts' },
    { name: 'PANTS', path: '/shop?category=Pants' },
    { name: 'HOODIES', path: '/shop?category=Hoodies' },
    { name: 'ACCESSORIES', path: '/shop?category=Accessories' },
  ];

  const navBg = !isHomePage || isScrolled
    ? 'bg-white/96 backdrop-blur-[12px] border-b border-[#EEEEEE] shadow-[0_1px_16px_rgba(0,0,0,0.06)]'
    : 'bg-transparent border-b border-transparent';

  return (
    <>
      <header
        style={{ transition: 'background-color 300ms ease, box-shadow 300ms ease, backdrop-filter 300ms ease' }}
        className={`sticky top-0 z-50 w-full py-3.5 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8">

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#111111] p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <div className="border border-[#111111] px-2 py-0.5 text-[11px] font-serif font-bold text-[#111111] leading-none">
                V
              </div>
              <span className="font-serif text-[19px] tracking-[0.22em] font-extrabold text-[#111111]">
                VAVEVA
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname + location.search === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group text-[10.5px] font-bold tracking-[0.18em] text-[#111111] hover:text-[#333333] transition-colors py-1"
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#111111] transition-all duration-300 origin-left ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right action icons */}
            <div className="flex items-center space-x-4 text-[#111111]">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-60 transition-opacity p-1"
                title="Search"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>

              <Link
                to="/dashboard?tab=wishlist"
                className="relative hover:opacity-60 transition-opacity p-1 hidden sm:flex"
                title="Wishlist"
              >
                <Heart size={19} strokeWidth={1.8} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[8px] w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="relative hover:opacity-60 transition-opacity p-1"
                title="Bag"
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[8px] w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Icon & Dropdown */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
                    title={user.name}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold uppercase">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <ChevronDown size={12} className="text-[#111111]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hover:opacity-60 transition-opacity p-1 hidden sm:flex"
                    title="Sign In"
                  >
                    <User size={19} strokeWidth={1.8} />
                  </button>
                )}

                {/* User Profile Dropdown Menu */}
                {isUserDropdownOpen && user && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#EEEEEE] py-2 z-50 text-[#111111] animate-fadeIn"
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-[#F5F5F5]">
                      <p className="text-xs font-bold truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-500 truncate font-mono">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard?tab=orders"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs hover:bg-[#F8F5F1] transition-colors"
                    >
                      <Package size={15} />
                      <span>Order History</span>
                    </Link>

                    <Link
                      to="/dashboard?tab=profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs hover:bg-[#F8F5F1] transition-colors"
                    >
                      <UserCheck size={15} />
                      <span>My Profile & Settings</span>
                    </Link>

                    <Link
                      to="/dashboard?tab=wishlist"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-xs hover:bg-[#F8F5F1] transition-colors"
                    >
                      <Heart size={15} />
                      <span>My Wishlist ({wishlist.length})</span>
                    </Link>

                    {user.role === 'admin' && (
                      <a
                        href="http://localhost:3001"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2.5 px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                      >
                        <span>Admin Dashboard ↗</span>
                      </a>
                    )}

                    <div className="border-t border-[#F5F5F5] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-semibold"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#F0F0F0] px-5 pt-3 pb-6 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[10px] uppercase tracking-[0.22em] font-bold text-[#111111] py-2.5 border-b border-[#F5F5F5] hover:pl-1 transition-all"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="pt-3 border-t border-[#EEEEEE] flex justify-between items-center">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#111111]"
                >
                  My Account ({user.name})
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs text-red-600 font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full mt-3 bg-[#111111] text-white py-2 text-xs uppercase tracking-widest font-bold"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[100px] px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsSearchOpen(false); }}
        >
          <div className="bg-white w-full max-w-2xl rounded-2xl p-7 shadow-2xl relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-[#999] hover:text-[#111111] transition-colors"
            >
              <X size={20} />
            </button>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#111111] mb-5">
              SEARCH VAVEVA
            </p>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Oversized Tee, Linen Shirt, Cargo Pants…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-5 py-3.5 pr-12 text-sm focus:outline-none focus:border-[#111111] placeholder:text-[#AAAAAA] transition-colors"
                autoFocus
              />
              <Link
                to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 bg-[#111111] text-white p-2 rounded-lg hover:bg-[#333] transition-colors"
              >
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-5 pt-4 border-t border-[#F0F0F0] flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-[#999] uppercase tracking-widest font-semibold mr-1">
                Trending:
              </span>
              {['Oversized Tee', 'Linen Shirt', 'Baggy Denim', 'Heavyweight Hoodie', 'Leather Bag'].map((term) => (
                <Link
                  key={term}
                  to={`/shop?search=${encodeURIComponent(term)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="bg-[#F5F5F5] hover:bg-[#111111] hover:text-white text-[#111111] text-[10px] px-3 py-1.5 rounded-full transition-all"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
