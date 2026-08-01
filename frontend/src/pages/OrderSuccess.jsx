import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck } from 'lucide-react';

export const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={48} />
      </div>

      <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
        Thank You For Buying From VAVEVA
      </span>

      <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111111] mt-2 mb-4">
        Order Confirmed!
      </h1>

      <p className="text-sm text-gray-600 font-mono mb-8">
        Order ID: <span className="font-bold text-[#111111]">{orderId || 'VAV-884920'}</span>
      </p>

      <div className="bg-[#EFECE6] border border-[#E5E2DA] p-6 text-left mb-8 space-y-4">
        <div className="flex items-center space-x-3 text-xs text-[#111111] font-medium">
          <Truck size={18} className="text-[#C5A880]" />
          <span>Estimated Delivery: 3 to 5 Business Days</span>
        </div>
        <p className="text-xs text-gray-600 font-light leading-relaxed">
          We have dispatched your order details to our Milan fulfillment center. You will receive an SMS and email update once your parcel is packed and assigned a tracking code.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to={`/dashboard?tab=orders`}
          className="w-full sm:w-auto bg-[#111111] text-[#FBF9F5] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#111111] transition-all flex items-center justify-center space-x-2"
        >
          <Package size={16} />
          <span>Track Order Status</span>
        </Link>

        <Link
          to="/shop"
          className="w-full sm:w-auto border border-[#111111] text-[#111111] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#111111] hover:text-[#FBF9F5] transition-all"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
};
