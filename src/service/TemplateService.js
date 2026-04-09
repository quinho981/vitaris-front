
import api from '@/services/axios';
import Cookies from 'js-cookie';

export const TemplatesService = {
    async getTemplatesWithDocumentsCount(page = 1, search = null, category = null, perPage = 10) {
        const token = Cookies.get('token');
        const response = await api.get(`/templates/with-documents-count`, { 
            headers: { Authorization: `Bearer ${token}` },
            params: { page, search, category, per_page: perPage }
        });
        return response.data
    },
    async getCountCategories() {
        const token = Cookies.get('token');
        const response = await api.get(`/templates/count-categories`, { 
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data
    },
}
