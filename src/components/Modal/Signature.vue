<template>
    <Dialog
        :visible="isVisible"
        @update:visible="close"
        :dismissable-mask="true"
        :breakpoints="{ '1024px': '75vw', '960px': '75vw', '350px': '85vw' }" 
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
            <div class="flex flex-col md:flex-row overflow-auto">
                <div class="flex-1 py-6 px-2 bg-[#14b8a6] text-white rounded-l-xl flex flex-col text-center">
                    <div class="flex-1 justify-center mb-2">
                        <SelectButton 
                            v-model="selectButtonValue" 
                            :options="selectButtonValues" 
                            optionLabel="name" 
                            class="py-4"
                        />
                    </div>
                    <p class="text-2xl font-semibold py-1">{{ $t("signature.modal.proPlan") }} - <u>{{ $t("signature.modal.economize") }} <b>{{ $t("signature.modal.forty") }}</b></u> </p>
                    <p class="text-md pt-1 px-2">
                        {{ $t("signature.modal.signatureDescription") }}
                    </p>
                    <div class="prices py-2">
                        <p class="text-4xl font-bold mt-3">
                            R$249,00 <span class=" md:text-lg">{{ $t("signature.modal.month") }}</span>
                        </p>
                        <p class="text-sm line-through">
                            {{ $t("signature.modal.signaturePrice", {priceTotal: '4.788,00', pricePromotion: '2.988,00', signatureType: 'ano'}) }}
                        </p>
                    </div>
                    <Button label="Desbloquear plano Pro" class=" mt-6 mb-5 w-11/12 m-auto"  severity="secondary"/>
                    <p class="text-sm mt-2 pb-2">
                        {{ $t("signature.modal.totalDoctorsDescription", {totalDoctors: 18.001}) }}
                    </p>
                </div>
                <div class="flex-1 pt-6 ml-6 p-0 px-2 lg:px-0">
                    <div class="header flex justify-between ">
                        <h3 class="font-bold  md:text-lg mb-2">{{ $t("signature.modal.seeTheBenefits") }}</h3>
                        <span 
                            class="mr-6 md:text-lg font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 px-2 pt-1 rounded-3xl"
                            @click="close"
                        >X</span>
                    </div>
                    <ul class="mt-2 flex flex-col gap-y-4 md:text-lg">
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit1") }}</li>
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit2") }}</li>
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit3") }}</li>
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit4") }}</li>
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit5") }}</li>
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit6") }}</li>
                        <li><i class="pi pi-check text-green-500 mr-2"></i> {{ $t("signature.modal.benefits.benefit7") }}</li>
                    </ul>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";

const selectButtonValue = ref(null);
const selectButtonValues = ref([{ name: 'Anual' }, { name: 'Semestral' }, { name: 'Mensal' }]);

const isVisible = computed(() => props.active);

const emit = defineEmits(['close']);

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

const close = () => {
    emit('close', false);
}
</script>

<style lang="scss" scoped>

</style>