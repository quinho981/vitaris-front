<template>
    <Dialog 
        :header="'Renomear transcrição'" 
        :visible="isVisible" 
        :style="{ width: '400px' }" 
        :modal="true" 
        @update:visible="close"
    >
        <div class="flex flex-col">
            <label class="mb-1 text-lg" for="name">Título da transcrição</label>
            <InputText v-model="newNamePatient" class="w-full" size="large" />
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
                label="Renomear" 
                icon="pi pi-check" 
                @click="confirm" 
                severity="primary" 
                autofocus 
                :loading="props.loading" 
            />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

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

const newNamePatient = ref('')

watch(
    () => props.active,
    (value) => {
        if (value && props.item) {
            newNamePatient.value = props.item.patient;
        }
    }
);

const close = () => {
    emit('close', false);
};

const confirm = () => {
    emit('confirm', newNamePatient.value);
};
</script>

<style scoped>
</style>