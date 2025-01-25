import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

const Checkout = ({ cartItems }) => {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    address: '',
    mobile: '',
  });

  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to complete your order.');
      navigate('/login');
      return;
    }

    // Simple validation
    if (!userDetails.fullName || !userDetails.address || !userDetails.mobile) {
      alert('Please fill in all fields.');
      return;
    }

    // Format the request payload to match the API's expected structure
    const payload = {
      checkout: {
        userId: localStorage.getItem('userId'), // Get userId from localStorage
        cartItems: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          imageUrl: item.imageUrl,
          size: item.size,
          price: item.price,
          quantity: item.quantity
        })),
        address: userDetails.address,
        mobile: userDetails.mobile,
        fullName: userDetails.fullName
      }
    };

    try {
      const response = await api.post('api/Order/create', payload);
      
      if (response.data.isSuccessfull) {
        alert('Order created successfully!');
        navigate('/order-summary');
      } else {
        throw new Error(response.data.errorMessage || 'Order creation failed');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert(error.response?.data?.errorMessage || error.message || 'An error occurred while placing your order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Cart Items Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between text-gray-900 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Information Form */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userDetails.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={userDetails.mobile}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;