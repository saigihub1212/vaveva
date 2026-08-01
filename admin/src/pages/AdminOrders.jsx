import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, RefreshCw, Eye, Search } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/orders');
      setOrders(res.data || []);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, {
        status: newStatus
      });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const statuses = [
    'Pending',
    'Confirmed',
    'Packed',
    'Shipped',
    'Out For Delivery',
    'Delivered',
    'Cancelled',
    'Returned',
    'Refunded'
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Order Management</h1>
          <p className="text-xs text-gray-400">Track fulfillment lifecycle, assign tracking numbers, and update order status</p>
        </div>
      </div>

      <div className="bg-[#16161D] border border-[#272733]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="bg-[#1E1E26] uppercase text-[10px] tracking-wider text-gray-400">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272733]">
              {orders.map((ord) => (
                <tr key={ord._id} className="hover:bg-[#1E1E26]/50">
                  <td className="p-3 font-mono font-bold text-white">{ord.orderId}</td>
                  <td className="p-3">
                    <p className="font-semibold text-white">{ord.user?.name || ord.shippingAddress?.fullName || 'Customer'}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{ord.shippingAddress?.city}</p>
                  </td>
                  <td className="p-3 font-mono">{ord.orderItems?.length || 1} items</td>
                  <td className="p-3 font-mono font-bold text-white">₹{ord.totalPrice?.toLocaleString()}</td>
                  <td className="p-3 uppercase font-mono text-[10px]">{ord.paymentMethod}</td>
                  <td className="p-3">
                    <span className="bg-[#272733] text-[#D4AF37] px-2.5 py-1 text-[10px] uppercase font-bold border border-[#D4AF37]/30">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                      className="bg-[#1E1E26] border border-[#272733] py-1.5 px-2 text-xs text-white focus:outline-none"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
