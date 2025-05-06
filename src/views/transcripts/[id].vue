<template>
    <div>
        <div class="flex items-center justify-between mr-6 font-semibold text-xl mb-2">
            <div>
                <ul class="flex text-[1rem]">
                    <li 
                        :class="tabStatus === 'conversation' ? 'border-[#14B8A6]' : 'dark:border-[#18181b]'"
                        class="p-2 border-b-2 dark:text-gray-300 duration-300 cursor-pointer"
                        @click="handleClickTab('conversation')"
                    >
                        {{ $t('transcription.tab.conversation') }}
                    </li>
                    <li 
                        :class="tabStatus === 'document' ? 'border-[#14B8A6]' : 'dark:border-[#18181b]'"
                        class="p-2 border-b-2 dark:text-gray-300 duration-300 cursor-pointer"
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
import { TranscriptsService } from '@/service/TranscriptsService';
import { useRoute } from "vue-router";
import { useShowToast } from '@/utils/useShowToast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { showSuccess, showError } = useShowToast();

const route = useRoute();
const documentContent = ref([]);
const tabStatus = ref('document')
const chat = ref([]);
const status = ref('finished');

const stepStatus = (step) => {
    return step === status.value
}

const copyText = () => {
    let textToCopy = document.getElementById("anamnese-result").innerText;
    navigator.clipboard.writeText(textToCopy);
    showSuccess(t('notifications.titles.success'), t('notifications.messages.textCopiedSuccessfully'), 3000)
};

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
        showError(t('notifications.titles.error'), t('notifications.messages.dataLoadingError'), 3000)  
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