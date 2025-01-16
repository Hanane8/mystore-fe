import React from 'react';
import { logoutUser } from '../Services/authService';

const UserComponent = ({ setIsLoggedIn }) => {
  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      console.log('Logout successful:', result);
      localStorage.removeItem('token');
      
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserComponent;