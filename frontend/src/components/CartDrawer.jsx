import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    tax,
    discountAmount,
    grandTotal,
    appliedCoupon,
    setAppliedCoupon,
    freeShippingThreshold
  } = useCart();

  const { requireAuth } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await axios.post('/api/coupons/validate', {
        code: couponCode,
        cartTotal: subtotal
      });
      setAppliedCoupon(res.data);
      toast.success(res.data.message);
      setCouponCode('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid promo code');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleProceedCheckout = () => {
    requireAuth('checkout', () => {
      closeCart();
      navigate('/checkout');
    });
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col justify-between border-l border-[#E5E2DA]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E5E2DA] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} />
                <h2 className="font-serif text-xl tracking-wider uppercase font-medium">
                  Shopping Bag ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-gray-500 hover:text-[#111111] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-[#EFECE6] p-4 border-b border-[#E5E2DA]">
              <p className="text-xs text-[#111111] font-medium tracking-wide mb-2">
                {amountForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">🎉 You unlocked FREE Express Delivery!</span>
                ) : (
                  <>Add <span className="font-bold">₹{amountForFreeShipping.toLocaleString()}</span> more for Free Shipping</>
                )}
              </p>
              <div className="w-full bg-[#E5E2DA] h-1.5 overflow-hidden">
                <div
                  className="bg-[#111111] h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center justify-center">
                  <ShoppingBag size={48} className="text-gray-300 mb-4 stroke-1" />
                  <p className="font-serif text-lg text-gray-700">Your shopping bag is empty</p>
                  <p className="text-xs text-gray-400 mt-1 mb-6">Discover timeless pieces in our collection</p>
                  <button
                    onClick={closeCart}
                    className="bg-[#111111] text-[#FBF9F5] px-6 py-3 text-xs uppercase tracking-widest"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex space-x-4 border-b border-[#E5E2DA] pb-6">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover bg-[#EFECE6] border border-[#E5E2DA]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-medium text-[#111111]">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="text-gray-400 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Variant: {item.color} | Size: {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E5E2DA] bg-[#F4F1EA]">
                          <button
                            onClick={() => updateQuantity(idx, -1)}
                            className="px-2 py-1 text-gray-600 hover:text-black"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(idx, 1)}
                            className="px-2 py-1 text-gray-600 hover:text-black"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-[#111111]">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Promo & Subtotal */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#E5E2DA] bg-[#F7F5F0] space-y-4">
                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. VAVEVA15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-white border border-[#E5E2DA] py-2 pl-9 pr-3 text-xs uppercase tracking-wider focus:outline-none font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-[#111111] text-[#FBF9F5] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-[#C5A880] hover:text-[#111111] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 p-2 text-xs border border-emerald-200">
                    <span>Coupon {appliedCoupon.code} applied</span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Calculation breakdown */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-[#111111] pt-2 border-t border-[#E5E2DA]">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedCheckout}
                  className="w-full bg-[#111111] text-[#FBF9F5] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C5A880] hover:text-[#111111] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Proceed To Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
