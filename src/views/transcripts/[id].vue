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
                        <p class="font-bold text-lg">{{ patient }}</p>
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
                        <p class="font-bold text-lg">{{ createdAt }}</p>
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
                        <p class="font-bold text-lg">{{ duration }}</p>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow duration-300 rounded-lg">
                <div class="card flex items-center gap-3 !p-6">
                    <div>
                        <Dot class="text-orange-500" />
                    </div>
                    <div>
                        <p>Tipo</p>
                        <p class="font-bold text-lg">
                            Oftalmologia
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <!-- SEÇÃO DE TRANSCRIÇÃO -->
        <div class="grid grid-cols-12 gap-4 mt-5">
            <div class="col-span-12 xl:col-span-8 rounded-lg">
                <div class="card flex ">
                    <div class="flex flex-col w-full">
                            <div class="flex gap-4 items-center w-full">
                                <Tabs value="0" class="w-full ml-2 mr-2">
                                    <TabList>
                                        <Tab value="0">Contexto da consulta</Tab>
                                        <Tab value="1">Anamnese padrão</Tab>
                                    </TabList>
                                    <!-- <TabPanels>
                                        <TabPanel value="0">
                                            <p class="m-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </p>
                                        </TabPanel>
                                        <TabPanel value="1">
                                            <p class="m-0">
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                            </p>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <p class="m-0">
                                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                                                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                                            </p>
                                        </TabPanel>
                                    </TabPanels> -->
                                </Tabs>
                            </div>
                        <div>
                            <Tiptap 
                                :content="documentContent" 
                            />
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
                        <h4 class="text-lg font-semibold mb-2">Tópicos principais</h4>
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
import { User, Calendar, Clock, Dot, Share2, Download, FileText, BrainCircuit } from 'lucide-vue-next';
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
    try {
        const response = await TranscriptsService.show(id);

        documentContent.value = ''
        patient.value = response.patient;
        createdAt.value = formatPtBrCurto(response.created_at);
        duration.value = convertSecondsToMinutes(response.end_conversation_time)
        documentContent.value = response.document.result;
    } catch (error) {
        showError(t('notifications.titles.error'), t('notifications.messages.dataLoadingError'), 3000)  
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
