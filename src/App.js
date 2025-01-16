import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Category from './Components/CategoriesComponent';
import Registeration from './Pages/Registeration';
import Login from './Pages/Login';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/Men" element={<Category category="Men" />} />
          <Route path="/Women" element={<Category category="Women" />} />
          <Route path="/Kids" element={<Category category="Kids" />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
