import React, { useState, useEffect } from 'react';
import api from '../Services/api';

const Sidebar = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clothingTypes, setClothingTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    onSelectCategory(category.id);

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/ClothingType/byCategory/${category.id}`);
      setClothingTypes(response.data);
    } catch (err) {
      setError('Failed to load clothing types.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {selectedCategory && (
        <>
          <h2>Clothing Types</h2>
          <ul>
            {clothingTypes.map((type) => (
              <li key={type.id}>{type.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;