import { useToast } from 'primevue/usetoast';
import { ensurePrimeVueFeedbackServices } from '@/plugins/primevueServices';

export const useShowToast = () => {
    const showSuccess = (summary, detail, life) => {
        ensurePrimeVueFeedbackServices()
            .then(() => {
                const toast = useToast();
                toast.add({ severity: 'success', summary, detail, life });
            })
            .catch((error) => {
                console.error('Failed to load PrimeVue toast service.', error);
            });
    };
    
    
    const showError = (summary, detail, life) => {
        ensurePrimeVueFeedbackServices()
            .then(() => {
                const toast = useToast();
                toast.add({ severity: 'error', summary, detail, life });
            })
            .catch((error) => {
                console.error('Failed to load PrimeVue toast service.', error);
            });
    };

    return {
        showSuccess,
        showError
    };
};
