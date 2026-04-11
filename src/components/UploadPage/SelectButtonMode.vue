<template>
    <div class="w-full bg-gray-100 rounded-lg text-base p-1 flex mb-3 dark:bg-black">
        <button
            @click="update('record')"
            class="flex-1 py-2 rounded-lg font-semibold transition-all duration-200"
            :class="isRecordMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900 duration-400'"
        >
            Gravar áudio
        </button>

        <button
            @click="update('upload')"
            class="flex-1 py-2 rounded-lg font-semibold transition-all duration-200"
            :class="!isRecordMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900 duration-400'"
        >
            Enviar áudio
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: 'record'
    }
})

const emit = defineEmits([ 'changeInputMode'])

const isRecordMode = computed(() => props.modelValue === 'record')

const update = (mode) => {
    emit('changeInputMode', mode)
}
</script>