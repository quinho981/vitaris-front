<template>
    <div class="w-full bg-gray-100 dark:bg-zinc-900 rounded-lg p-1 flex mb-3">
        <button
            @click="update('record')"
            class="flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="isRecordMode
                ? 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-slate-100 shadow-sm'
                : 'text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
        >
            Gravar áudio
        </button>

        <button
            @click="update('upload')"
            class="flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="!isRecordMode
                ? 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-slate-100 shadow-sm'
                : 'text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
        >
            Enviar áudio
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: { type: String, default: 'record' }
})

const emit = defineEmits(['changeInputMode'])
const isRecordMode = computed(() => props.modelValue === 'record')
const update = (mode) => emit('changeInputMode', mode)
</script>