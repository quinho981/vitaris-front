import api from '@/services/axios';
import Cookies from 'js-cookie';

export const AnamneseService = {

    async generator(payload, title, status) {
        const token = Cookies.get('token');
        try {
            const response = await api.post('/generate-document',
                {
                    conversation: payload,
                    status: status,
                    title: title
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