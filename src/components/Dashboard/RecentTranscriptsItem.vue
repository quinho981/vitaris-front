<template>
    <div>
        <div v-if="!loading">
            <div v-for="transcript in transcripts"
                :key="transcript.id"
                class="border-[1px] border-surface p-3 rounded-lg mt-4 hover:border-blue-400 duration-200"
            >
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-x-3">
                        <div class="p-3 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700">
                            <FileText class="text-white dark:text-surface-200" />
                        </div>
                        <div class="flex flex-col">
                            <h4 class="text-lg font-bold">{{ transcript.patient }}</h4>
                            <p>{{ transcript.document.document_template.name }} • {{ convertSecondsToMinutes(transcript.end_conversation_time) }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <p>
                            <Tag severity="secondary" :value="transcript.transcript_type.type" rounded></Tag>
                        </p>
                        <Button
                            as="router-link"
                            :to="'/transcripts/' + transcript.id"
                            label="Secondary" 
                            severity="secondary" 
                            text
                        >
                            <Eye :size="22" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded-xl">
                <ProgressSpinner style="width:60px;height:60px" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { FileText, Eye, Download } from 'lucide-vue-next';
import { useHelpers } from '@/utils/helper';

const { convertSecondsToMinutes } = useHelpers();

const props = defineProps({
    transcripts: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
}); 
</script>

<style scoped>

</style>