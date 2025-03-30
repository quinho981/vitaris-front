import api from '@/services/axios';
import Cookies from 'js-cookie';

export const register = async (payload) => {
    try {
        const response = await api.post('/register', payload);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const login = async (payload) => {
    try {
        const response = await api.post('/login', payload);

        Cookies.set('token', response.data.access_token);

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}