import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';
import adminApi from '../utils/adminApi';
import toast from 'react-hot-toast';

export const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minPurchase, setMinPurchase] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await adminApi.get('/coupons');
      setCoupons(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/coupons', {
        code,
        discountType,
        discountValue: Number(discountValue),
        minPurchase: Number(minPurchase || 0),
        expiryDate: new Date('2027-12-31')
      });
      toast.success('Coupon created successfully!');
      setCode('');
      setDiscountValue('');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to create coupon');
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Coupons & Promo Vouchers</h1>
        <p className="text-xs text-gray-400">Generate discount codes for promotional campaigns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 bg-[#16161D] border border-[#272733] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create New Voucher</h3>
          <form onSubmit={handleCreateCoupon} className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase text-gray-400 mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="LUXURY20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white uppercase font-mono focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase text-gray-400 mb-1">Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase text-gray-400 mb-1">Discount Value</label>
                <input
                  type="number"
                  required
                  placeholder="20"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-gray-400 mb-1">Min Purchase (₹)</label>
              <input
                type="number"
                placeholder="1499"
                value={minPurchase}
                onChange={(e) => setMinPurchase(e.target.value)}
                className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-[#0C0C0F] py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Generate Coupon
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-7 bg-[#16161D] border border-[#272733] p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Active Vouchers</h3>
          <div className="space-y-3">
            {coupons.map((c) => (
              <div key={c._id || c.code} className="bg-[#1E1E26] p-4 border border-[#272733] flex justify-between items-center">
                <div>
                  <span className="font-mono text-lg font-bold text-[#D4AF37] tracking-widest">{c.code}</span>
                  <p className="text-xs text-gray-400">
                    {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`} on orders above ₹{c.minPurchase}
                  </p>
                </div>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] uppercase font-bold px-2 py-1">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
