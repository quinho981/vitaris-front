<template>
    <div>
        <div class="flex items-center justify-between mr-6 font-semibold text-xl mb-2">
            <div>
                <ul class="flex text-[1rem]">
                    <li 
                        :class="tabStatus === 'conversation' ? 'border-[#14B8A6]' : ''"
                        class="p-2 border-b-2 dark:border-[#18181b] dark:text-gray-100 duration-300 cursor-pointer"
                        @click="handleClickTab('conversation')"
                    >
                        {{ $t('transcription.tab.conversation') }}
                    </li>
                    <li 
                        :class="tabStatus === 'document' ? 'border-[#14B8A6]' : ''"
                        class="p-2 border-b-2 dark:border-[#18181b] dark:text-gray-100 duration-300 cursor-pointer"
                        @click="handleClickTab('document')"
                    >
                        {{ $t('transcription.tab.transcription') }}
                    </li>
                </ul>
            </div>
            <div v-if="stepStatus('finished')">
                <Button :label='$t("button.copyText")' icon="pi pi-copy" class="p-button-link !m-0 !p-0" @click="copyText" />
            </div>
        </div>
        <ChatResponse
            :active="true"
            :item="tabStatus === 'conversation' ? chat : documentContent"
        />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { TranscriptsService } from '@/service/TranscriptsService';
import { useRoute } from "vue-router";

const route = useRoute();
const documentContent = ref([]);
const tabStatus = ref('document')
const toast = useToast();
const chat = ref([]);
const status = ref('finished');

const stepStatus = (step) => {
    return step === status.value
}

const copyText = () => {
    let textToCopy = document.getElementById("anamnese-result").innerText;
    navigator.clipboard.writeText(textToCopy);
    showSuccess('Sucesso!', 'Texto copiado com sucesso!', 3000)
};

function showSuccess(summary, detail, life) {
    toast.add({ severity: 'success', summary: summary, detail: detail, life: life });
}

const handleClickTab = (tab) => {
    tabStatus.value = tab
}

const showTranscript = async (id) => {
    chat.value = []
    documentContent.value = []
    
    try {
        const response = await TranscriptsService.show(id);

        status.value = response.status
        chat.value.push(response.conversation);
        documentContent.value.push(response.document.result);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);   
    } 
}

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
</style>