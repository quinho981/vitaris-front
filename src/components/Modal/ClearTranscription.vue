<template>
    <Dialog 
        header="Limpar transcrição" 
        :visible="isVisible" 
        :style="{ width: '350px' }" 
        :modal="true" 
        @update:visible="close"
    >
        <div class="flex items-center justify-center">
            <TriangleAlert :size="60" class="mr-3" />
            <div class="flex flex-col">
                <p class="mb-2">Você tem certeza de que deseja limpar todos os dados preenchidos?</p>
            </div>
        </div>
        <template #footer>
            <Button 
                :label="$t('dialog.exclude.button.cancel')" 
                icon="pi pi-times" 
                @click="close" 
                text 
                severity="secondary" 
            />
            <Button 
                :label="$t('dialog.exclude.button.confirm')" 
                icon="pi pi-check" 
                @click="confirm" 
                severity="danger" 
                outlined 
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