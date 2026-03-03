<template>
    <Dialog
        v-model:visible="isVisible"
        modal
        :draggable="false"
        :closable="false"
        :style="{ width: '28rem' }"
    >
        <div class="p-3">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                        <i class="pi pi-pencil text-blue-600 text-lg"></i>
                    </div>
                    <h2 class="text-xl font-semibold text-gray-800">
                        Renomear transcrição
                    </h2>
                </div>

                <button
                    @click="close"
                    class="text-gray-400 hover:text-gray-600 transition"
                >
                    ✕
                </button>
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-gray-700">
                    Título da transcrição
                </label>

                <InputText
                    v-model="newNamePatient"
                    class="w-full !rounded-lg !py-2"
                    autofocus
                />

                <p class="text-xs text-gray-400 mt-1">
                    Utilize um título que facilite a identificação futura.
                </p>
            </div>

            <div class="flex justify-end gap-3 mt-6">

                <button
                    @click="close"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                    Cancelar
                </button>

                <button
                    @click="confirm"
                    :disabled="!newNamePatient || props.loading"
                    class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                    <i v-if="!props.loading" class="pi pi-check text-sm"></i>
                    <i v-else class="pi pi-spin pi-spinner text-sm"></i>

                    {{ props.loading ? 'Salvando...' : 'Salvar alteração' }}
                </button>
            </div>
        </div>
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