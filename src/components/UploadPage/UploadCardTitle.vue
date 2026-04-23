<template>
    <div class=" mb-3">
        <div class="flex items-center gap-2">
            <Upload :size="20" />
            <p class="font-semibold text-lg">Enviar áudio</p>
        </div>
        <p class="text-slate-500 dark:text-slate-300">Formatos suportados: MP3, WAV, M4A, AAC, OGG, FLAC (máx. 100MB)</p>
    </div>
</template>

<script setup>
import { Upload } from 'lucide-vue-next';
</script>

<style scoped>
</style>