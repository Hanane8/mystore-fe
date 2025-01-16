import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClothingTypeComponent = () => {
    const [clothingTypes, setClothingTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClothingTypes = async () => {
            try {
                const response = await axios.get('/api/clothingtype/GetAll');
                setClothingTypes(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClothingTypes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Clothing Types</h1>
            <ul>
                {clothingTypes.map((type) => (
                    <li key={type.id}>{type.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClothingTypeComponent;