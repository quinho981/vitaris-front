import api from '@/services/axios';
import Cookies from 'js-cookie';

export const TranscriptsService = {
    async index() {
        const token = Cookies.get('token');
        try {
            const response = await api.get('/user/transcripts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
