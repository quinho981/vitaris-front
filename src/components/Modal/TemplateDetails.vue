<template>
       <Dialog 
            :visible="visible"
            @update:visible="(val) => emit('update:visible', val)"
            modal 
            header="Estrutura da consulta" 
            :style="{ width: '700px' }"
        >
        <div v-if="details" class="flex flex-col gap-y-6">
            <div>
                <h3 class="text-lg font-semibold mb-2">
                    Como a IA organiza a consulta
                </h3>

                <p class="text-slate-600">
                    {{ details.description }}
                </p>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-2">
                    Estrutura gerada pela IA
                </h3>

                <ul class="list-disc ml-5 flex flex-col gap-y-1 text-sm">
                    <li v-for="item in details.structure" :key="item">
                        {{ item }}
                    </li>
                </ul>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-2">
                    Exemplo de resultado
                </h3>

                <div 
                    class="bg-slate-50 p-4 rounded leading-relaxed"
                    v-html="details.example"
                />
            </div>

            <Button 
                label="Iniciar consulta com este template" 
                class="w-full"
                @click="$emit('start', template)"
            />
        </div>

        <div v-else class="text-center text-slate-500">
            Este template não possui estrutura detalhada disponível.
        </div>
    </Dialog>
</template>

<script setup>
import { computed } from "vue"
import { templateDetailsMap } from "@/service/TemplateDetails"

const props = defineProps({
    visible: Boolean,
    template: Object
})

const emit = defineEmits(["update:visible", "start"])

const details = computed(() => {
    return templateDetailsMap[props.template?.name] || null
})
</script>