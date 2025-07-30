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
                        <h3 class="text-xl font-bold">Consulta Cardiológica</h3>
                        <p>Template padrão para consultas cardiológicas com anamnese específica</p>
                        <div>
                            <Tag severity="secondary" value="Cardiologia" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Brain class="bg-purple-50 p-3 rounded-lg text-purple-500" :size="45" />
                        <h3 class="text-xl font-bold">Consulta Neurológica</h3>
                        <p>Estrutura para avaliação neurológica completa</p>
                        <div>
                            <Tag severity="secondary" value="Neurologia" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Bone class="bg-yellow-50 p-3 rounded-lg text-yellow-600" :size="45" />
                        <h3 class="text-xl font-bold">Consulta Ortopédica</h3>
                        <p>Template para avaliação musculoesquelética</p>
                        <div>
                            <Tag severity="secondary" value="Ortopedia" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>
                
                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Eye class="bg-blue-50 p-3 rounded-lg text-blue-600" :size="45" />
                        <h3 class="text-xl font-bold">Consulta Oftalmológica</h3>
                        <p>Estrutura para exame oftalmológico completo</p>
                        <div>
                            <Tag severity="secondary" value="Oftalmologia" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Stethoscope class="bg-green-50 p-3 rounded-lg text-green-600" :size="45" />
                        <h3 class="text-xl font-bold">Consulta Clínica Geral</h3>
                        <p>Template genérico para consultas de clínica médica</p>
                        <div>
                            <Tag severity="secondary" value="Clínica médica" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>

                    <div class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300">
                        <Users class="bg-pink-50 p-3 rounded-lg text-pink-600" :size="45" />
                        <h3 class="text-xl font-bold">Consulta Pediátrica</h3>
                        <p>Estrutura adaptada para consultas pediátricas</p>
                        <div>
                            <Tag severity="secondary" value="Pediatria" rounded></Tag>
                        </div>
                        <div class="flex gap-x-4">
                            <Button label="Visualizar" class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100" />
                            <Button label="Usar Template" class="w-full" />
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    </section>
</template>

<script setup>
import { Heart, Brain, Bone, Eye, Stethoscope, Users } from 'lucide-vue-next';
</script>
