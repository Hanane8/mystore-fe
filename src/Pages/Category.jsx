import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const { category } = useParams(); // Hämta kategorinamnet från URL
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`/api/Category/GetByName/${category}`);
        setCategoryData(response.data); // Sätt kategori-data från API-svaret
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch category data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]); // Kör om när "category" ändras

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryData.name} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryData.clothingTypes && categoryData.clothingTypes.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img
              src={product.imageUrl || 'placeholder-image-url'}
              alt={product.name}
              className="h-32 w-full object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.price || 'N/A'} $</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
