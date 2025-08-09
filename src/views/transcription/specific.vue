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
                        <p class="font-bold text-lg">Marina Silva</p>
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
                        <p class="font-bold text-lg">15 de Jan, 2024</p>
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
                        <p class="font-bold text-lg">25min</p>
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
                <div class="card flex gap-2">
                    <div class="flex flex-col w-full">
                        <div class="flex items-center gap-2">
                            <FileText />
                            <p class="font-semibold text-xl">Transcrição Completa</p> <Chip label="25min" class="text-xs"></Chip>
                        </div>
                        <div class="mt-5">
                            <Tiptap />
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
import { ref } from 'vue';
import { User, Calendar, Clock, Dot, Share2, Download, FileText, BrainCircuit } from 'lucide-vue-next';

const value = ref('');
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
</script>

<style scoped>
.custom-marker-topic li::marker {
  @apply text-primary;
}
.custom-marker-diagnosis li::marker {
  color: rgb(45, 187, 45);
}
</style>
