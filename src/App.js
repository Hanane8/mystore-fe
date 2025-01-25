import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Category from './Pages/Category';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import ProductDetail from './Pages/ProductDetail';
import Checkout from './Pages/Checkout';
import Cart from './Pages/Cart';  

import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const cartCount = cartItems.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/products/:productId" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />  
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;