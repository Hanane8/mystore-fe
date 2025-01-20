import React from 'react';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';

const Shop = () => {
  const newArrivals = [
    { 
      id: 1, 
      name: 'Summer Collection', 
      price: '199.99', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800&h=1000' 
    },
    { 
      id: 2, 
      name: 'Autumn Essentials', 
      price: '249.99', 
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800&h=1000' 
    },
    { 
      id: 3, 
      name: 'Winter Wear', 
      price: '179.99', 
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800&h=1000' 
    },
    { 
      id: 4, 
      name: 'Spring Collection', 
      price: '299.99', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800&h=1000' 
    }
  ];

  const popularCollections = [
    { 
      id: 1, 
      name: 'Casual Collection', 
      price: '159.99', 
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800&h=1000' 
    },
    { 
      id: 2, 
      name: 'Evening Wear', 
      price: '289.99', 
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800&h=1000' 
    },
    { 
      id: 3, 
      name: 'Urban Style', 
      price: '199.99', 
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800&h=1000' 
    },
    { 
      id: 4, 
      name: 'Designer Series', 
      price: '399.99', 
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800&h=1000' 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(item => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Popular Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCollections.map(item => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    
    </div>
  );
};

export default Shop;