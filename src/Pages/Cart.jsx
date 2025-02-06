import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Pencil, Trash, ShoppingCart, Package, 
  Truck, Shield, ArrowRight, AlertCircle, Minus, Plus, X
} from 'lucide-react';
import api from '../Services/api';

const Cart = ({ setCartItems }) => {
  const [cartItems, setCartItemsLocal] = useState([]); 
  const [quantity, setQuantity] = useState(0);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    } else {
      setError('User is not logged in.');
      setShowError(true);
    }
  }, [userId]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const fetchCart = async (userId) => {
    try {
      const response = await api.get(`/api/Cart/user/${userId}`);
      if (response.status === 200 && response.data.isSuccessfull) {
        const items = response.data.data.items;
        setCartItemsLocal(items);
        setCartItems(items);
      }
    } catch (err) {
      setError('Could not fetch the cart.');
      setShowError(true);
      console.error('Error fetching cart:', err);
    }
  };

  const handleChangeQuantity = async (productId) => {
    try {
      setError('');

      if (quantity < 1 || isNaN(quantity)) {
        setError('Quantity must be at least 1.');
        setShowError(true);
        return;
      }

      if (!userId) {
        setError('User is not logged in.');
        setShowError(true);
        return;
      }

      const response = await api.put(`/api/CartItem/update-quantity`, {
        userId,
        productId,
        quantity
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

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
          setCartItems(updatedCart);
          setEditingQuantity(null);
        } else {
          throw new Error('Failed to update cart item.');
        }
      } else {
        throw new Error('Failed to update cart item.');
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      setError(error.message || 'An error occurred while updating the cart.');
      setShowError(true);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = cartItems.filter(item => item.productId !== productId);
      setCartItemsLocal(updatedCart);
      setCartItems(updatedCart);
      
      // Here you would also make an API call to remove the item from the backend
      // await api.delete(`/api/CartItem/${userId}/${productId}`);
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item from cart.');
      setShowError(true);
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty. Add items before proceeding.');
      setShowError(true);
      return;
    }
    
    navigate('/checkout');
  };

  const total = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  const formatPrice = (price) => {
    return isNaN(Number(price)) ? '0.00' : Number(price).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Error Notification */}
      {showError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in z-50">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
          <button 
            onClick={() => setShowError(false)}
            className="ml-2 hover:bg-red-600 p-1 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Cart Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary-100 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Your Cart</h1>
            <p className="text-secondary-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-4xl shadow-soft p-12 text-center">
            <Package className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Your cart is empty</h2>
            <p className="text-secondary-600 mb-8">Looks like you haven't added any items yet.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-4xl shadow-soft overflow-hidden">
                {cartItems.map(item => (
                  <div 
                    key={item.productId} 
                    className="p-6 border-b border-secondary-100 last:border-b-0 hover:bg-secondary-50 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-xl bg-secondary-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.productName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                          {item.productName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
                          <span>Size: {item.size}</span>
                          <span>Price: {formatPrice(item.price)} kr</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        {editingQuantity === item.productId ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                              className="p-1 hover:bg-secondary-100 rounded-full transition-colors"
                            >
                              <Minus className="w-4 h-4 text-secondary-600" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                              className="w-16 p-2 text-center border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => setQuantity(prev => prev + 1)}
                              className="p-1 hover:bg-secondary-100 rounded-full transition-colors"
                            >
                              <Plus className="w-4 h-4 text-secondary-600" />
                            </button>
                            <button 
                              onClick={() => handleChangeQuantity(item.productId)}
                              className="ml-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="text-secondary-900 font-medium">
                              Qty: {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                setEditingQuantity(item.productId);
                                setQuantity(item.quantity);
                              }}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-4xl shadow-soft p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-secondary-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)} kr</span>
                  </div>
                  <div className="flex justify-between text-secondary-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-secondary-100"></div>
                  <div className="flex justify-between text-lg font-semibold text-secondary-900">
                    <span>Total</span>
                    <span>{formatPrice(total)} kr</span>
                  </div>
                </div>

                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 font-medium"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Additional Information */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-secondary-600">
                    <Truck className="w-5 h-5 text-primary-600" />
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-secondary-600">
                    <Shield className="w-5 h-5 text-primary-600" />
                    <span>Secure checkout process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;