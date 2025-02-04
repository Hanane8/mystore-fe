import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

const Cart = ({ setCartItems }) => {
  const [cartItems, setCartItemsLocal] = useState([]); 
  const [quantity, setQuantity] = useState(0);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    } else {
      setError('User is not logged in.');
    }
  }, [userId]);

  const fetchCart = async (userId) => {
    try {
      const response = await api.get(`/api/Cart/user/${userId}`);
      if (response.status === 200 && response.data.isSuccessfull) {
        setCartItemsLocal(response.data.data.items); 
      }
    } catch (err) {
      setError('Could not fetch the cart.');
      console.error('Error fetching cart:', err);
    }
  };

  const handleChangeQuantity = async (productId) => {
    try {
      setError('');

      if (quantity < 1 || isNaN(quantity)) {
        setError('Quantity must be at least 1.');
        return;
      }

      if (!userId) {
        setError('User is not logged in.');
        return;
      }

      console.log("Updating cart item with data:", { userId, productId, quantity });

      const response = await api.put(`/api/CartItem/update-quantity`, {
        userId,
        productId,
        quantity
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("API response:", response);

      if (response.status === 200 && response.data) {
        if (response.data.message === 'Quantity and total price updated successfully.') {
          const updatedCart = cartItems.map(item =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: quantity, 
                  totalPrice: item.price * quantity 
                }
              : item
          );
          setCartItemsLocal(updatedCart);  
          setEditingQuantity(null);
        } else {
          setError('Failed to update cart item.');
        }
      } else {
        setError('Failed to update cart item.');
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      setError(error.response?.data?.error || 'An error occurred while updating the cart.');
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItemsLocal(updatedCart); 
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty. Add items before proceeding.');
      return;
    }
    navigate('/checkout');
  };

  const total = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  const formatPrice = (price) => {
    return isNaN(Number(price)) ? '0.00' : Number(price).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cartItems.map(item => (
                <div key={item.productId} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.productName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="ml-6 flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{item.productName}</h2>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="mr-4">Size: {item.size}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>

                  <div className="ml-6">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.totalPrice)} kr
                    </p>
                  </div>

                  {editingQuantity === item.productId ? (
                    <div className="flex items-center ml-6">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        className="w-16 p-2 border border-gray-300 rounded-md mr-4"
                      />
                      <button 
                        onClick={() => handleChangeQuantity(item.productId)} 
                        className="bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingQuantity(item.productId);
                        setQuantity(item.quantity);  
                      }}
                      className="ml-6 bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="ml-4 bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)} kr</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)} kr</span>
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
