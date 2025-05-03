import api from '@/services/axios';
import Cookies from 'js-cookie';
// import { useToast } from 'primevue/usetoast';

// const toast = useToast();

export const TranscriptsService = {
    async index(page = 1, perPage = 10) {
        const token = Cookies.get('token');
        try {
            const response = await api.get(`/user/transcripts?page=${page}&perPage=${perPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                transcripts: response.data.data,
                total: response.data.total,
                perPage: response.data.per_page
            };
        } catch (error) {
            console.error(error);
            // toast.add({ severity: 'success', summary: 'Error!', detail: 'Tente novamente', life: 4000 });
        }
    },
    async indexPerDate() {
        const token = Cookies.get('token');
        try {
            const response = await api.get(`/user/transcripts/perDate`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async show(id) {
        const token = Cookies.get('token');
        try {
            const response = await api.get(`/transcripts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    delete(id) {
        const token = Cookies.get('token');
        try {
            const response = api.delete(`/transcripts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    },
    update(data) {
        const token = Cookies.get('token');
        try {
            const response = api.put(`/transcripts`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    }
}
