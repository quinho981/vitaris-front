<template>
    <section>
        <div class="flex items-center flex-wrap justify-between mb-3 py-3">
            <div>
                <h1 class="text-3xl font-bold">Detalhes da transcrição</h1>
                <p class="my-1 text-lg ">Consulta com Marina Silva</p>
            </div>
            <div class="flex items-center gap-2">
                <router-link
                    :to="{ name: 'transcription' }"
                    class="!text-[14px] !font-semibold !py-2 px-3 flex items-center gap-2 border border-slate-200 rounded-lg bg-white hover:bg-gray-100 duration-300"
                >
                    <Share2 :size="17" />
                    Compartilhar
                </router-link>
                <router-link
                    :to="{ name: 'transcription' }"
                    class="!text-[14px] !font-semibold !py-2 px-3 flex items-center gap-2 border border-slate-200 rounded-lg bg-white hover:bg-gray-100 duration-300"
                >
                    <Download :size="17" />
                    Exportar 
                </router-link>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow duration-300 rounded-lg">
                <div class="card flex items-center gap-3 !p-6">
                    <div>
                        <User class="text-blue-500" />
                    </div>
                    <div>
                        <p>Paciente</p>
                        <p v-if="!loadingTranscript" class="font-bold text-lg">{{ patient }}</p>
                        <Skeleton v-else width="11rem" height="1.4rem" class="mt-2"></Skeleton>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow duration-300 rounded-lg">
                <div class="card flex items-center gap-3 !p-6">
                    <div>
                        <Calendar class="text-yellow-500" />
                    </div>
                    <div>
                        <p>Data</p>
                        <p v-if="!loadingTranscript" class="font-bold text-lg"> {{ createdAt }} </p>
                        <Skeleton v-else width="11rem" height="1.4rem" class="mt-2"></Skeleton>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow duration-300 rounded-lg">
                <div class="card flex items-center gap-3 !p-6">
                    <div>
                        <Clock class="text-green-500" />
                    </div>
                    <div>
                        <p>Duração</p>
                        <p v-if="!loadingTranscript" class="font-bold text-lg">{{ duration }}</p>
                        <Skeleton v-else width="11rem" height="1.4rem" class="mt-2"></Skeleton>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow duration-300 rounded-lg">
                <div class="card flex items-center gap-3 !p-6">
                    <div>
                        <LayoutTemplate class="text-orange-500" />
                    </div>
                    <div>
                        <p>Template</p>
                        <p v-if="!loadingTranscript" class="font-bold text-lg">
                            {{ documentTemplate }}
                        </p>
                        <Skeleton v-else width="11rem" height="1.4rem" class="mt-2"></Skeleton>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mt-5">
            <div class="col-span-12 xl:col-span-8 rounded-lg">
                <div class="card flex ">
                    <div class="flex flex-col w-full">
                        <div class="flex gap-4 items-center w-full">
                            <Tabs v-model:value="activeTab" class="w-full ml-2 mr-2">
                                <TabList>
                                    <Tab value="0" @click="getConversations">Contexto da consulta</Tab>
                                    <Tab value="1">Anamnese padrão</Tab>
                                </TabList>
                            </Tabs>
                        </div>
                        <div v-if="!loadingConversations">
                            <div v-show="activeTab === '0'" class="border border-slate-200 rounded-lg p-4 min-h-[21rem] max-h-[24rem] overflow-y-auto">
                                <div v-for="(conversation, uttIndex) in conversations" :key="uttIndex" class="mb-2">
                                    <div class="rounded-lg p-2">
                                        <div class="flex items-start mb-2">
                                            <div>
                                                <div class="flex items-center gap-2 ">
                                                    <span class="text-xs text-gray-500">{{ conversation.start }}s</span>
                                                </div>
                                                <p class="text-gray-800 p-2 rounded-lg bg-surface-100">{{ conversation.text }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            v-else 
                            v-show="activeTab === '0'" 
                            class="border border-slate-200 rounded-lg p-4 min-h-[21rem] max-h-[24rem] overflow-y-auto"
                        >
                            <SkeletonLoadingConversations />
                        </div>
                        <div v-show="activeTab === '1'">
                            <div v-if="loadingTranscript" class="flex items-center justify-center h-64">
                                <Loader2 :size="24" class="animate-spin mr-1" />
                                <span class="ml-2">Carregando editor...</span>
                            </div>
                            <div v-else>
                                <Tiptap :content="documentContent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-4 rounded-lg">
                <div class="card flex flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <BrainCircuit />
                        <p class="font-semibold text-xl mb-1">Insights da IA</p>
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-lg font-semibold mb-2">Tópicos principais</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-slate-100 px-2 py-1 text-sm font-bold rounded-xl">Dores de cabeça matinais</span>
                            <span class="bg-slate-100 px-2 py-1 text-sm font-bold rounded-xl">Distúrbios do sono</span>
                            <span class="bg-slate-100 px-2 py-1 text-sm font-bold rounded-xl">Estresse ocupacional</span>
                            <span class="bg-slate-100 px-2 py-1 text-sm font-bold rounded-xl">Ansiedade</span>
                        </div>
                        <hr class="my-4" />
                        <h4 class="text-lg font-semibold mb-2">Sintomas identificados</h4>
                        <div class="flex flex-wrap gap-2">
                            <ul class="custom-marker-topic list-disc list-inside">
                                <li v-for="symptom in symptoms" :key="symptom">
                                    {{ symptom }}
                                </li>
                            </ul>
                        </div>
                        <hr class="my-4" />
                        <h4 class="text-lg font-semibold mb-2">Possíveis Diagnósticos</h4>
                        <div class="flex flex-wrap gap-2">
                            <ul class="custom-marker-diagnosis list-disc list-inside">
                                <li v-for="symptom in symptoms2" :key="symptom">
                                    {{ symptom }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { User, Calendar, Clock, Dot, Share2, Download, FileText, BrainCircuit, LayoutTemplate, Loader2 } from 'lucide-vue-next';
import { TranscriptsService } from '@/service/TranscriptsService';
import { useRoute } from "vue-router";
import { useShowToast } from '@/utils/useShowToast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { showSuccess, showError } = useShowToast();

const route = useRoute();
const value = ref('');
const patient = ref('');
const createdAt = ref('');
const documentContent = ref('');
const duration = ref('');
const documentTemplate = ref('');
const activeTab = ref('1');
const conversations = ref('');
const loadingTranscript = ref(false);
const loadingConversations = ref(false);
const symptoms = [
    'Cefaleia matinal',
    'Insônia',
    'Ansiedade',
];
const symptoms2 = [
    'Cefaleia tensional',
    'Transtorno de ansiedade',
    'Distúrbio do sono relacionado ao estresse'
]

const showTranscript = async (id) => {
    loadingTranscript.value = true;
    try {
        const response = await TranscriptsService.show(id);

        documentContent.value = ''
        patient.value = response.patient;
        documentTemplate.value = response.document.document_template.name;
        createdAt.value = formatPtBrCurto(response.created_at);
        duration.value = convertSecondsToMinutes(response.end_conversation_time)
        documentContent.value = response.document.result;
    } catch (error) {
        showError(t('notifications.titles.error'), t('notifications.messages.dataLoadingError'), 3000)  
    } finally {
        loadingTranscript.value = false;
    }
}

const getConversations = async () => {
    if (conversations.value !== '') return;

    loadingConversations.value = true;
    try {
        const response = await TranscriptsService.getConversations(route.params.id);
        conversations.value = response.conversation;
    } catch (error) {
        showError(t('notifications.titles.error'), t('notifications.messages.dataLoadingError'), 3000)  
    } finally {
        loadingConversations.value = false;
    }
}

// TRANSFORMAR EM HELPER
function formatPtBrCurto(iso) {
    const d = new Date(iso); // ISO com "Z" = UTC
    const day = String(d.getUTCDate()).padStart(2, '0');
    let month = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' }).format(d);
    month = month.replace('.', '');                       // tira "ago." -> "ago"
    month = month.charAt(0).toUpperCase() + month.slice(1); // "ago" -> "Ago"
    const year = d.getUTCFullYear();
    return `${day} de ${month}, ${year}`;
}

// TRANSFORMAR EM HELPER
const convertSecondsToMinutes = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    if (mins === 0) {
        return `${secs}s`;
    }
    if (secs === 0) {
        return `${mins}min`;
    }
    return `${mins}min ${secs}s`;
};

watch(
    () => route.params.id,
    (newId) => {
        showTranscript(newId)
    }
)

onMounted(async () => {
    const id = route.params.id;
    await showTranscript(id);
});
</script>

<style scoped>
.custom-marker-topic li::marker {
  @apply text-primary;
}
.custom-marker-diagnosis li::marker {
  color: rgb(45, 187, 45);
}
</style>
