import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { IntroAnimation } from './components/IntroAnimation';

import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { UserDashboard } from './pages/UserDashboard';

// Admin imports
import { AdminAuthGuard } from './admin/components/AdminAuthGuard';
import { AdminSidebar } from './admin/components/AdminSidebar';
import { AdminOverview } from './admin/pages/AdminOverview';
import { AdminProducts } from './admin/pages/AdminProducts';
import { AdminInventory } from './admin/pages/AdminInventory';
import { AdminOrders } from './admin/pages/AdminOrders';
import { AdminCoupons } from './admin/pages/AdminCoupons';

function AdminLayoutWrapper({ onLogout }) {
  return (
    <div className="flex min-h-screen bg-[#0C0C0F] text-[#EEEEEE]">
      <Toaster position="top-right" />
      <AdminSidebar onLogout={onLogout} />
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

export default function App() {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  // If on /admin path, render Admin Dashboard layout with AdminAuthGuard
  if (isAdminRoute) {
    return (
      <AdminAuthGuard>
        <AdminLayoutWrapper />
      </AdminAuthGuard>
    );
  }

  // Otherwise render Customer Storefront layout
  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-white text-[#111111]">
      <ScrollToTop />
      <Toaster position="top-right" />

      {/* Intro Animation */}
      <IntroAnimation onComplete={() => setIsIntroPlaying(false)} />

      {/* Top Announcement Bar */}
      <TopBar />

      {/* Navbar */}
      <Navbar isIntroPlaying={isIntroPlaying} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Auth Modal */}
      <AuthModal />

      {/* Main Store Views */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Category />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
