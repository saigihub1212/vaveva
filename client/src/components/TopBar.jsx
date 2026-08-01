import React from 'react';

export const TopBar = () => {
  return (
    <div className="bg-[#111111] text-[#FFFFFF] py-1.5 px-4 text-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium font-mono z-50 relative">
      <span>FREE SHIPPING ON ORDERS ABOVE ₹1499</span>
      <span className="mx-3 opacity-40">|</span>
      <span>EASY 7 DAYS RETURNS</span>
    </div>
  );
};
