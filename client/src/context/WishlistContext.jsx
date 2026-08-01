import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Fetch / sync wishlist from backend when authenticated, or fallback to localStorage
  useEffect(() => {
    const syncWishlist = async () => {
      if (user && token) {
        try {
          const res = await axios.get('/api/auth/wishlist');
          setWishlist(res.data || []);
          localStorage.setItem('vaveva_wishlist', JSON.stringify(res.data || []));
        } catch (error) {
          const saved = localStorage.getItem('vaveva_wishlist');
          if (saved) setWishlist(JSON.parse(saved));
        }
      } else {
        const saved = localStorage.getItem('vaveva_wishlist');
        setWishlist(saved ? JSON.parse(saved) : []);
      }
    };
    syncWishlist();
  }, [user, token]);

  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => item._id === product._id);

    // Optimistic state update
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));
      toast.error(`Removed ${product.name} from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success(`Saved ${product.name} to Wishlist`, {
        icon: '🖤',
        style: {
          background: '#111111',
          color: '#FBF9F5'
        }
      });
    }

    // Sync with backend database if logged in
    if (user && token) {
      try {
        const res = await axios.post('/api/auth/wishlist/toggle', { productId: product._id });
        setWishlist(res.data || []);
        localStorage.setItem('vaveva_wishlist', JSON.stringify(res.data || []));
      } catch (err) {
        console.error('[Wishlist DB Toggle Error]:', err);
      }
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
