import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5202/', 
});

export default api;