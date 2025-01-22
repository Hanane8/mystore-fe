import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../Services/authService';
import { FaLock as Lock, FaEnvelope as Mail } from 'react-icons/fa';
import { HiLogin as LogIn, HiLogout as LogOut } from 'react-icons/hi';

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
        const result = await logoutUser();
        console.log('Logout successful:', result);
        
        // Debugging: Log current localStorage state
        console.log('Before removing items:', localStorage.getItem('token'), localStorage.getItem('userId'));
        
        // Remove token and userId from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // Debugging: Log localStorage state after removal
        console.log('After removing items:', localStorage.getItem('token'), localStorage.getItem('userId'));
        
        // Update application state
        setIsLoggedIn(false);
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80")'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-sm"></div>

      {/* Glass card container */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              {isLoggedIn ? 'Welcome Back' : 'Login'}
            </h1>
            <p className="text-gray-200">
              {isLoggedIn
                ? 'You are already logged in.'
                : 'Enter your credentials to continue'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form or Logout button */}
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative">Login</span>
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </form>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
 