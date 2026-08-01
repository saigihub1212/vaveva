import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Lock, Mail, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';

const API_URL = 'https://7z9zjkqwo7.execute-api.ap-south-1.amazonaws.com/dev/api';

export const AdminAuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vaveva_admin_token');
    const adminUserStr = localStorage.getItem('vaveva_admin_user');
    
    if (token && adminUserStr) {
      try {
        const user = JSON.parse(adminUserStr);
        if (user.role === 'admin') {
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('vaveva_admin_token');
        localStorage.removeItem('vaveva_admin_user');
      }
    }
    setLoading(false);
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await axios.post(`${API_URL}/auth/admin-login`, {
        email: email.trim(),
        password: password
      });

      if (res.data && res.data.token && res.data.role === 'admin') {
        localStorage.setItem('vaveva_admin_token', res.data.token);
        localStorage.setItem('vaveva_admin_user', JSON.stringify(res.data));
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${res.data.name || 'Admin Executive'}`);
      } else {
        setErrorMsg('Access denied: You do not have admin permissions.');
      }
    } catch (err) {
      console.error('[Admin Auth Error]:', err);
      setErrorMsg(err.response?.data?.message || 'Invalid email or password credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vaveva_admin_token');
    localStorage.removeItem('vaveva_admin_user');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    toast.success('Admin logged out successfully.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0F] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0C0F] flex items-center justify-center p-4 text-[#EEEEEE] font-sans relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#16161D] border border-[#272733] p-8 shadow-2xl relative z-10">
          {/* Header Badge */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif text-2xl font-bold mb-4 shadow-lg shadow-[#D4AF37]/10">
              V
            </div>
            <h2 className="font-serif text-2xl tracking-[0.2em] font-bold text-white uppercase mb-1">
              VAVEVA
            </h2>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono flex items-center gap-1">
              <ShieldCheck size={14} /> Executive Admin Portal
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs text-center">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 flex items-center gap-1.5">
                <Mail size={13} className="text-[#D4AF37]" /> Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email address"
                className="w-full bg-[#0C0C0F] border border-[#272733] focus:border-[#D4AF37] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 flex items-center gap-1.5">
                <KeyRound size={13} className="text-[#D4AF37]" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-[#0C0C0F] border border-[#272733] focus:border-[#D4AF37] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D4AF37] hover:bg-[#c49f27] text-[#0C0C0F] font-bold text-xs uppercase tracking-[0.2em] py-3.5 px-4 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate & Access</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Clone children and pass handleLogout
  return React.cloneElement(children, { onLogout: handleLogout });
};
