import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Box, Package, Users, Tag, Image, BarChart3, Settings, LogOut } from 'lucide-react';

export const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: ShoppingBag },
    { label: 'Inventory', path: '/admin/inventory', icon: Box },
    { label: 'Orders', path: '/admin/orders', icon: Package },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Banners (CMS)', path: '/admin/banners', icon: Image },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#16161D] border-r border-[#272733] flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-[#272733] flex items-center space-x-3">
          <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center font-serif text-lg text-[#D4AF37]">
            V
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-[0.2em] font-bold text-[#EEEEEE] uppercase">
              VAVEVA
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono">
              Admin Executive
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded-none transition-colors ${
                  isActive
                    ? 'bg-[#272733] text-[#D4AF37] border-l-2 border-[#D4AF37]'
                    : 'text-gray-400 hover:text-white hover:bg-[#1E1E26]'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-[#272733]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0C0C0F] font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Admin Super</p>
              <p className="text-[10px] text-gray-400">admin@vaveva.com</p>
            </div>
          </div>
          <button
            onClick={() => (window.location.href = '/')}
            className="p-1.5 text-gray-400 hover:text-red-400"
            title="Exit to Store"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
