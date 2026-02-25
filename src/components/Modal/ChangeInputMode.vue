<template>
    <Dialog 
        header="Trocar modo de consulta?" 
        :visible="isVisible" 
        :style="{ width: '450px' }" 
        :modal="true" 
        @update:visible="close"
    >
        <div class="flex items-center justify-center">
            <TriangleAlert :size="60" class="mr-3 text-red-500" />
            <div class="flex flex-col">
                <p class="mb-2">Você já possui uma gravação em andamento.</p>
                <p class="mb-3">Ao mudar para <b>Envio de arquivo, todo o progresso da gravação será perdido permanentemente.</b></p>
                <p class="mb-2">Deseja continuar?</p>
            </div>
        </div>
        <template #footer>
            <Button 
                :label="$t('dialog.exclude.button.cancel')"
                icon="pi pi-times" 
                @click="close" 
                outlined 
                severity="secondary" 
            />
            <Button 
                label="Trocar e descartar gravação" 
                icon="pi pi-check" 
                @click="confirm" 
                severity="danger" 
                autofocus 
                :loading="props.loading" 
            />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TriangleAlert } from 'lucide-vue-next';

const isVisible = computed(() => props.active);

const emit = defineEmits(['close', 'confirm']);

const props = defineProps({
    active: {
        type: Boolean,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
}); 

const close = () => {
    emit('close', false);
};

const confirm = () => {
    emit('confirm');
};
</script>

<style scoped>
</style>