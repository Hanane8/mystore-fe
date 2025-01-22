import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5202/',
});

// Request Interceptor: Lägg till JWT-token i rubriker
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Hantera autentiseringsfel
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) { // Token är ogiltig eller saknas
            localStorage.removeItem('token'); // Ta bort ogiltig token
            window.location.href = '/login'; // Omdirigera till inloggningssidan
        }
        return Promise.reject(error);
    }
);

export default api;
