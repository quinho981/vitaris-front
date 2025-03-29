import api from '@/services/axios';

export const TranscriptsService = {


    async index() {
        try {
            const response = await api.get('/user/transcripts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
