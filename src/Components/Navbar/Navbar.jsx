import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogIn, Store, LogOut } from 'lucide-react';
import UserComponent from '../UserComponent';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navItems = [
    { name: 'Shop', link: '/' },
  { name: 'Men', link: '/category/5D387C17-BD99-4E56-A406-E074050D19AC', id:'5D387C17-BD99-4E56-A406-E074050D19AC'},
    { name: 'Women', link: '/category/14DBB0F0-6AB1-45D8-89D6-0C90C6E52CB5', id:'14DBB0F0-6AB1-45D8-89D6-0C90C6E52CB5' },
    { name: 'Kids', link: '/category/C17DFE6C-77C8-4539-8224-5EB906138CDD', id:'C17DFE6C-77C8-4539-8224-5EB906138CDD' },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Store</span>
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
              <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            ) : (
              <button onClick={() => setIsLoggedIn(false)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            )}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">0</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;