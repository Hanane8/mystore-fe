import React, { useState, useEffect } from 'react';
import api from '../Services/api';

const ClothingTypeComponent = () => {
  const [clothingTypes, setClothingTypes] = useState([]);
  const [filteredClothingTypes, setFilteredClothingTypes] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', id: null });
  const [categoryId, setCategoryId] = useState('');
  const [clothingTypeId, setClothingTypeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchClothingTypes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/ClothingType/GetAll');
      setClothingTypes(response.data);
      setFilteredClothingTypes(response.data); 
      setMessage(null);
    } catch (err) {
      setError('Failed to load clothing types.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothingTypes();
  }, []);

  const fetchClothingTypesByCategory = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/ClothingType/byCategory/${categoryId}`);
      setFilteredClothingTypes(response.data);
      setMessage('Filtered by category.');
    } catch (err) {
      setError('Failed to filter by category.');
    } finally {
      setLoading(false);
    }
  };

  const fetchClothingTypeById = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/ClothingType/GetById/${clothingTypeId}`);
      setFilteredClothingTypes([response.data]); 
      setMessage('Filtered by ID.');
    } catch (err) {
      setError('Failed to find clothing type by ID.');
    } finally {
      setLoading(false);
    }
  };

  // Add or update clothing type
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      if (form.id) {
        // Update
        await api.put('/api/ClothingType/update', form);
        setMessage('Clothing type updated successfully.');
      } else {
        // Add
        await api.post('/api/ClothingType/add', form);
        setMessage('Clothing type added successfully.');
      }

      setForm({ name: '', description: '', id: null });
      fetchClothingTypes();
    } catch (err) {
      setError('Failed to save clothing type.');
    } finally {
      setLoading(false);
    }
  };

  // Delete clothing type
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/api/ClothingType/delete/${id}`);
      setMessage('Clothing type deleted successfully.');
      fetchClothingTypes();
    } catch (err) {
      setError('Failed to delete clothing type.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle edit
  const handleEdit = (clothingType) => {
    setForm(clothingType);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clothing Types</h1>

      {error && <div className="text-red-500">{error}</div>}
      {message && <div className="text-green-500">{message}</div>}

      {/* Search Section */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Search/Filter</h2>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Enter Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={fetchClothingTypesByCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Filter by Category
          </button>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter Clothing Type ID"
            value={clothingTypeId}
            onChange={(e) => setClothingTypeId(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={fetchClothingTypeById}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Filter by ID
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">{form.id ? 'Edit Clothing Type' : 'Add New Clothing Type'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {form.id ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Clothing Types List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredClothingTypes.map((type) => (
            <div key={type.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{type.name}</h3>
              <p>{type.description}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(type)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(type.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClothingTypeComponent;
