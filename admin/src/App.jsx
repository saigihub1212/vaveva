import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminOverview } from './pages/AdminOverview';
import { AdminProducts } from './pages/AdminProducts';
import { AdminInventory } from './pages/AdminInventory';
import { AdminOrders } from './pages/AdminOrders';
import { AdminCoupons } from './pages/AdminCoupons';

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#0C0C0F] text-[#EEEEEE]">
      <Toaster position="top-right" />
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/coupons" element={<AdminCoupons />} />
          <Route path="/admin/*" element={<AdminOverview />} />
        </Routes>
      </main>
    </div>
  );
}
