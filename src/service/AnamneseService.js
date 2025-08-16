import api from '@/services/axios';
import Cookies from 'js-cookie';

export const AnamneseService = {

    async generator(payload, patient, status) {
        const token = Cookies.get('token');
        try {
            const response = await api.post('/generate-document',
                {
                    conversation: payload,
                    status: status,
                    patient: patient
                },
                {   
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}