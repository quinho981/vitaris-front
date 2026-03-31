import axios from 'axios';
import router from '@/router';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        
        if (status === 403) {
            router.push({ name: 'error' }); 
        }

        return Promise.reject(error);
    }
);

export default api;
