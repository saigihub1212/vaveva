import React, { useState, useEffect } from 'react';
import { IndianRupee, ShoppingBag, Users, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import adminApi from '../utils/adminApi';

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    metrics: {
      totalSales: 1845320,
      salesGrowth: '+12.5%',
      totalOrders: 1248,
      ordersGrowth: '+8.3%',
      totalCustomers: 8432,
      customersGrowth: '+15.2%',
      totalProfit: 765410,
      profitGrowth: '+10.1%'
    },
    salesChart: [
      { date: '1 May', sales: 124000 },
      { date: '7 May', sales: 185000 },
      { date: '14 May', sales: 210000 },
      { date: '21 May', sales: 328430 },
      { date: '28 May', sales: 295000 },
      { date: 'Today', sales: 1845320 }
    ],
    categoryDistribution: [
      { name: 'T-Shirts', value: 35, color: '#D4AF37' },
      { name: 'Shirts', value: 25, color: '#3B82F6' },
      { name: 'Pants', value: 18, color: '#10B981' },
      { name: 'Hoodies', value: 12, color: '#8B5CF6' },
      { name: 'Others', value: 10, color: '#64748B' }
    ],
    recentOrders: [
      { orderId: 'VAV-12345', user: { name: 'Arjun Kumar' }, totalPrice: 2199, orderStatus: 'Delivered', createdAt: 'Today' },
      { orderId: 'VAV-12344', user: { name: 'Rahul Sharma' }, totalPrice: 1799, orderStatus: 'Shipped', createdAt: 'Today' },
      { orderId: 'VAV-12343', user: { name: 'Vishnu Prasad' }, totalPrice: 3299, orderStatus: 'Packed', createdAt: 'Today' },
      { orderId: 'VAV-12342', user: { name: 'Aditya Verma' }, totalPrice: 1199, orderStatus: 'Delivered', createdAt: 'Yesterday' }
    ],
    lowStockProducts: [
      { name: 'Oversized Hoodie', totalStock: 3 },
      { name: 'Baggy Pants', totalStock: 2 },
      { name: 'Linen Shirt', totalStock: 4 }
    ]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.get('/admin/dashboard');
        if (res.data && res.data.metrics) {
          setStats(res.data);
        }
      } catch (err) {
        // Keep default mock stats if network error
      }
    };
    fetchStats();
  }, []);

  const { metrics, salesChart, categoryDistribution, recentOrders, lowStockProducts } = stats;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">Dashboard</h1>
          <p className="text-xs text-gray-400">Overview of sales performance, orders, and active inventory</p>
        </div>
        <div className="bg-[#16161D] border border-[#272733] px-3 py-1.5 text-xs text-[#D4AF37] font-mono">
          This Month
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#16161D] border border-[#272733] p-6 space-y-2">
          <div className="flex justify-between items-center text-gray-400 text-xs uppercase tracking-wider font-semibold">
            <span>Total Sales</span>
            <span className="text-emerald-400 flex items-center font-mono">{metrics.salesGrowth}</span>
          </div>
          <p className="text-3xl font-bold text-white font-mono">
            ₹{metrics.totalSales.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#16161D] border border-[#272733] p-6 space-y-2">
          <div className="flex justify-between items-center text-gray-400 text-xs uppercase tracking-wider font-semibold">
            <span>Orders</span>
            <span className="text-emerald-400 flex items-center font-mono">{metrics.ordersGrowth}</span>
          </div>
          <p className="text-3xl font-bold text-white font-mono">
            {metrics.totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#16161D] border border-[#272733] p-6 space-y-2">
          <div className="flex justify-between items-center text-gray-400 text-xs uppercase tracking-wider font-semibold">
            <span>Customers</span>
            <span className="text-emerald-400 flex items-center font-mono">{metrics.customersGrowth}</span>
          </div>
          <p className="text-3xl font-bold text-white font-mono">
            {metrics.totalCustomers.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#16161D] border border-[#272733] p-6 space-y-2">
          <div className="flex justify-between items-center text-gray-400 text-xs uppercase tracking-wider font-semibold">
            <span>Total Profit</span>
            <span className="text-emerald-400 flex items-center font-mono">{metrics.profitGrowth}</span>
          </div>
          <p className="text-3xl font-bold text-[#D4AF37] font-mono">
            ₹{metrics.totalProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-8 bg-[#16161D] border border-[#272733] p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
            Sales Overview Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChart}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#666666" fontSize={10} />
                <YAxis stroke="#666666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#16161D', borderColor: '#272733', color: '#FFF' }} />
                <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Distribution */}
        <div className="lg:col-span-4 bg-[#16161D] border border-[#272733] p-6 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Top Selling Categories
          </h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#16161D', borderColor: '#272733' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#272733]">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex items-center space-x-2 text-[10px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span>{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-[#16161D] border border-[#272733] p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-300">
              <thead className="bg-[#1E1E26] uppercase text-[10px] tracking-wider text-gray-400">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272733]">
                {recentOrders.map((ord) => (
                  <tr key={ord.orderId}>
                    <td className="p-3 font-mono font-bold text-white">{ord.orderId}</td>
                    <td className="p-3">{ord.user?.name || 'Customer'}</td>
                    <td className="p-3 font-mono">₹{ord.totalPrice?.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="bg-[#272733] text-[#D4AF37] px-2 py-0.5 text-[10px] uppercase font-bold">
                        {ord.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="lg:col-span-4 bg-[#16161D] border border-[#272733] p-6">
          <div className="flex items-center space-x-2 text-amber-400 mb-4">
            <AlertTriangle size={18} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Low Stock Alerts</h3>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center bg-[#1E1E26] p-3 border border-[#272733]">
                <div>
                  <p className="text-xs font-semibold text-white">{p.name}</p>
                  <p className="text-[10px] text-red-400 font-mono">Stock: {p.totalStock} left</p>
                </div>
                <span className="bg-red-950 text-red-300 text-[10px] px-2 py-1 uppercase font-bold">Restock</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
