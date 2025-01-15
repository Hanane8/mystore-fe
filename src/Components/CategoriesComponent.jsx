import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const CategoriesComponent = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch category by ID
      api.get(`/api/Category/GetById/${id}`)
        .then(response => {
          setCategory(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the category!', error);
          setError('Error fetching category');
        });
    } else {
      // Fetch all categories
      api.get('/api/Category/GetAllCategories')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the categories!', error);
          setError('Error fetching categories');
        });
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (id && category) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
        <img src={category.logo} alt={category.name} className="h-16 w-16 mx-auto mb-2" />
        <p>{category.description}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <div key={category.id} className="bg-white p-4 rounded shadow">
            <img src={category.logo} alt={category.name} className="h-16 w-16 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComponent;