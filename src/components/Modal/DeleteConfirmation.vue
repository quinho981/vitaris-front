<template>
    <Dialog 
        :header="'Excluir transcrição?'" 
        :visible="isVisible" 
        :style="{ width: '400px' }" 
        :modal="true" 
        @update:visible="close"
    >
        <div class="flex items-center justify-center">
            <i class="pi pi-trash mr-4 text-red-500" style="font-size: 2rem" />
            <span>Ao excluir esta transcrição, todos os dados associados serão removidos permanentemente e não poderão ser recuperados.</span>
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
                label="Excluir transcrição" 
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

const isVisible = computed(() => props.active);

const emit = defineEmits(['close', 'confirm']);

const props = defineProps({
    active: {
        type: Boolean,
        required: true
    },
    item: {
        type: Object || String,
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
    emit('confirm', props.item);
};
</script>

<style scoped>
</style>