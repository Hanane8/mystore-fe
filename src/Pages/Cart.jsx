import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleChangeQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setCartItems(updatedCart);
    setEditingQuantity(null);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items before proceeding.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="ml-6 flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="mr-4">Size: {item.size}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>

                  <div className="ml-6">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Edit Quantity */}
                  {editingQuantity === item.id ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-16 p-2 border border-gray-300 rounded-md mr-4"
                      />
                      <button 
                        onClick={() => handleChangeQuantity(item.id)} 
                        className="bg-green-600 text-white py-1 px-4 rounded-lg"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingQuantity(item.id);
                        setQuantity(item.quantity);
                      }}
                      className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
                    >
                      Edit
                    </button>
                  )}

                  {/* Remove Item */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 bg-red-600 text-white py-1 px-4 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
