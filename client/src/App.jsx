import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-white text-[#111111]">
      <ScrollToTop />
      <Toaster position="top-right" />

      
      {/* Intro Animation */}
      <IntroAnimation onComplete={() => setIsIntroPlaying(false)} />

      {/* Top Announcement Bar - always visible at very top */}
      <TopBar />

      {/* Navbar - fixed so hero bleeds seamlessly beneath it */}
      <Navbar isIntroPlaying={isIntroPlaying} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Auth Modal */}
      <AuthModal />

      {/* Main Views */}
      {/* Main: no top padding needed since Navbar is sticky (not fixed) */}
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
