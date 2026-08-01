import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { user, setIsAuthModalOpen, requireAuth } = useAuth();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Shop', path: '/shop', icon: Compass },
    {
      label: 'Wishlist',
      path: '/dashboard?tab=wishlist',
      icon: Heart,
      badge: wishlist.length,
      onClick: (e) => {
        e.preventDefault();
        requireAuth('wishlist', () => navigate('/dashboard?tab=wishlist'));
      }
    },
    {
      label: 'Bag',
      path: '#bag',
      icon: ShoppingBag,
      badge: totalCartCount,
      onClick: (e) => {
        e.preventDefault();
        openCart();
      }
    },
    {
      label: 'Profile',
      path: user ? '/dashboard' : '#profile',
      icon: User,
      onClick: (e) => {
        if (!user) {
          e.preventDefault();
          setIsAuthModalOpen(true);
        }
      }
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-[#E5E2DA] lg:hidden py-2 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center relative py-1 px-3 transition-colors ${
                isActive ? 'text-[#111111]' : 'text-gray-400 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C5A880] text-[#111111] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
