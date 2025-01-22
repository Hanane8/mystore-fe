import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/User/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const loginUser = async (loginData) => {
  try {
      const response = await api.post('/api/User/login', loginData);

      if (response?.data?.token) {
          localStorage.setItem('token', response.data.token); 
          return { success: true, token: response.data.token }; 
      } else {
          console.error('Token not found in API response:', response.data);
          return { success: false, message: 'Token not found in response.' };
      }
  } catch (error) {
      
      console.error('Login error:', error);

      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      return { success: false, message: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    await api.get('/api/User/logout');
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); // Lägg till denna rad för att ta bort userId
  } catch (error) {
    console.error('Logout failed', error);
  }
};
