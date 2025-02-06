import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, ShieldCheck, Package, Clock, ArrowRight } from 'lucide-react';
import api from "../Services/api";

const Checkout = ({ cartItems, setCartItems }) => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    address: "",
    mobile: "",
  });

  const navigate = useNavigate();
  
  const total = cartItems.reduce((acc, item) => {
    const itemTotal = item.totalPrice || (item.price * item.quantity);
    return acc + itemTotal;
  }, 0);

  const formatPrice = (price) => {
    return isNaN(Number(price)) ? '0.00' : Number(price).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to complete your order.");
      navigate("/login");
      return;
    }

    if (!userDetails.fullName || !userDetails.address || !userDetails.mobile) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      checkout: {
        userId: localStorage.getItem("userId"),
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          imageUrl: item.imageUrl,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
        })),
        address: userDetails.address,
        mobile: userDetails.mobile,
        fullName: userDetails.fullName,
        total: Number(total.toFixed(2)),
      },
    };

    try {
      const response = await api.post("api/Order/create", payload);

      if (response.data.isSuccessfull) {
        alert("Order created successfully!");
        setCartItems([]);
        navigate("/order-summary", { state: { order: payload.checkout } });
      } else {
        throw new Error(response.data.errorMessage || "Order creation failed");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert(error.response?.data?.errorMessage || error.message || "An error occurred while placing your order.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">Secure Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-4xl shadow-soft flex flex-col items-center">
              <Truck className="w-6 h-6 text-primary-600 mb-2" />
              <span className="text-secondary-700 font-medium">Free Express Shipping</span>
            </div>
            <div className="bg-white p-4 rounded-4xl shadow-soft flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-primary-600 mb-2" />
              <span className="text-secondary-700 font-medium">Secure Payment</span>
            </div>
            <div className="bg-white p-4 rounded-4xl shadow-soft flex flex-col items-center">
              <Clock className="w-6 h-6 text-primary-600 mb-2" />
              <span className="text-secondary-700 font-medium">24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="bg-white rounded-4xl shadow-soft p-8 animate-slide-up">
            <div className="flex items-center mb-6">
              <Package className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-semibold text-secondary-900">Order Summary</h2>
            </div>
            
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-2xl">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded-xl shadow-soft"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-secondary-900">{item.productName}</h3>
                    <p className="text-secondary-600">Size: {item.size}</p>
                    <p className="text-secondary-600">
                      {item.quantity} x {formatPrice(item.price)} kr
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-secondary-900">
                      {formatPrice(item.totalPrice || (item.price * item.quantity))} kr
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 bg-secondary-50 p-6 rounded-2xl">
              <div className="flex justify-between text-secondary-700">
                <span>Subtotal</span>
                <span>{formatPrice(total)} kr</span>
              </div>
              <div className="flex justify-between text-secondary-700">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="h-px bg-secondary-200"></div>
              <div className="flex justify-between text-xl font-semibold text-secondary-900">
                <span>Total</span>
                <span>{formatPrice(total)} kr</span>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping Information */}
          <div className="bg-white rounded-4xl shadow-soft p-8 animate-slide-up">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-semibold text-secondary-900">Shipping Information</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-secondary-700 font-medium mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userDetails.fullName}
                  onChange={handleChange}
                  className="w-full p-4 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2" htmlFor="address">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleChange}
                  className="w-full p-4 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={userDetails.mobile}
                  onChange={handleChange}
                  className="w-full p-4 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
              >
                Place Order
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>

              <div className="text-center space-y-4">
                <p className="text-secondary-600 text-sm">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
                <div className="flex items-center justify-center space-x-4 text-secondary-600">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm">Your data is always protected</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;