import api from '@/services/axios';
import Cookies from 'js-cookie';

export const SelectOptionsService = {
    async getTemplates() {
        const token = Cookies.get('token');
        const response = await api.get(`/templates`, { 
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data
    },
    async getTypes() {
        const token = Cookies.get('token');
        const response = await api.get(`/types`, { 
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data
    }
};