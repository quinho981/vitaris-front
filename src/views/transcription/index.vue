<template>
    <section>
        <div class="mb-3">
            <h1 class="text-3xl font-bold">Nova transcrição</h1>
            <p class="my-1 text-lg ">Converta suas consultas em texto com IA</p>
        </div>
        <div class="flex gap-2">
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
                                    <Button class="!w-20 !h-20 !bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none" rounded>
                                        <Mic />
                                    </Button> 
                                    <!-- <Button class="!w-20 !h-20 !border-1 !bg-white !border-neutral-300 !text-slate-700 hover:!bg-slate-100" rounded>
                                        <Pause />
                                    </Button>
                                    <Button severity="danger" class="!w-20 !h-20" rounded>
                                        <Play />
                                    </Button> -->
                                </div>
                                <div class="flex justify-center items-center gap-x-2">
                                    <span class="!w-[10px] !h-[10px] bg-red-400 rounded-full animate-pulse"></span>
                                    <p class="text-red-500 text-xl">Gravando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card w-1/2">
                <div class="font-semibold text-xl mb-4">Empty Page</div>
                <p>Use this page to start from scratch and place your custom content.</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Mic, Pause, Play  } from 'lucide-vue-next';

const dropdownItem = ref(null);

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);
</script>

<style>

</style>