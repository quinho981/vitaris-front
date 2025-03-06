<template>
    <Dialog
        :visible="true"
        :dismissable-mask="true"
        :breakpoints="{ '960px': '75vw' }" 
        :style="{ width: '55vw' }" 
        modal
        class="!border-none"
        :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }"
    >
        <template #container>
            <div class="flex">
                <div class="flex">
                    <div class="flex-1 py-6 px-2 bg-[#14b8a6] text-white rounded-l-xl flex flex-col text-center">
                        <div class="flex justify-center mb-2">
                            <SelectButton 
                                v-model="selectButtonValue" 
                                :options="selectButtonValues" 
                                optionLabel="name" 
                                class="py-4"
                            />
                        </div>
                        <p class="text-2xl font-semibold py-1">Plano PRO - Economize 40%</p>
                        <p class="text-md pt-1">
                            Utilize a Voa de forma ilimitada em suas consultas, utilizando ferramentas exclusivas para usuários Pro.
                        </p>
                        <div class="prices py-2">
                            <p class="text-4xl font-bold mt-3">
                                R$249,00 <span class="text-lg">/mês</span>
                            </p>
                            <p class="text-sm line-through">
                                de R$4.788,00 por R$2.988,00 por ano
                            </p>
                        </div>
                        <Button label="Desbloquear plano Pro" class=" mt-6 mb-5 w-11/12 m-auto" rounded severity="secondary"/>
                        <p class="text-sm mt-2 pb-2">
                            ❤️ Mais de <b>18.000</b> médicos utilizando neste momento
                        </p>
                    </div>
                    <div class="flex-1 pt-6 ml-6">
                        <div class="header flex justify-between ">
                            <h3 class="font-bold text-lg mb-2">Veja as vantagens:</h3>
                            <span 
                                class="mr-6 text-lg font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 px-2 rounded-3xl"
                            >X</span>
                        </div>
                        <ul class="mt-2 flex flex-col gap-y-4 text-lg">
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Consultas ilimitadas</li>
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Mais de 30 modelos de anamneses</li>
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Colaboração ilimitada em tempo real em consultas</li>
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Impressão personalizada dos documentos gerados</li>
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Melhorar anamnese com IA</li>
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Geração de outros documentos clínicos</li>
                            <li><i class="pi pi-check text-green-500 mr-2"></i> Compartilhamento de todos documentos gerados</li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const selectButtonValue = ref(null);
const selectButtonValues = ref([{ name: 'Anual' }, { name: 'Semestral' }, { name: 'Mensal' }]);
</script>

<style lang="scss" scoped>

</style>