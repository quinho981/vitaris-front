<template>
    <div>
        <div>
            <div v-if="loading">
                <div
                    v-for="n in 4"
                    :key="n"
                    class="border-[1px] border-surface p-3 rounded-lg mt-4"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-3">
                            <Skeleton shape="circle" size="3rem" />

                            <div class="flex flex-col gap-2">
                                <Skeleton width="150px" height="23px" />
                                <Skeleton width="200px" height="19px" />
                            </div>
                        </div>

                        <div class="flex items-center gap-x-2">
                            <Skeleton width="80px" height="24px" />
                            <Skeleton shape="circle" size="2rem" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="!transcripts && !loading"
                class="flex justify-center p-14">
                <p>Sem transcrições recentes no momento...</p>
            </div>
            <div v-else>
                <div
                    v-for="transcript in transcripts"
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
                                <p>
                                    {{ transcript.document.document_template.name }} •
                                    {{ convertSecondsToMinutes(transcript.end_conversation_time) }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-x-2">
                            <Tag severity="secondary" :value="transcript.transcript_type.type" rounded />
                            
                            <Button
                                as="router-link"
                                :to="'/transcripts/' + transcript.id"
                                severity="secondary"
                                text
                                v-tooltip.top="'Visualizar'"
                            >
                                <Eye :size="22" />
                            </Button>
                        </div>
                    </div>
                </div>
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