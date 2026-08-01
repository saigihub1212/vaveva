import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup, pendingAction, setPendingAction } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'forgot'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else if (tab === 'signup') {
        await signup(name, email, password, phone);
      } else {
        toast.success(`Password reset link sent to ${email}`);
        setTab('login');
      }
    } catch (err) {
      // Error handled inside AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role = 'customer') => {
    setLoading(true);
    try {
      const demoEmail = role === 'admin' ? 'admin@vaveva.com' : 'customer@vaveva.com';
      const demoPass = role === 'admin' ? 'admin123' : 'password123';
      await login(demoEmail, demoPass);
    } catch (err) {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#FBF9F5] w-full max-w-md p-7 sm:p-8 shadow-2xl relative border border-[#E5E2DA] rounded-2xl overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#111111] transition-colors p-1"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-5">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] uppercase text-[#111111]">VAVEVA</span>
            
            {/* Interception Alert Message */}
            {pendingAction ? (
              <div className="mt-3 bg-[#111111] text-white p-3 rounded-xl flex items-center space-x-2 text-xs text-left shadow-sm">
                <AlertCircle size={18} className="text-amber-400 shrink-0" />
                <div>
                  <p className="font-semibold">{pendingAction.message || 'Please sign in to continue.'}</p>
                  <p className="text-[10px] text-gray-300">Your item will be saved automatically after logging in.</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Access your luxury account
              </p>
            )}
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-[#E5E2DA] mb-5">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
                tab === 'login' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-gray-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
                tab === 'signup' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-gray-400'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Arjun Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F4F1EA] border border-[#E5E2DA] py-2.5 pl-10 pr-3 text-xs focus:outline-none focus:border-[#111111] rounded-xl"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="customer@vaveva.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E5E2DA] py-2.5 pl-10 pr-3 text-xs focus:outline-none focus:border-[#111111] rounded-xl"
                />
              </div>
            </div>

            {tab !== 'forgot' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F4F1EA] border border-[#E5E2DA] py-2.5 pl-10 pr-3 text-xs focus:outline-none focus:border-[#111111] rounded-xl"
                  />
                </div>
              </div>
            )}

            {tab === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+91 99887 76655"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F4F1EA] border border-[#E5E2DA] py-2.5 pl-10 pr-3 text-xs focus:outline-none focus:border-[#111111] rounded-xl"
                  />
                </div>
              </div>
            )}

            {tab === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setTab('forgot')}
                  className="text-[11px] text-[#C5A880] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] text-[#FBF9F5] py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#333333] transition-all flex items-center justify-center space-x-2 rounded-xl shadow-sm"
            >
              <span>{loading ? 'Authenticating...' : tab === 'login' ? 'Sign In' : tab === 'signup' ? 'Create Account' : 'Reset Password'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Sign In Actions */}
          <div className="mt-5 pt-4 border-t border-[#E5E2DA]">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-2 font-mono">
              Quick One-Click Demo Sign In
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="bg-[#EFECE6] hover:bg-[#111111] hover:text-white text-[#111111] py-2 px-3 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-all border border-[#E5E2DA]"
              >
                Customer Sign In
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="bg-[#EFECE6] hover:bg-[#111111] hover:text-white text-[#111111] py-2 px-3 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-all border border-[#E5E2DA]"
              >
                Admin Sign In
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
