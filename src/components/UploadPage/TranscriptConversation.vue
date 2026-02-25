<template>
    <div class="card w-full md:w-1/2 flex flex-col">
        <div class="flex items-center gap-2">
            <FileAudio2 />
            <p class="font-semibold text-2xl mb-4">Transcrições</p>
        </div>
        <p class="mt-1 text-slate-500 dark:text-slate-300 mb-3">Texto transcrito automaticamente pela IA</p>
        <div class="p-2 h-full w-full rounded-lg border-[1px] border-surface dark:border-surface flex flex-col gap-y-2 xl:min-h-[350px] xl:max-h-[470px] overflow-y-auto transcript-box">
            <div v-if="transcriptions.length === 0 && !isTranscribing" class="flex items-center justify-center h-full">
                <p class="text-slate-400 text-center">A transcrição aparecerá aqui após a gravação ou o envio do áudio...</p>
            </div>
            
            <div v-if="isTranscribing" class="flex items-center justify-center p-4">
                <Loader2 :size="24" class="animate-spin mr-2" />
                <p class="text-slate-600">Transcrevendo áudio...</p>
            </div>

            <div v-for="(transcription, index) in transcriptions" :key="index" class="transcription-item">
                <div class="flex items-center gap-2 mb-3">
                    <FileAudio2 :size="16" class="text-blue-500" />
                    <span class="font-semibold text-sm text-gray-700">{{ transcription.fileName }}</span>
                    <span class="text-xs text-gray-500">{{ transcription.timestamp }}</span>
                </div>
                
                <div v-for="(utterance, uttIndex) in transcription.utterances" :key="uttIndex" class="mb-2">
                    <div class="rounded-lg p-2">
                        <div class="flex items-start mb-2">
                            <div>
                                <div class="flex items-center gap-2 ">
                                    <span class="text-xs text-gray-500">{{ utterance.start }}s</span>
                                </div>
                                <p class="text-gray-800 p-2 rounded-lg bg-surface-100">{{ utterance.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="transcriptions.length != 0 && !isTranscribing" class="flex justify-end mt-4">
            <Button 
                icon="pi pi-trash" 
                label="Limpar" 
                outlined 
                severity="danger" 
                class="mr-3" 
                @click="emit('clear')" 
                :disabled="loadingFinish"
            />
            <Button
                @click="emit('finish')"
                :disabled="loadingFinish"
                class="!bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !text-white !rounded-lg font-semibold hover:!from-blue-600 hover:!to-blue-800 duration-300"
            >
                <Loader2 v-if="loadingFinish" :size="17" class="animate-spin mr-2" />
                <FileChartColumn v-else :size="17" />
                Finalizar e gerar insights
            </Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['clear', 'finish']);

const props = defineProps({
    transcriptions: {
        type: Array,
        default: []
    },
    isTranscribing: {
        type: Boolean,
        default: false
    },
    dialogClear: {
        type: Boolean,
        default: false
    },
    loadingFinish: {
        type: Boolean,
        default: false
    }
})
</script>

<style>
</style>