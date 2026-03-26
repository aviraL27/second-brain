import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Automatically extract JWT from localStorage and attach to every request 
apiClient.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
