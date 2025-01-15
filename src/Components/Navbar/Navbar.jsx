import React from 'react';
import { ShoppingCart, LogIn, Store } from 'lucide-react';

const Navbar = () => {
  const navItems = ['Shop', 'Men', 'Women', 'Kids'];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Store</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navItems.map(item => (
                <a key={item} href="#" className="text-gray-900 hover:text-blue-600 transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </button>
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(item => (
            <a key={item} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;