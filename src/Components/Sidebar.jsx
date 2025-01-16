import React, { useState } from 'react';

const Sidebar = ({ categories, onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <div className="sidebar">
            <h2>Kategorier</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </li>
                ))}
            </ul>
            {selectedCategory && (
                <>
                    <h2>Klädtyper</h2>
                    <ul>
                        {selectedCategory.clothingTypes.map((type) => (
                            <li key={type}>{type}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Sidebar;