import api from '@/services/axios';
import Cookies from 'js-cookie';

export const AnamneseService = {

    async generator(payload, status) {
        const token = Cookies.get('token');
        try {
            const response = await api.post('/generate-document',
                {
                    conversation: payload,
                    status: status,
                },
                {   
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            return response.data.content;
        } catch (error) {
            console.error(error);
        }
    }
}