import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, LogOut, UserCircle } from "lucide-react";
import logo from "../Assets/Logo.png";
import { logoutUser } from "../../Services/authService";

const Navbar = ({ isLoggedIn, setIsLoggedIn, cartCount }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Hantera dropdown-meny

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Shop", link: "/" },
    { name: "Men", link: "/category/EAABE81E-246B-403E-B3A8-3E958880429C" },
    { name: "Women", link: "/category/00D6C0D6-04F1-4DA0-AE13-F4AD5EC9BE43" },
    { name: "Kids", link: "/category/E774878B-31FF-4C67-A65F-CAA61177AAC9" },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo och varumärke */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">My Store</span>
          </div>

          {/* Navigeringslänkar */}
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

          {/* Höger sektion - Login, Profil, Varukorg */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-full text-gray-500 bg-white border border-gray-500 focus:outline-none transition-colors duration-200 cursor-pointer active:bg-gray-200"
                style={{ borderRadius: "75px", fontWeight: "500" }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            ) : (
              <>
                {/* Profilikon och dropdown-meny */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <UserCircle className="h-7 w-7" />
                  </button>

                  {/* Dropdown-meny */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-orders"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Orders
                          </Link>
                        </li>
                        <li className="border-t border-gray-200">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut className="h-4 w-4 mr-2 inline" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Kundvagnsikon */}
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
