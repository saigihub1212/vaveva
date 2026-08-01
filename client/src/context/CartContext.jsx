import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  // Sync / fetch cart from backend database when logged in, or fallback to localStorage for guests
  useEffect(() => {
    const syncCart = async () => {
      if (user && token) {
        setLoadingCart(true);
        try {
          const res = await axios.get('/api/cart');
          const dbCart = (res.data || []).map((item) => ({
            product: item.product,
            color: item.color,
            size: item.size,
            quantity: item.quantity
          }));
          setCartItems(dbCart);
          localStorage.setItem('vaveva_cart', JSON.stringify(dbCart));
        } catch (error) {
          console.error('[Cart DB Sync Error]:', error);
          const saved = localStorage.getItem('vaveva_cart');
          if (saved) setCartItems(JSON.parse(saved));
        } finally {
          setLoadingCart(false);
        }
      } else {
        // Guest user: load from local storage
        const saved = localStorage.getItem('vaveva_cart');
        setCartItems(saved ? JSON.parse(saved) : []);
      }
    };
    syncCart();
  }, [user, token]);

  // Keep localStorage backup updated
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('vaveva_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (product, color, size, quantity = 1) => {
    // Optimistic UI update
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product?._id === product._id && item.color === color && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, color, size, quantity }];
      }
    });

    // If authenticated, sync with backend database
    if (user && token) {
      try {
        await axios.post('/api/cart', {
          productId: product._id,
          color,
          size,
          quantity
        });
      } catch (err) {
        console.error('[Add To Cart DB Error]:', err);
      }
    }

    toast.success(`Added ${product.name} (${color} / ${size}) to Bag`, {
      style: {
        background: '#111111',
        color: '#FBF9F5',
        borderRadius: '0px',
        border: '1px solid #C5A880'
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = async (index) => {
    const itemToRemove = cartItems[index];
    setCartItems((prev) => prev.filter((_, i) => i !== index));

    if (user && token && itemToRemove?.product) {
      try {
        await axios.delete('/api/cart/item', {
          data: {
            productId: itemToRemove.product._id,
            color: itemToRemove.color,
            size: itemToRemove.size
          }
        });
      } catch (err) {
        console.error('[Remove Cart DB Error]:', err);
      }
    }
    toast.error('Item removed from bag');
  };

  const updateQuantity = async (index, delta) => {
    const targetItem = cartItems[index];
    if (!targetItem) return;

    const newQty = targetItem.quantity + delta;

    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }

    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });

    if (user && token && targetItem.product) {
      try {
        await axios.put('/api/cart/update', {
          productId: targetItem.product._id,
          color: targetItem.color,
          size: targetItem.size,
          quantity: newQty
        });
      } catch (err) {
        console.error('[Update Cart Qty DB Error]:', err);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('vaveva_cart');

    if (user && token) {
      try {
        await axios.delete('/api/cart/clear');
      } catch (err) {
        console.error('[Clear Cart DB Error]:', err);
      }
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const freeShippingThreshold = 1499;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const tax = Math.round(subtotal * 0.05); // 5% Luxury Tax
  const grandTotal = Math.max(0, subtotal + shippingFee + tax - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        shippingFee,
        tax,
        discountAmount,
        grandTotal,
        appliedCoupon,
        setAppliedCoupon,
        freeShippingThreshold,
        loadingCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
