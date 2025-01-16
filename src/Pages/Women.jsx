import React, { useEffect, useState } from 'react';
import api from '../Services/api';

const Women = () => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/api/Category/GetById/Women')
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
      <h2>Category: Women</h2>
      {/* Render category details */}
      {category && <div>{category.name}</div>}
    </div>
  );
};

export default Women;