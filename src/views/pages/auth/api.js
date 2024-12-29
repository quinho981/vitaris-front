import api from '@/services/axios';

export const register = async (payload) => {
    try {
        const response = await api.post('/register', payload);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return Promise.reject(error);
    }
}