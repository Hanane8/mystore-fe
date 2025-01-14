import React, { useEffect, useState } from 'react';
import api from './api'; 
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/Products/GetAll')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product List</h1>
        {error && <div>{error}</div>}
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;