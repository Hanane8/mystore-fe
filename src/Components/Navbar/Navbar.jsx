import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogIn, Store, LogOut } from 'lucide-react';
import logo from '../Assets/Logo.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn, cartCount }) => {
  const navItems = [
    { name: 'Shop', link: '/' },
    { name: 'Men', link: '/category/A1EEDD2A-3069-451A-95E4-920A4F4A0263' },
    { name: 'Women', link: '/category/652886FC-1DF9-4345-AB3D-C2BE80140975' },
    { name: 'Kids', link: '/category/481C6142-4FE3-44F4-A091-F97E1A600D30' },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">

            <img src={logo}  alt="" className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">My Store</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-full text-gray-500 bg-white border border-gray-500 focus:outline-none transition-colors duration-200 cursor-pointer active:bg-gray-200"
            style={{
              borderRadius: '75px',
              fontWeight: '500'
            }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Link>
        ) : (
          <button
            onClick={() => setIsLoggedIn(false)}
            className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-full text-gray-500 bg-white border border-gray-500 focus:outline-none transition-colors duration-200 cursor-pointer active:bg-gray-200"
            style={{
              borderRadius: '75px',
              fontWeight: '500'
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        )}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;