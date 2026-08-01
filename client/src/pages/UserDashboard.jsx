import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  Tag,
  LogOut,
  MapPin,
  CheckCircle,
  Clock,
  Truck,
  Box,
  Trash2,
  Check,
  ShieldCheck,
  Mail,
  Phone,
  Lock,
  Camera,
  Printer,
  X,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export const UserDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'orders';

  const { user, logout, updateUserData } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || '');
  const [newPassword, setNewPassword] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Address Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
      setProfilePhone(user.phone || '');
      setProfileAvatar(user.avatar || '');
      setFullName(user.name || '');
      setNewPhone(user.phone || '');
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      // Try /api/orders/my-orders or /api/orders/myorders
      const res = await axios.get('/api/orders/my-orders');
      setOrders(res.data || []);
    } catch (error) {
      try {
        const fallbackRes = await axios.get('/api/orders/myorders');
        setOrders(fallbackRes.data || []);
      } catch (err) {
        console.error('[Fetch Orders Error]:', err);
        setOrders([]);
      }
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Profile Submit
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const payload = {
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        avatar: profileAvatar
      };
      if (newPassword) payload.password = newPassword;

      const res = await axios.put('/api/auth/profile', payload);
      updateUserData(res.data);
      toast.success('Profile updated successfully!');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Add Address Submit
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      const res = await axios.post('/api/auth/address', {
        fullName: fullName || user.name,
        phone: newPhone || user.phone || '+91 99887 76655',
        street: newStreet,
        city: newCity,
        state: newState,
        zipCode: newZip,
        isDefault: user?.addresses?.length === 0
      });
      updateUserData({ ...user, addresses: res.data });
      toast.success('New delivery address added');
      setNewStreet('');
      setNewCity('');
      setNewState('');
      setNewZip('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding address');
    } finally {
      setSavingAddress(false);
    }
  };

  // Delete Address
  const handleDeleteAddress = async (addressId) => {
    try {
      const res = await axios.delete(`/api/auth/address/${addressId}`);
      updateUserData({ ...user, addresses: res.data });
      toast.success('Address removed');
    } catch (err) {
      toast.error('Failed to remove address');
    }
  };

  // Set Default Address
  const handleSetDefaultAddress = async (addressId) => {
    try {
      const res = await axios.put(`/api/auth/address/${addressId}/default`);
      updateUserData({ ...user, addresses: res.data });
      toast.success('Default address updated');
    } catch (err) {
      toast.error('Failed to set default address');
    }
  };

  // Reorder Items
  const handleReorder = (order) => {
    if (!order.orderItems || order.orderItems.length === 0) return;
    order.orderItems.forEach((item) => {
      addToCart(
        {
          _id: item.product?._id || item.product,
          name: item.name || item.title,
          price: item.price,
          images: [item.image]
        },
        item.color,
        item.size,
        item.quantity
      );
    });
    toast.success(`Reordered ${order.orderItems.length} items to your Bag!`, { icon: '🛍️' });
  };

  // Cancel Order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancellingOrderId(orderId);
    try {
      await axios.put(`/api/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancellingOrderId(null);
    }
  };

  const printInvoice = (order) => {
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.orderId}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1A1A1A; background: #FFF; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1A1A1A; padding-bottom: 20px; }
            .brand { font-family: serif; font-size: 28px; font-weight: bold; letter-spacing: 4px; }
            .inv-title { font-size: 14px; text-transform: uppercase; color: #C7A97B; letter-spacing: 2px; }
            .meta { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 12px; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th { background: #F8F7F4; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; padding: 12px; text-align: left; border-bottom: 1px solid #E8E4DD; }
            td { padding: 14px 12px; font-size: 12px; border-bottom: 1px solid #E8E4DD; }
            .total-box { text-align: right; margin-top: 30px; font-size: 16px; font-weight: bold; }
            .footer { margin-top: 50px; text-align: center; font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">VAVEVA</div>
              <div class="inv-title">Luxury Fashion Invoice</div>
            </div>
            <div style="text-align: right; font-size: 12px;">
              <p><strong>Invoice ID:</strong> ${order.orderId}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div class="meta">
            <div>
              <strong>Billed To:</strong><br/>
              ${order.shippingAddress?.fullName}<br/>
              ${order.shippingAddress?.street}<br/>
              ${order.shippingAddress?.city}, ${order.shippingAddress?.state} ${order.shippingAddress?.zipCode}<br/>
              Phone: ${order.shippingAddress?.phone}
            </div>
            <div style="text-align: right;">
              <strong>Payment Summary:</strong><br/>
              Method: ${order.paymentMethod}<br/>
              Payment Status: ${order.isPaid ? 'Paid' : 'Pending'}<br/>
              Shipping Courier: ${order.courier || 'FedEx Air Express'}
            </div>
          </div>

          <table>
            <thead>
              <tr><th>Item Description</th><th>Color / Size</th><th>Unit Price</th><th>Qty</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              ${order.orderItems.map(item => `
                <tr>
                  <td><strong>${item.name || item.title}</strong></td>
                  <td>${item.color} | ${item.size}</td>
                  <td>₹${item.price.toLocaleString()}</td>
                  <td>${item.quantity}</td>
                  <td>₹${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-box">
            <p style="font-size: 12px; color: #666; font-weight: normal;">Subtotal: ₹${(order.itemsPrice || order.totalPrice).toLocaleString()}</p>
            <p style="font-size: 12px; color: #666; font-weight: normal;">Shipping: ${order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</p>
            <p style="font-size: 12px; color: #666; font-weight: normal;">Tax (5%): ₹${(order.taxPrice || 0).toLocaleString()}</p>
            <p style="margin-top: 10px; font-size: 18px; color: #1A1A1A;">Grand Total: ₹${order.totalPrice.toLocaleString()}</p>
          </div>

          <div class="footer">
            Thank you for shopping with VAVEVA — Authentic Luxury Fashion 2026
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const getStatusStepIndex = (status) => {
    const steps = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered'];
    const idx = steps.indexOf(status);
    return idx === -1 ? 1 : idx;
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-[#C7A97B] text-white border-[#C7A97B]';
      case 'Shipped':
      case 'Out For Delivery':
        return 'bg-[#0F5132] text-white border-[#0F5132]';
      case 'Cancelled':
        return 'bg-[#991B1B] text-white border-[#991B1B]';
      default:
        return 'bg-[#1A1A1A] text-white border-[#1A1A1A]';
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Jan 2026';

  const clientId = user?._id ? `VAV-${user._id.slice(-6).toUpperCase()}` : 'VAV-CLIENT-8492';

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] pt-4 sm:pt-6 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. EDITORIAL PROFILE HEADER */}
        <div className="bg-[#FFFFFF] border border-[#E8E4DD] rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            {/* Left: Avatar + Name + Metadata */}
            <div className="flex items-center space-x-5">
              <div className="relative shrink-0">
                <div className="w-[72px] h-[72px] rounded-full bg-[#1A1A1A] text-[#FFFFFF] flex items-center justify-center text-2xl font-bold font-serif shadow-md border-2 border-[#C7A97B] overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name ? user.name.charAt(0).toUpperCase() : 'V'
                  )}
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active Session" />
              </div>

              <div>
                <div className="flex items-center space-x-2.5">
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-semibold tracking-tight">
                    {user?.name || 'Valued Client'}
                  </h1>
                  <span className="bg-[#1A1A1A] text-[#C7A97B] text-[9px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-[#C7A97B]/40 hidden sm:inline-block">
                    VAVEVA VIP Gold
                  </span>
                </div>
                <p className="text-xs text-[#666666] font-mono mt-0.5">{user?.email}</p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#666666] mt-2 font-mono">
                  <span>Member ID: <strong className="text-[#1A1A1A]">{clientId}</strong></span>
                  <span>•</span>
                  <span>Customer Since: <strong className="text-[#1A1A1A]">{formattedDate}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">Session Active</span>
                </div>
              </div>
            </div>

            {/* Right: Sign Out Button */}
            <div className="flex items-center space-x-3 w-full lg:w-auto justify-end border-t lg:border-t-0 border-[#E8E4DD] pt-4 lg:pt-0">
              {user?.role === 'admin' && (
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#C7A97B] text-white hover:bg-[#b09062] px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <Sparkles size={14} />
                  <span>Admin Dashboard</span>
                </a>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-[#FFFFFF] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] text-[#1A1A1A] border border-[#E8E4DD] px-5 py-2.5 text-xs uppercase tracking-widest font-bold rounded-xl transition-all shadow-sm flex items-center space-x-2"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>

        {/* 2. MAIN 12-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* SIDEBAR NAVIGATION (Desktop: 3 cols | Mobile/Tablet: Horizontal scroll drawer) */}
          <div className="lg:col-span-3 space-y-2">
            {/* Desktop Sidebar Links */}
            <div className="bg-[#FFFFFF] border border-[#E8E4DD] rounded-2xl p-3 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-1.5 hidden lg:block">
              {[
                { id: 'orders', label: 'Orders & Tracking', count: orders.length, icon: Package },
                { id: 'wishlist', label: 'Saved Wishlist', count: wishlist.length, icon: Heart },
                { id: 'addresses', label: 'Saved Addresses', count: user?.addresses?.length || 0, icon: MapPin },
                { id: 'profile', label: 'Profile Settings', icon: User },
                { id: 'coupons', label: 'Exclusive Vouchers', icon: Tag }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSearchParams({ tab: tab.id })}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all rounded-xl relative ${
                      isActive
                        ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-sm'
                        : 'bg-[#F3F0EB] text-[#1A1A1A] hover:bg-[#EFEAE2]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {isActive && <div className="w-1 h-4 bg-[#C7A97B] rounded-full absolute left-1.5" />}
                      <Icon size={16} className={isActive ? 'text-[#C7A97B]' : 'text-[#666666]'} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive ? 'bg-[#C7A97B] text-[#1A1A1A]' : 'bg-[#E8E4DD] text-[#666666]'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile / Tablet Horizontal Scroll Tab Drawer */}
            <div className="lg:hidden flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'wishlist', label: 'Wishlist', icon: Heart },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'coupons', label: 'Vouchers', icon: Tag }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSearchParams({ tab: tab.id })}
                    className={`flex items-center space-x-2 px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap rounded-xl transition-all border ${
                      isActive
                        ? 'bg-[#1A1A1A] text-[#FFFFFF] border-[#1A1A1A]'
                        : 'bg-[#FFFFFF] text-[#666666] border-[#E8E4DD]'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-[#C7A97B]' : ''} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN TAB CONTENT AREA (Desktop: 9 cols) */}
          <div className="lg:col-span-9">

            {/* ==================== ORDERS TAB ==================== */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#FFFFFF] p-6 border border-[#E8E4DD] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] gap-2">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A] font-semibold">Orders & Live Tracking</h2>
                    <p className="text-xs text-[#666666]">View and manage all your luxury purchases and shipment updates.</p>
                  </div>
                  <button
                    onClick={fetchOrders}
                    className="text-xs text-[#C7A97B] hover:underline font-bold uppercase tracking-wider flex items-center space-x-1"
                  >
                    <RotateCcw size={13} />
                    <span>Refresh Orders</span>
                  </button>
                </div>

                {loadingOrders ? (
                  <div className="text-center py-20 bg-[#FFFFFF] border border-[#E8E4DD] rounded-2xl shadow-sm">
                    <Package size={44} className="mx-auto text-[#C7A97B] mb-3 animate-bounce" />
                    <p className="font-serif text-lg text-[#1A1A1A]">Fetching your order history...</p>
                  </div>
                ) : orders.length === 0 ? (
                  /* PREMIUM EMPTY STATE FOR ORDERS */
                  <div className="text-center py-20 bg-[#FFFFFF] border border-[#E8E4DD] rounded-2xl p-8 shadow-sm">
                    <div className="w-20 h-20 bg-[#F8F7F4] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E8E4DD]">
                      <ShoppingBag size={36} className="text-[#C7A97B]" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">No Orders Yet</h3>
                    <p className="text-xs text-[#666666] max-w-md mx-auto mb-6 leading-relaxed">
                      You haven't placed any orders with VAVEVA yet. Explore our high-end luxury menswear catalogue to make your first purchase.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#C7A97B] hover:text-[#1A1A1A] px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-bold rounded-xl transition-all shadow-md"
                    >
                      <span>Explore Showroom</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => {
                    const currentStepIdx = getStatusStepIndex(ord.orderStatus);
                    const timelineSteps = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];
                    const canCancel = ['Pending', 'Confirmed'].includes(ord.orderStatus);

                    return (
                      <div
                        key={ord._id}
                        className="bg-[#FFFFFF] border border-[#E8E4DD] rounded-2xl p-6 sm:p-7 space-y-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all"
                      >
                        {/* Order Header Row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E8E4DD] pb-4 gap-3">
                          <div>
                            <div className="flex items-center space-x-3">
                              <span className="font-serif text-xl font-bold text-[#1A1A1A]">{ord.orderId}</span>
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${getStatusBadgeStyle(ord.orderStatus)}`}>
                                {ord.orderStatus}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#666666] font-mono mt-1">
                              Ordered: {new Date(ord.createdAt).toLocaleDateString()} | Method: {ord.paymentMethod} ({ord.isPaid ? 'Paid' : 'Unpaid'})
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#E8E4DD] pt-3 sm:pt-0">
                            <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                              ₹{ord.totalPrice?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Visual Live Order Tracker */}
                        <div className="py-2 bg-[#F8F7F4] p-4 sm:p-5 rounded-xl border border-[#E8E4DD]">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs uppercase tracking-widest text-[#C7A97B] font-bold flex items-center space-x-1.5">
                              <Truck size={14} />
                              <span>Live Shipment Tracking</span>
                            </span>
                            <span className="text-[11px] text-[#666666] font-mono">
                              Courier: <strong className="text-[#1A1A1A]">{ord.courier || 'FedEx Air Express'}</strong>
                            </span>
                          </div>

                          <div className="flex items-center justify-between relative max-w-xl mx-auto my-4">
                            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#E8E4DD] -translate-y-1/2 z-0" />
                            {/* Animated filler bar */}
                            <div
                              className="absolute top-1/2 left-4 h-0.5 bg-[#C7A97B] -translate-y-1/2 z-0 transition-all duration-500"
                              style={{ width: `${(currentStepIdx / (timelineSteps.length - 1)) * 90}%` }}
                            />

                            {timelineSteps.map((step, idx) => {
                              const isCompleted = idx <= currentStepIdx;
                              return (
                                <div key={step} className="relative z-10 flex flex-col items-center">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                      isCompleted
                                        ? 'bg-[#1A1A1A] text-[#C7A97B] border-2 border-[#C7A97B] shadow-sm'
                                        : 'bg-[#FFFFFF] text-[#666666] border border-[#E8E4DD]'
                                    }`}
                                  >
                                    {isCompleted ? <CheckCircle size={16} /> : idx + 1}
                                  </div>
                                  <span className="text-[10px] uppercase tracking-wider mt-2 font-semibold text-[#1A1A1A]">
                                    {step}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] text-[#666666] font-mono pt-2 border-t border-[#E8E4DD]/60 gap-1">
                            <span>Tracking Code: <strong className="text-[#1A1A1A]">{ord.trackingNumber || 'TRK-9948201'}</strong></span>
                            <span>Estimated Delivery: <strong className="text-[#1A1A1A]">{ord.estimatedDelivery || '3-5 Business Days'}</strong></span>
                          </div>
                        </div>

                        {/* Product Items Breakdown */}
                        <div className="space-y-3">
                          {ord.orderItems?.map((item, i) => (
                            <div key={i} className="flex items-center space-x-4 bg-[#F8F7F4] p-3.5 rounded-xl border border-[#E8E4DD]">
                              <img
                                src={item.image}
                                alt={item.name || item.title}
                                className="w-14 h-18 object-cover rounded-lg border border-[#E8E4DD] shrink-0"
                              />
                              <div className="flex-1 text-xs">
                                <p className="font-serif font-semibold text-[#1A1A1A] text-sm">{item.name || item.title}</p>
                                <p className="text-[#666666] text-[11px] mt-0.5 font-mono">
                                  Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                                </p>
                              </div>
                              <span className="text-xs font-bold text-[#1A1A1A]">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Address & Action Buttons Row */}
                        <div className="pt-3 border-t border-[#E8E4DD] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="text-xs text-[#666666]">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] block mb-0.5">Shipping Address</span>
                            <p className="font-mono text-[11px]">
                              {ord.shippingAddress?.fullName} — {ord.shippingAddress?.street}, {ord.shippingAddress?.city}, {ord.shippingAddress?.state} {ord.shippingAddress?.zipCode}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => printInvoice(ord)}
                              className="bg-[#FFFFFF] hover:bg-[#EFEAE2] text-[#1A1A1A] border border-[#E8E4DD] px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1"
                              title="Download Receipt"
                            >
                              <Printer size={13} />
                              <span>Invoice</span>
                            </button>

                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="bg-[#F3F0EB] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] text-[#1A1A1A] border border-[#E8E4DD] px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all"
                            >
                              Details
                            </button>

                            <button
                              onClick={() => handleReorder(ord)}
                              className="bg-[#1A1A1A] hover:bg-[#C7A97B] hover:text-[#1A1A1A] text-[#FFFFFF] px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1"
                            >
                              <RotateCcw size={13} />
                              <span>Reorder</span>
                            </button>

                            {canCancel && (
                              <button
                                onClick={() => handleCancelOrder(ord._id)}
                                disabled={cancellingOrderId === ord._id}
                                className="bg-[#991B1B]/10 hover:bg-[#991B1B] hover:text-[#FFFFFF] text-[#991B1B] border border-[#991B1B]/30 px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all"
                              >
                                {cancellingOrderId === ord._id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ==================== WISHLIST TAB ==================== */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="bg-[#FFFFFF] p-6 border border-[#E8E4DD] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
                  <h2 className="font-serif text-2xl text-[#1A1A1A] font-semibold">Saved Wishlist ({wishlist.length})</h2>
                  <p className="text-xs text-[#666666]">Your curated selection of luxury garments saved for later.</p>
                </div>

                {wishlist.length === 0 ? (
                  /* PREMIUM EMPTY STATE FOR WISHLIST */
                  <div className="text-center py-20 bg-[#FFFFFF] border border-[#E8E4DD] rounded-2xl p-8 shadow-sm">
                    <div className="w-20 h-20 bg-[#F8F7F4] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E8E4DD]">
                      <Heart size={36} className="text-[#C7A97B]" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">Your Wishlist is Empty</h3>
                    <p className="text-xs text-[#666666] max-w-md mx-auto mb-6">
                      Explore our high-end luxury menswear collection and click the heart icon to save your favorite items.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#C7A97B] hover:text-[#1A1A1A] px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-bold rounded-xl transition-all shadow-md"
                    >
                      <span>Browse Showroom</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                      <div key={product._id} className="bg-[#FFFFFF] border border-[#E8E4DD] p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full aspect-[3/4] object-cover rounded-xl mb-3 border border-[#E8E4DD]"
                        />
                        <div>
                          <h4 className="font-serif font-semibold text-sm text-[#1A1A1A] line-clamp-1">{product.name}</h4>
                          <p className="text-xs font-bold text-[#1A1A1A] mt-1">₹{product.price?.toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => addToCart(product, 'Obsidian Black', 'M', 1)}
                            className="flex-1 bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#C7A97B] hover:text-[#1A1A1A] py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all"
                          >
                            Move To Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="px-3 border border-[#991B1B] text-[#991B1B] hover:bg-[#991B1B] hover:text-white py-2.5 text-[10px] rounded-xl transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ==================== ADDRESSES TAB ==================== */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="bg-[#FFFFFF] p-6 border border-[#E8E4DD] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
                  <h2 className="font-serif text-2xl text-[#1A1A1A] font-semibold">Saved Delivery Addresses</h2>
                  <p className="text-xs text-[#666666]">Manage your delivery destinations for fast express checkout.</p>
                </div>

                {/* Existing Address List */}
                {user?.addresses && user.addresses.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className={`p-6 rounded-2xl border ${
                          addr.isDefault
                            ? 'border-[#C7A97B] bg-[#FFFFFF] shadow-md'
                            : 'border-[#E8E4DD] bg-[#FFFFFF]'
                        } relative`}
                      >
                        {addr.isDefault && (
                          <span className="absolute top-4 right-4 bg-[#C7A97B] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">
                            Default Address
                          </span>
                        )}
                        <p className="font-serif font-bold text-[#1A1A1A] text-base">{addr.fullName}</p>
                        <p className="text-xs text-[#666666] mt-1">{addr.street}</p>
                        <p className="text-xs text-[#666666]">{addr.city}, {addr.state} - {addr.zipCode}</p>
                        <p className="text-xs text-[#666666] font-mono mt-1">Phone: {addr.phone}</p>

                        <div className="mt-4 pt-3 border-t border-[#E8E4DD] flex items-center space-x-4">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(addr._id)}
                              className="text-[11px] uppercase font-bold text-[#C7A97B] hover:underline"
                            >
                              Set As Default
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="text-[11px] uppercase font-bold text-[#991B1B] hover:underline flex items-center space-x-1"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Address Form */}
                <div className="bg-[#FFFFFF] border border-[#E8E4DD] p-6 sm:p-7 rounded-2xl space-y-4 shadow-sm">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] flex items-center space-x-2">
                    <Plus size={15} className="text-[#C7A97B]" />
                    <span>Add New Delivery Address</span>
                  </h3>

                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Recipient Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Arjun Kumar"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Contact Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 99887 76655"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Street Address & Flat / House No.</label>
                      <input
                        type="text"
                        required
                        placeholder="172 MG Road, Koramangala"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        className="w-full bg-[#F8F7F4] border border-[#E8E4DD] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">City</label>
                        <input
                          type="text"
                          required
                          placeholder="Bengaluru"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">State</label>
                        <input
                          type="text"
                          required
                          placeholder="Karnataka"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Zip / Pincode</label>
                        <input
                          type="text"
                          required
                          placeholder="560034"
                          value={newZip}
                          onChange={(e) => setNewZip(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={savingAddress}
                      className="bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#C7A97B] hover:text-[#1A1A1A] px-7 py-3 text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-sm"
                    >
                      {savingAddress ? 'Saving Address...' : 'Save Address'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ==================== PROFILE SETTINGS TAB ==================== */}
            {activeTab === 'profile' && (
              <div className="bg-[#FFFFFF] border border-[#E8E4DD] p-6 sm:p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#1A1A1A] font-semibold mb-1">Account Profile & Settings</h2>
                  <p className="text-xs text-[#666666]">Manage your personal client information, photo, and login security credentials.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Full Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-3.5 text-[#666666]" />
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3.5 text-[#666666]" />
                        <input
                          type="email"
                          required
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Phone Number</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3.5 text-[#666666]" />
                        <input
                          type="tel"
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          placeholder="+91 99887 76655"
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Profile Photo URL</label>
                      <div className="relative">
                        <Camera size={16} className="absolute left-3 top-3.5 text-[#666666]" />
                        <input
                          type="url"
                          value={profileAvatar}
                          onChange={(e) => setProfileAvatar(e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-[#F8F7F4] border border-[#E8E4DD] py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8E4DD]">
                    <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">
                      New Password (Optional)
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3.5 text-[#666666]" />
                      <input
                        type="password"
                        placeholder="Leave blank to keep current password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#F8F7F4] border border-[#E8E4DD] py-3 pl-10 pr-3 text-xs focus:outline-none focus:border-[#1A1A1A] rounded-xl"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#C7A97B] hover:text-[#1A1A1A] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-md"
                  >
                    {updatingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* ==================== VOUCHERS TAB ==================== */}
            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <div className="bg-[#FFFFFF] p-6 border border-[#E8E4DD] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
                  <h2 className="font-serif text-2xl text-[#1A1A1A] font-semibold">Exclusive Client Vouchers</h2>
                  <p className="text-xs text-[#666666]">Apply these promo codes during checkout for instant savings.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] text-[#FFFFFF] p-6 border border-[#C7A97B] rounded-2xl relative shadow-md">
                    <span className="text-[10px] text-[#C7A97B] uppercase tracking-widest font-mono font-bold">Exclusive 15% Off</span>
                    <h3 className="font-mono text-2xl font-bold tracking-widest text-[#C7A97B] mt-1">VAVEVA15</h3>
                    <p className="text-xs text-gray-300 mt-2">Valid on orders above ₹1,499. Apply during checkout.</p>
                  </div>
                  <div className="bg-[#1A1A1A] text-[#FFFFFF] p-6 border border-[#C7A97B] rounded-2xl relative shadow-md">
                    <span className="text-[10px] text-[#C7A97B] uppercase tracking-widest font-mono font-bold">Flat ₹500 Off</span>
                    <h3 className="font-mono text-2xl font-bold tracking-widest text-[#C7A97B] mt-1">WELCOME500</h3>
                    <p className="text-xs text-gray-300 mt-2">Valid on your first purchase above ₹2,000.</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ==================== ORDER DETAILS MODAL ==================== */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E8E4DD] w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-5 right-5 text-[#666666] hover:text-[#1A1A1A] p-1"
            >
              <X size={20} />
            </button>

            <div className="border-b border-[#E8E4DD] pb-4 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C7A97B]">Order Receipt & Breakdown</span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">{selectedOrderDetails.orderId}</h3>
              <p className="text-xs text-[#666666] font-mono mt-0.5">Placed on {new Date(selectedOrderDetails.createdAt).toLocaleString()}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">Item Breakdown</h4>
                <div className="space-y-2">
                  {selectedOrderDetails.orderItems?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#F8F7F4] p-3 rounded-xl border border-[#E8E4DD] text-xs">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name || item.title} className="w-12 h-16 object-cover rounded-lg border border-[#E8E4DD]" />
                        <div>
                          <p className="font-serif font-bold text-[#1A1A1A]">{item.name || item.title}</p>
                          <p className="text-[#666666] text-[10px]">Color: {item.color} | Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1A1A]">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E8E4DD] pt-4 space-y-1.5 text-xs text-[#666666]">
                <div className="flex justify-between"><span>Items Price</span><span>₹{(selectedOrderDetails.itemsPrice || selectedOrderDetails.totalPrice).toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping Charge</span><span>{selectedOrderDetails.shippingPrice === 0 ? 'FREE' : `₹${selectedOrderDetails.shippingPrice}`}</span></div>
                <div className="flex justify-between"><span>Luxury Tax (5%)</span><span>₹{(selectedOrderDetails.taxPrice || 0).toLocaleString()}</span></div>
                <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E8E4DD]">
                  <span>Total Amount Paid</span>
                  <span>₹{selectedOrderDetails.totalPrice?.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-[#F8F7F4] p-4 rounded-xl border border-[#E8E4DD] text-xs text-[#666666] space-y-1 font-mono">
                <p><strong>Payment Method:</strong> {selectedOrderDetails.paymentMethod}</p>
                <p><strong>Payment Status:</strong> {selectedOrderDetails.isPaid ? 'Paid' : 'Pending'}</p>
                <p><strong>Courier:</strong> {selectedOrderDetails.courier || 'FedEx Air Express'}</p>
                <p><strong>Tracking Code:</strong> {selectedOrderDetails.trackingNumber || 'TRK-9948201'}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E4DD] flex justify-end space-x-3">
              <button
                onClick={() => printInvoice(selectedOrderDetails)}
                className="bg-[#1A1A1A] text-white hover:bg-[#C7A97B] hover:text-[#1A1A1A] px-6 py-2.5 text-xs uppercase tracking-wider font-bold rounded-xl transition-all"
              >
                Print Official Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
