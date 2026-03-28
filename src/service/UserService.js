import api from '@/services/axios';
import Cookies from 'js-cookie';

export const UserService = {

    async update(data) {
        const token = Cookies.get('token');
        try {
            const response = await api.put('/user', data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async changePassword(data)
    {
        const token = Cookies.get('token');
        try {
            const response = await api.post('/change-password', data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}