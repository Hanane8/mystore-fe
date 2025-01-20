import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductsComponent from './ProductsComponent';
import api from '../Services/api';
import Sidebar from './Sidebar';

const CategoryComponent = () => {
  const { category } = useParams();
  const [clothingTypes, setClothingTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClothingTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/api/ClothingType/byCategory/${category}`);
        setClothingTypes(response.data || []);
        setSelectedType(null);
      } catch (err) {
        setError('Failed to load clothing types.');
        console.error('Error fetching clothing types:', err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchClothingTypes();
    }
  }, [category]);

  const handleTypeClick = (typeId) => {
    setSelectedType(typeId);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        clothingTypes={clothingTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {selectedType
            ? `${clothingTypes.find((type) => type.id === selectedType)?.name} Products`
            : `${category} Products`}
        </h1>
        <ProductsComponent categoryId={category} clothingTypeId={selectedType} />
      </div>
    </div>
  );
};

export default CategoryComponent;