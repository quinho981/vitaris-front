<template>
    <Dialog
        v-model:visible="isVisible"
        modal
        :draggable="false"
        :closable="false"
        class="!rounded-2xl"
        :style="{ width: '35rem' }"
    >
        <div class="p-6">

            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <BrainCircuit class="text-blue-600" />
                    <h2 class="text-xl font-semibold">Refinar Anamnese</h2>
                </div>
                <button @click="showRefineModal = false" class="text-gray-400 hover:text-gray-600 transition">
                    ✕
                </button>
            </div>

            <p class="text-sm text-gray-500 mb-1">
                Escolha como deseja aprimorar o registro clínico.
            </p>

            <p class="text-xs text-gray-400 mb-5">
                A análise é baseada exclusivamente no conteúdo desta consulta.
            </p>

            <div class="flex flex-col gap-3">

                <label class="flex flex-col gap-1 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <div class="flex items-center gap-3">
                        <input type="checkbox" value="clarity" v-model="selectedRefinements" />
                        <span class="font-medium">Melhorar clareza do texto</span>
                    </div>
                    <p class="text-xs text-gray-500">
                        Reorganiza frases para maior fluidez e compreensão.
                    </p>
                </label>

                <label class="flex flex-col gap-1 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <div class="flex items-center gap-3">
                        <input type="checkbox" value="technical" v-model="selectedRefinements" />
                        <span class="font-medium">Tornar linguagem mais técnica</span>
                    </div>
                    <p class="text-xs text-gray-500">
                        Adequa o texto para terminologia médica formal.
                    </p>
                </label>

                <label class="flex flex-col gap-1 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <div class="flex items-center gap-3">
                        <input type="checkbox" value="soap" v-model="selectedRefinements" />
                        <span class="font-medium">Organizar em formato SOAP</span>
                    </div>
                    <p class="text-xs text-gray-500">
                        Estrutura em Subjetivo, Objetivo, Avaliação e Plano.
                    </p>
                </label>

                <label class="flex flex-col gap-2 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <div class="flex items-center gap-3">
                        <input type="checkbox" value="custom" v-model="selectedRefinements" />
                        <span class="font-medium">Personalizar refinamento</span>
                    </div>

                    <div v-if="selectedRefinements.includes('custom')" class="mt-2">

                        <p class="text-xs text-gray-500 mb-2">
                            Descreva como deseja aprimorar o registro clínico.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-3">
                            <button
                                v-for="suggestion in customSuggestions"
                                :key="suggestion"
                                @click.prevent="customInstruction = suggestion"
                                class="text-xs px-3 py-1 border rounded-full hover:bg-blue-50 hover:border-blue-300 transition"
                            >
                                {{ suggestion }}
                            </button>
                        </div>

                        <textarea
                            v-model="customInstruction"
                            rows="3"
                            class="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: Reforçar justificativa clínica da hipótese principal..."
                        ></textarea>
                    </div>
                </label>
            </div>

            <div class="flex justify-end gap-3 mt-6">
                <button 
                    @click="showRefineModal = false"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                    Cancelar
                </button>

                <button 
                    @click="applyRefinement"
                    :disabled="selectedRefinements.length === 0"
                    class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Aplicar Refinamento
                </button>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { BrainCircuit } from "lucide-vue-next";

const isVisible = computed(() => props.showRefineModal);

const props = defineProps({
    showRefineModal: {
        type: Boolean,
        default: false
    }
}); 

const selectedRefinements = ref([]);
</script>

<style scoped>
</style>