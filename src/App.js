import React from 'react';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Welcome to your Shop on line</p>
      </div>
    </div>
  );
}

export default App;