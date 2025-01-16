import React from 'react';

const Shop = () => {
  const newArrivals = [
    { id: 1, name: 'New Arrival 1', price: '$50', image: 'path/to/image1.jpg' },
    { id: 2, name: 'New Arrival 2', price: '$60', image: 'path/to/image2.jpg' },
    // Add more new arrivals here
  ];

  const popularCollections = [
    { id: 1, name: 'Popular Collection 1', price: '$70', image: 'path/to/image3.jpg' },
    { id: 2, name: 'Popular Collection 2', price: '$80', image: 'path/to/image4.jpg' },
    // Add more popular collections here
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map(item => (
            <div key={item.id} className="border p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularCollections.map(item => (
            <div key={item.id} className="border p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;