<template>
    <Dialog 
        :header="$t('dialog.exclude.title')" 
        :visible="isVisible" 
        :style="{ width: '350px' }" 
        :modal="true" 
        @update:visible="close"
    >
        <div class="flex items-center justify-center">
            <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
            <span>{{ $t('dialog.exclude.description') }}</span>
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