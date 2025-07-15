<template>
    <section>
        <div class="mb-3 py-3">
            <h1 class="text-3xl font-bold">Nova transcrição</h1>
            <p class="my-1 text-lg ">Grave uma consulta e obtenha a transcrição automaticamente</p>
        </div>
        <div class="flex gap-x-4">
            <div class="card w-1/2 flex flex-col">
                <div class="flex items-center gap-2">
                    <Mic />
                    <p class="font-semibold text-2xl mb-4">Gravação</p>
                </div>
                <p class="mt-1 text-slate-500 dark:text-slate-300">Controle a gravação da consulta</p>
                <div class="flex flex-col py-4 gap-y-3">
                    <div>
                        <label class="mb-1" for="name1">Nome do Paciente</label>
                        <InputText id="name1" type="text" class="w-full" placeholder="Digite o nome do paciente..." />
                    </div>
                    <div>
                        <label class=" mb-1" for="name2">Tipo de consulta</label>
                        <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecione" class="w-full"></Select>
                    </div>
                    <Divider />
                    <div>
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border p-2 py-6 gap-y-4 bg-neutral-100 dark:bg-neutral-800 border-round surface-ground w-full flex flex-col text-center font-medium rounded-lg">
                                <span class="font-robotomono text-3xl font-bold">00:00</span>
                                <div class="flex justify-center gap-x-2">
                                    <Button 
                                        v-if="!recording"
                                        class="!w-20 !h-20 !bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !rounded-full" 
                                        @click="recording = true">
                                        <Mic class="dark:!text-slate-200" />
                                    </Button>
                                    <div v-if="recording" class="flex gap-x-4">
                                        <Button class="!w-20 !h-20 !border-1 !bg-white !border-neutral-300 !text-slate-700 hover:!bg-slate-100 !rounded-full">
                                            <Pause />
                                        </Button>
                                        <Button
                                            @click="recording = false" 
                                            severity="danger" 
                                            class="!w-20 !h-20 !rounded-full" 
                                        >
                                            <Square />
                                        </Button>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center gap-x-2" v-if="recording">
                                    <span class="!w-[10px] !h-[10px] bg-red-400 rounded-full animate-pulse"></span>
                                    <p class="text-red-500 text-xl">Gravando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card w-1/2 flex flex-col">
                <div class="flex items-center gap-2">
                    <FileText />
                    <p class="font-semibold text-2xl mb-4">Transcrição</p>
                </div>
                <p class="mt-1 text-slate-500 dark:text-slate-300">Texto transcrito automaticamente pela IA</p>


                <!-- TODO: TRANSFORMAR EM COMPONENTE -->
                <div class="p-2 my-6 h-full w-full rounded-lg border-[1px] border-surface dark:border-surface flex flex-col gap-y-2">
                    <!-- <p class="text-slate-400">A transcrição aparecerá aqui conforme você grava...</p> -->
                    <div class="user-1 flex">
                        <div class="flex items-start bg-[#f0f6ff] border border-blue-100 rounded-lg p-4">
                            <div class="flex-shrink-0 w-10 h-10 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700 text-white flex items-center justify-center font-semibold text-sm mr-3">
                                Dr
                            </div>
                            <div>
                                <div class="flex flex-col">
                                    <p class="font-semibold text-sm text-gray-800">Médico</p>
                                    <span class="text-xs text-gray-500">14:30</span>
                                </div>
                                <p class="text-sm text-gray-800 mt-1">Boa tarde! Como está se sentindo sentindo sentindo sentindo sentindo hoje?</p>
                            </div>
                        </div>
                    </div>


                    <div class="user-2 flex justify-end">
                        <div class="flex items-start bg-green-50 border border-green-100 rounded-lg p-4">
                            <div>
                                <div class="flex justify-between items-center">
                                    <span class="text-xs text-gray-500">14:30</span>
                                    <p class="font-semibold text-sm text-gray-800 ml-1">Médico</p>
                                </div>
                                <p class="text-sm text-gray-800 mt-1">Boa tarde! Como está se sentindo sentindo sentindo hoje?</p>
                            </div>
                            <div class="flex-shrink-0 w-10 h-10 rounded-full !bg-gradient-to-br !from-green-500 !to-green-700 text-white flex items-center justify-center font-semibold text-sm ml-3">
                                Dr
                            </div>
                        </div>
                    </div>


                </div>
                <div class="flex justify-end">
                    <Button class="!bg-gradient-to-br !from-blue-500 !to-blue-700 dark:!text-slate-200 !border-none">
                        <Save :size="18" />
                        Salvar transcrição
                    </Button>
                </div>
            </div>
        </div>
        <div class="card flex flex-col mt-3">
            <div class="flex items-center gap-2">
                <BrainCircuit />
                <p class="font-semibold text-2xl mb-4">Análise IA</p>
            </div>
            <p class="mt-1 text-slate-500 dark:text-slate-300">Resumo automático e insights da consulta</p>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
                <!-- 1) Resumo geral -->
                <div class="col-span-1 bg-indigo-50 p-4 rounded-lg">
                    <h3 class="font-medium text-indigo-700 mb-2">Resumo da conversa</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Paciente apresenta queixa de dores de cabeça frequentes e estresse elevado. Sugerir rotina de relaxamento e hidratação.
                    </p>
                </div>

                <!-- 2) Insights-chave -->
                <div class="col-span-1 bg-green-50 p-4 rounded-lg">
                    <h3 class="font-medium text-green-700 mb-2">Insights-chave</h3>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        <li>Ocorrência de dor 3x/semana</li>
                        <li>Nível de estresse: alto</li>
                        <li>Boa adesão ao tratamento anterior</li>
                    </ul>
                </div>

                <!-- 3) Ações recomendadas -->
                <div class="col-span-1 bg-yellow-50 p-4 rounded-lg">
                    <h3 class="font-medium text-yellow-800 mb-2">Próximos passos</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="lucide-check-circle text-yellow-600 mr-2"></i>
                            <span class="text-gray-800">Iniciar protocolo de relaxamento diário</span>
                        </li>
                        <li class="flex items-center">
                            <i class="lucide-droplet text-yellow-600 mr-2"></i>
                            <span class="text-gray-800">Aumentar ingestão hídrica para 2L/dia</span>
                        </li>
                        <li class="flex items-center">
                            <i class="lucide-calendar text-yellow-600 mr-2"></i>
                            <span class="text-gray-800">Retorno em 15 dias</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Botão de exportar relatório -->
            <div class="mt-6 text-right">
                <button class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition">
                    <i class="lucide-file-text mr-2"></i>Exportar relatório
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Mic, Pause, Play, FileText, Save, Square, BrainCircuit } from 'lucide-vue-next';

const dropdownItem = ref(null);
const recording = ref(false);

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);
</script>

<style>

</style>