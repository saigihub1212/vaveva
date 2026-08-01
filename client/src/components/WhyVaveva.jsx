import React from 'react';
import { Award, Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';

export const WhyVaveva = () => {
  const features = [
    { icon: Award, title: 'Premium Fabric', desc: '100% Organic Heavyweight Cotton & French Linen' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Free express shipping on orders over ₹1499' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '7 days hassle-free exchange & return guarantee' },
    { icon: ShieldCheck, title: 'Secure Payments', desc: 'Encrypted Checkout with Stripe & Razorpay' },
    { icon: Headphones, title: '24/7 Support', desc: 'Dedicated client support team' }
  ];

  return (
    <section className="py-14 bg-[#F5F5F5] border-y border-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex flex-col items-center space-y-2 p-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#111111] shadow-sm border border-[#EEEEEE]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#111111] pt-1">
                  {f.title}
                </h4>
                <p className="text-[11px] text-[#666666] font-light max-w-[160px] leading-tight">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
