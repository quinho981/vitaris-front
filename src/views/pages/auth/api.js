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

export const getUser = async () => {
    const token = Cookies.get('token');
    try {
        const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
        });

        Cookies.set('id', response.data.id);
        Cookies.set('username', response.data.name);
        Cookies.set('user_email', response.data.email);
        Cookies.set('plan', response.data.plans[0].name);
        Cookies.set('active', response.data.plans[0].pivot.active);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}