import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vaveva_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('vaveva_token') || '');
  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { intent: string, callback: function, message: string }

  // Set default auth header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch current authenticated user profile on app load/mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/auth/profile');
          setUser(res.data);
          localStorage.setItem('vaveva_user', JSON.stringify(res.data));
        } catch (error) {
          console.warn('[Auth Session Expired/Invalid]:', error?.response?.data?.message || error.message);
          // Token expired or invalid
          setUser(null);
          setToken('');
          localStorage.removeItem('vaveva_token');
          localStorage.removeItem('vaveva_user');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoadingUser(false);
    };
    initAuth();
  }, []);

  // Execute pending action after successful authentication
  const executePendingAction = (authenticatedUser) => {
    if (pendingAction && typeof pendingAction.callback === 'function') {
      setTimeout(() => {
        pendingAction.callback(authenticatedUser);
        setPendingAction(null);
      }, 200);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const userData = res.data;
      const jwtToken = res.data.token;

      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('vaveva_user', JSON.stringify(userData));
      localStorage.setItem('vaveva_token', jwtToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      toast.success(`Welcome back, ${userData.name}!`);
      setIsAuthModalOpen(false);

      executePendingAction(userData);
      return userData;
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const signup = async (name, email, password, phone) => {
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password, phone });
      const userData = res.data;
      const jwtToken = res.data.token;

      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('vaveva_user', JSON.stringify(userData));
      localStorage.setItem('vaveva_token', jwtToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      toast.success(`Account created! Welcome to VAVEVA, ${userData.name}.`);
      setIsAuthModalOpen(false);

      executePendingAction(userData);
      return userData;
    } catch (error) {
      const msg = error.response?.data?.message || 'Error creating account';
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('vaveva_user');
    localStorage.removeItem('vaveva_token');
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  };

  // Require Auth wrapper with action interception & custom prompts
  const requireAuth = (intent, callback, customMessage) => {
    if (user && token) {
      if (callback) callback(user);
      return true;
    } else {
      setPendingAction({
        intent,
        callback,
        message: customMessage || 'Please sign in to continue.'
      });
      setIsAuthModalOpen(true);
      return false;
    }
  };

  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('vaveva_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loadingUser,
        login,
        signup,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        requireAuth,
        pendingAction,
        setPendingAction,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
