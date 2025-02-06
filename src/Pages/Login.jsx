import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../Services/authService';
import { Mail, Lock, LogIn, LogOut, ShieldCheck, KeyRound } from 'lucide-react';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      console.log('Login successful:', result);
  
      if (result.token) {
        localStorage.setItem('token', result.token.token);
        localStorage.setItem('userId', result.token.userId);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 relative overflow-hidden animate-fade-in">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-6 animate-slide-up">
        <div className="bg-white/10 backdrop-blur-2xl rounded-4xl shadow-strong p-8 border border-white/20">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLoggedIn ? 'Welcome Back!' : 'Sign In'}
            </h1>
            <p className="text-gray-200 text-sm">
              {isLoggedIn
                ? 'You are currently logged in'
                : 'Please enter your credentials to continue'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-100 rounded-xl flex items-center gap-2">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Login Form or Logout Button */}
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </span>
              </button>

              {/* Footer Links */}
              <div className="space-y-4">
                <div className="text-center">
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition duration-200">
                    Forgot your password?
                  </a>
                </div>
                <div className="flex items-center justify-center text-gray-300 gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs">Secure login protected by SSL</span>
                </div>
              </div>
            </form>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;