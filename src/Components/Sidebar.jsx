import React from 'react';

const SidebarComponent = ({ clothingTypes, selectedType, setSelectedType }) => {
  return (
    <div className="w-72 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 tracking-tight">Categories</h2>
      <ul className="space-y-1.5">
        <li className="group">
          <button
            onClick={() => setSelectedType(null)}
            className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm ${
              selectedType === null
                ? 'bg-blue-500 text-white'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            } transition-colors duration-200`}
          >
            All Products
          </button>
        </li>
        {clothingTypes.map((type) => (
          <li key={type.id} className="group">
            <button
              onClick={() => setSelectedType(type.id)}
              className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm ${
                selectedType === type.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-50 group-hover:text-gray-900'
              } transition-colors duration-200`}
            >
              {type.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;