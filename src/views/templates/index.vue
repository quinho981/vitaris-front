<template>
    <section>
        <div class="mb-3 py-3">
            <h1 class="text-3xl font-bold">Templates</h1>
            <p class="my-1 text-lg ">Modelos pré-configurados para diferentes especialidades</p>
        </div>
        <div class="flex flex-col gap-y-4">
            <div class="card">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText v-model="searchQuery" placeholder="Pesquisar templates..." class="w-full" />
                </IconField>
            </div>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-wrap gap-4">
                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Heart class="bg-red-50 p-3 rounded-lg text-red-500" :size="45" />
                        <h3 class="text-xl font-bold">Cardiologia</h3>
                        <p>Template padrão para consultas cardiológicas com anamnese específica</p>
                        <div>
                            <Tag severity="secondary" value="0 uso" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Ver estrutura da consulta"
                                class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100"
                                @click="openTemplate('cardiologia')" />

                            <Button label="Iniciar consulta" class="w-full" @click="startTemplate('cardiologia')" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Brain class="bg-purple-50 p-3 rounded-lg text-purple-500" :size="45" />
                        <h3 class="text-xl font-bold">Neurologia</h3>
                        <p>Estrutura para avaliação neurológica completa</p>
                        <div>
                            <Tag severity="secondary" value="0 uso" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Bone class="bg-yellow-50 p-3 rounded-lg text-yellow-600" :size="45" />
                        <h3 class="text-xl font-bold">Ortopedia</h3>
                        <p>Template para avaliação musculoesquelética</p>
                        <div>
                            <Tag severity="secondary" value="0 uso" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>
                
                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Eye class="bg-blue-50 p-3 rounded-lg text-blue-600" :size="45" />
                        <h3 class="text-xl font-bold">Oftalmologia</h3>
                        <p>Estrutura para exame oftalmológico completo</p>
                        <div>
                            <Tag severity="secondary" value="0 uso" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Stethoscope class="bg-green-50 p-3 rounded-lg text-green-600" :size="45" />
                        <h3 class="text-xl font-bold">Clínica médica</h3>
                        <p>Template genérico para consultas de clínica médica</p>
                        <div>
                            <Tag severity="secondary" value="0 uso" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Users class="bg-pink-50 p-3 rounded-lg text-pink-600" :size="45" />
                        <h3 class="text-xl font-bold">Pediatria</h3>
                        <p>Estrutura adaptada para consultas pediátricas</p>
                        <div>
                            <Tag severity="secondary" value="0 uso" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
        <Dialog v-model:visible="showModal" modal header="Estrutura da consulta" :style="{ width: '700px' }">

            <div v-if="selectedTemplate === 'cardiologia'" class="flex flex-col gap-y-6">

                <!-- DESCRIÇÃO -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">
                        Como a IA organiza a consulta
                    </h3>

                    <p class="text-slate-600">
                        A IA da Vitalfy interpreta a conversa entre médico e paciente e organiza automaticamente a
                        anamnese cardiológica, identificando sintomas cardiovasculares, fatores de risco e histórico
                        clínico relevante.
                    </p>
                </div>

                <!-- ESTRUTURA -->
                <div>

                    <h3 class="text-lg font-semibold mb-2">
                        Estrutura gerada pela IA
                    </h3>

                    <ul class="list-disc ml-5 flex flex-col gap-y-1 text-sm">

                        <li>Queixa principal</li>

                        <li>História da doença atual</li>

                        <li>Sintomas cardiovasculares associados</li>

                        <li>Características da dor torácica</li>

                        <li>Fatores de risco cardiovascular</li>

                        <li>Histórico cardíaco pessoal</li>

                        <li>Histórico familiar cardiovascular</li>

                        <li>Medicações em uso</li>

                        <li>Exames cardíacos realizados ou solicitados</li>

                        <li>Suspeita diagnóstica (CID)</li>

                        <li>Conduta e tratamento</li>

                        <li>Orientações ao paciente</li>

                    </ul>

                </div>


                <!-- EXEMPLO -->
                <div>

                    <h3 class="text-lg font-semibold mb-2">
                        Exemplo de resultado
                    </h3>

                    <div class="bg-slate-50 p-4 rounded text-sm leading-relaxed">

                        <h2><strong>Dor torácica associada a esforço físico</strong></h2>
<br/>
                        <h3><strong>Queixa Principal</strong></h3>
                        <p>Paciente relata dor no peito em aperto iniciada há cerca de 3 dias, principalmente ao subir
                            escadas.</p>
<br/>
                        <h3><strong>História da Doença Atual</strong></h3>
                        <p>Dor torácica iniciada há três dias, de intensidade moderada, com piora durante esforço físico
                            e melhora ao repouso. Episódios duram aproximadamente 10 minutos.</p>
<br/>
                        <h3><strong>Sintomas Cardiovasculares Associados</strong></h3>
                        <p>Paciente refere falta de ar leve durante os episódios e fadiga.</p>
<br/>
                        <h3><strong>Fatores de Risco Cardiovascular</strong></h3>
                        <p>Hipertensão arterial e tabagismo há 20 anos.</p>
<br/>
                        <h3><strong>Suspeita Diagnóstica (CID)</strong></h3>

                        <ul class="ml-5 list-disc">
                            <li>I20 - Angina pectoris</li>
                        </ul>
<br/> 
                        <h3><strong>Conduta e Tratamento</strong></h3>
                        <p>Solicitado eletrocardiograma e teste ergométrico. Iniciado ajuste da medicação
                            anti-hipertensiva.</p>
<br/>
                        <h3><strong>Orientações ao Paciente</strong></h3>

                        <ul class="ml-5 list-disc">
                            <li>Evitar esforços intensos até avaliação completa</li>
                            <li>Reduzir consumo de sal</li>
                            <li>Retornar após realização dos exames</li>
                        </ul>

                    </div>

                </div>


                <!-- BOTÃO FINAL -->
                <Button label="Iniciar consulta com este template" class="w-full"
                    @click="startTemplate('cardiologia')" />

            </div>

        </Dialog>
    </section>
</template>

<script setup>
import { ref } from "vue"
import { Heart, Brain, Bone, Eye, Stethoscope, Users } from 'lucide-vue-next';

const searchQuery = ref("")
    const showModal = ref(false)
    const selectedTemplate = ref(null)

    const openTemplate = (template) => {
        selectedTemplate.value = template
        showModal.value = true
    }

    const startTemplate = (template) => {

        console.log("iniciar consulta com template:", template)

        /*
        Fluxo ideal:
        
        POST /transcriptions
        {
        template: template
        }
        
        redirect -> /transcription/{id}
        */

    }
</script>
