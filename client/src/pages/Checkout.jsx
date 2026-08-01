import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Truck, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const { cartItems, subtotal, shippingFee, tax, discountAmount, grandTotal, clearCart, appliedCoupon } = useCart();
  const { user, requireAuth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('address'); // 'address' | 'payment'
  const [loading, setLoading] = useState(false);

  // Address State
  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: defaultAddr?.street || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || '',
    zipCode: defaultAddr?.zipCode || '',
    country: 'India'
  });

  useEffect(() => {
    if (user) {
      const def = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];
      setAddress({
        fullName: user.name || '',
        phone: user.phone || '',
        street: def?.street || '',
        city: def?.city || '',
        state: def?.state || '',
        zipCode: def?.zipCode || '',
        country: 'India'
      });
    }
  }, [user]);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="font-serif text-3xl">Your bag is empty</h2>
        <p className="text-xs text-gray-500 mt-2 mb-6">Add luxury items to your shopping bag to proceed with checkout.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#111111] text-[#FBF9F5] px-8 py-3 text-xs uppercase tracking-widest font-bold rounded-xl"
        >
          Return To Showroom
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    requireAuth('checkout', async () => {
      setLoading(true);
      try {
        const orderPayload = {
          orderItems: cartItems.map((item) => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.images?.[0] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
            price: item.product.price,
            color: item.color,
            size: item.size,
            quantity: item.quantity
          })),
          shippingAddress: address,
          paymentMethod,
          itemsPrice: subtotal,
          taxPrice: tax,
          shippingPrice: shippingFee,
          discountPrice: discountAmount,
          totalPrice: grandTotal
        };

        const res = await axios.post('/api/orders', orderPayload);
        await clearCart();
        toast.success('Order placed successfully!', { icon: '🛍️' });
        navigate(`/order-success/${res.data.orderId || res.data._id}`);
      } catch (error) {
        console.error('[Place Order Error]:', error);
        toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 'Please sign in to place your order.');
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal mb-8 uppercase tracking-wide">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Checkout Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Address Step */}
          <div className="bg-[#EFECE6] p-6 sm:p-7 border border-[#E5E2DA] rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg font-semibold flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Shipping Address</span>
              </h3>
              {step !== 'address' && (
                <button onClick={() => setStep('address')} className="text-xs text-[#C5A880] underline font-bold">Edit</button>
              )}
            </div>

            {step === 'address' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep('payment');
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#E5E2DA] py-2.5 px-3 text-xs focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#E5E2DA] py-2.5 px-3 text-xs focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House number, street name, apartment"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#E5E2DA] py-2.5 px-3 text-xs focus:outline-none rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">City</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#E5E2DA] py-2.5 px-3 text-xs focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">State</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#E5E2DA] py-2.5 px-3 text-xs focus:outline-none rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Zip / Pincode</label>
                    <input
                      type="text"
                      required
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#E5E2DA] py-2.5 px-3 text-xs focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#111111] text-[#FBF9F5] py-3 text-xs uppercase tracking-[0.2em] font-semibold mt-4 rounded-xl shadow-sm hover:bg-[#333]"
                >
                  Continue To Payment
                </button>
              </form>
            ) : (
              <p className="text-xs text-gray-600 font-mono">
                {address.fullName}, {address.street}, {address.city}, {address.state} {address.zipCode} | {address.phone}
              </p>
            )}
          </div>

          {/* Payment Method Step */}
          <div className="bg-[#EFECE6] p-6 sm:p-7 border border-[#E5E2DA] rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg font-semibold flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Payment Method</span>
              </h3>
            </div>

            {step === 'payment' && (
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('Stripe')}
                  className={`p-4 border rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'Stripe' ? 'border-[#111111] bg-white shadow-sm' : 'border-[#E5E2DA]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard size={20} />
                    <span className="text-xs uppercase font-semibold">Credit / Debit Card (Stripe)</span>
                  </div>
                  {paymentMethod === 'Stripe' && <Check size={18} className="text-emerald-700" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('Razorpay')}
                  className={`p-4 border rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'Razorpay' ? 'border-[#111111] bg-white shadow-sm' : 'border-[#E5E2DA]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={20} />
                    <span className="text-xs uppercase font-semibold">UPI / NetBanking / GPay (Razorpay)</span>
                  </div>
                  {paymentMethod === 'Razorpay' && <Check size={18} className="text-emerald-700" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('Cash On Delivery')}
                  className={`p-4 border rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'Cash On Delivery' ? 'border-[#111111] bg-white shadow-sm' : 'border-[#E5E2DA]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck size={20} />
                    <span className="text-xs uppercase font-semibold">Cash On Delivery</span>
                  </div>
                  {paymentMethod === 'Cash On Delivery' && <Check size={18} className="text-emerald-700" />}
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-[#111111] text-[#FBF9F5] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#333] transition-all flex items-center justify-center space-x-2 mt-6 rounded-xl shadow-md"
                >
                  <span>{loading ? 'Processing Order...' : `Place Order (₹${grandTotal.toLocaleString()})`}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-[#F7F5F0] p-6 border border-[#E5E2DA] rounded-2xl h-fit space-y-6 shadow-sm">
          <h3 className="font-serif text-lg font-semibold border-b border-[#E5E2DA] pb-3">
            Order Summary ({cartItems.length} items)
          </h3>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex space-x-3 items-center bg-white p-3 rounded-xl border border-[#E5E2DA]">
                <img src={item.product?.images?.[0]} alt={item.product?.name} className="w-14 h-18 object-cover rounded-lg border border-[#E5E2DA]" />
                <div className="flex-1 text-xs">
                  <p className="font-serif font-semibold">{item.product?.name}</p>
                  <p className="text-gray-500 font-mono text-[10px]">
                    Qty: {item.quantity} | {item.color} | {item.size}
                  </p>
                </div>
                <span className="text-xs font-bold">₹{((item.product?.price || 0) * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E2DA] pt-4 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span></div>
            <div className="flex justify-between"><span>Taxes (5%)</span><span>₹{tax.toLocaleString()}</span></div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#111111] pt-3 border-t border-[#E5E2DA]">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
