import React, { useEffect, useState } from 'react';
import api from '../Services/api';

const Men = () => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/api/Category/GetById/Men')
      .then(response => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || 'An error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Category: Men</h2>
      {/* Render category details */}
      {category && <div>{category.name}</div>}
    </div>
  );
};

export default Men;