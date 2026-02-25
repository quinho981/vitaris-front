<template>
    <section>
        <div class="mb-3 py-3">
            <h1 class="text-3xl font-bold">Transcrição de áudio</h1>
            <p class="my-1 text-lg ">Grave ou envie uma consulta e obtenha a transcrição automaticamente</p>
        </div>
        <div class="flex gap-x-4 flex-wrap md:flex-nowrap">
            <div class="card w-full md:w-1/2 flex flex-col mb-5 md:mb-0">
                <SelectButtonMode 
                    :modelValue="inputMode"
                    @changeInputMode="confirmInputModeChangeIfFileSelected"
                />

                <RecordCardTitle v-if="isRecordMode()" />
                <UploadCardTitle v-if="!isRecordMode()" />

                <div class="flex flex-col">
                    <div>
                        <label class="mb-1" for="name">Nome do Paciente</label>
                        <InputText id="name" v-model="form.patient" type="text" class="w-full" placeholder="Digite o nome do paciente..." />
                    </div>
                    <div class="flex gap-4 flex-wrap xl:flex-nowrap mt-2 mb-5">
                        <div class="w-full">
                            <label class=" mb-1" for="template">Template<span class="text-red-500">*</span></label>
                            <Select 
                                id="template" 
                                v-model="form.template_id" 
                                :options="dropdownTemplates" 
                                filter
                                :loading="loadingTemplates"
                                :class="{ 'p-invalid': errorMessage }"
                                optionValue="id" 
                                optionLabel="name" 
                                placeholder="Selecione" 
                                class="w-full" 
                            />
                        </div>
                        <div class="w-full">
                            <label class=" mb-1" for="type">Tipo de consulta<span class="text-red-500">*</span></label>
                            <Select 
                                id="type" 
                                v-model="form.type_id" 
                                :options="dropdownTypes"
                                :loading="loadingTypes"
                                :class="{ 'p-invalid': errorMessage }"
                                optionValue="id" 
                                optionLabel="type" 
                                placeholder="Selecione" 
                                class="w-full" 
                            />
                        </div>
                    </div>

                    <FileUpload
                        ref="uploader"
                        name="demo[]"
                        :auto="false"
                        @select="onFileSelect"
                        :multiple="false"
                        accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
                        class="custom-uploader"
                        :showThumbnails="false"
                        v-if="!isRecordMode()"
                    >
                        <template #header><span class="hidden"></span></template>
                        <template #content="{ files }"> 
                            <div v-if="files.length > 0">
                                <div class="flex flex-col p-2 sm:p-5 gap-3 bg-neutral-100 rounded-lg">
                                    <div 
                                        v-for="(file) of files" 
                                        :key="file.name + file.type + file.size" 
                                        class="flex items-center justify-between w-full gap-3"
                                    >
                                        <div class="flex items-center gap-3 flex-1 min-w-0">
                                            <FileVolume class="shrink-0" />
                                            <div class="flex flex-col min-w-0">
                                                <span class="font-semibold text-sm sm:text-base truncate">{{ file.name }}</span>
                                                <span class="text-xs text-gray-500">{{ formatSize(file.size) }}</span>
                                            </div>
                                            <Badge 
                                                :value="file.type" 
                                                severity="warning" 
                                                class="shrink-0"
                                            />
                                        </div>
                                        <Button 
                                            icon="pi pi-times" 
                                            @click="removeFile" 
                                            outlined 
                                            severity="danger" 
                                            class="shrink-0"
                                        />
                                    </div>

                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div class="upload-area p-fileupload-choose p-fileupload-droppable gap-y-1 hover:!border-blue-400 duration-200">
                                <Upload :size="34" class="text-slate-500 mb-1" />
                                <p class="upload-text !text-base">
                                    <span class="text-black">Arraste e solte seu arquivo aqui</span><br />
                                    ou clique para selecionar
                                </p>
                                <span class="p-button p-button-outlined p-button-md p-fileupload-choose" @click="openFileDialog">
                                    Selecionar Arquivo
                                </span>
                            </div>
                        </template>
                    </FileUpload>
                    <AudioRecord 
                        v-if="isRecordMode()"
                        @recorded="handleRecordedFile" 
                        @recording-started="scrollAfterRecordingStart"
                    />
                    
                    <div class="flex justify-end mt-3">
                        <Button
                            ref="submitBtn"
                            @click="transcribeAudio"
                            :disabled="!selectedFile || isTranscribing"
                            class="!bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !text-white !rounded-lg font-semibold hover:!from-blue-600 hover:!to-blue-800 duration-300"
                        >
                            <Loader2 v-if="isTranscribing" :size="17" class="animate-spin mr-2" />
                            <SendHorizontal v-else :size="17" class="mr-1" />
                            {{ isTranscribing ? 'Transcrevendo...' : 'Enviar' }}
                        </Button>
                    </div>
                </div>
            </div>
            <TranscriptConversation
                :transcriptions="transcriptions"
                :is-transcribing="isTranscribing"
                :dialog-clear="dialogClear"
                :loading-finish="loadingFinish"
                @clear="dialogClear = true"
                @finish="finishConversation"
            />
        </div>
        <ChangeInputMode 
            :active="dialogChangeInputMode" 
            :loading="dialogLoading" 
            @close="dialogChangeInputMode = false" 
            @confirm="confirmChangeInputMode"
        />
        <ClearTranscription 
            :active="dialogClear"
            :loading="dialogLoading"
            @close="dialogClear = false" 
            @confirm="confirmClearTranscription"
        />
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Upload, FileAudio2, FileVolume, SendHorizontal, Loader2, FileChartColumn } from 'lucide-vue-next';
import { AnamneseService } from '@/service/AnamneseService';
import { SelectOptionsService } from '@/service/SelectOptionsService';
import { useShowToast } from '@/utils/useShowToast';
import { useI18n } from 'vue-i18n';
import { useRouter } from "vue-router";
import api from '@/services/axios';
import Cookies from 'js-cookie';
import { useHelpers } from '@/utils/helper';

const router = useRouter();
const { t } = useI18n();
const { showSuccess, showError } = useShowToast();
const { formatSize } = useHelpers();

const DEEPGRAM_API_KEY = '7bfd2857b37455faf82a84bf1f0e7406afdb1372';

const inputMode = ref('record')
const chatTranscription = ref();
const uploader = ref(null)
const selectedFile = ref(null)
const isTranscribing = ref(false)
const loadingFinish = ref(false)
const dialogClear = ref(false)
const dialogLoading = ref(false)
const dialogChangeInputMode = ref(false)
const transcriptions = ref([])
const loadingTemplates = ref(false)
const loadingTypes = ref(false)
const endConversationTime = ref('')
const dropdownTemplates = ref([]);
const dropdownTypes = ref([]);
const errorMessage = ref(false);
const fileSize = ref('')
const form = ref({
    patient: '',
    template_id: null,
    type_id: null
})
const submitBtn = ref(null)
const pendingInputMode = ref(null);

const scrollAfterRecordingStart = () => {
    nextTick(() => {
        submitBtn.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
}

function openFileDialog() {
    if (transcriptions.value.length > 0) {
        alert('Por favor, limpe a transcrição antes de enviar um novo arquivo.');
        return;
    }
    uploader.value?.choose();
}

const onFileSelect = (event) => {
    selectedFile.value = event.files[0];
};

const removeFile = () => {
    selectedFile.value = null;
    uploader.value?.clear();
};

const confirmClearTranscription = () => {
    dialogClear.value = false
    clearTranscriptionData()
};

const clearTranscriptionData = () => {
    removeFile();
    transcriptions.value = [];
    chatTranscription.value = null;
    fileSize.value = ''
    endConversationTime.value = ''
}

const validateAudioFile = (file) => {
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (file.size > maxSize) return { valid: false, error: 'Arquivo muito grande. Máximo permitido: 100MB' };

    const supportedTypes = [
        'audio/mpeg',      // MP3
        'audio/mp3',       // MP3 alternativo
        'audio/wav',       // WAV
        'audio/m4a',       // M4A
        'audio/aac',       // AAC
        'audio/ogg',       // OGG
        'audio/flac',       // FLAC
        'audio/webm'       // WebM (gerado por gravação no navegador)
    ];

    if (!supportedTypes.includes(file.type)) {
        return { 
            valid: false, 
            error: `Formato não suportado: ${file.type}. Use MP3, WAV, M4A, AAC, OGG, WebM ou FLAC` 
        };
    }

    fileSize.value = file.size
    return { valid: true };
};

const transcribeAudio = async () => {
    if (!validateForm()) return;
    
    errorMessage.value = false;

    if (!hasSelectedFile()) {
        alert('Por favor, selecione um arquivo de áudio primeiro.');
        return;
    }

    const validation = validateAudioFile(selectedFile.value);
    if (!validation.valid) {
        alert(validation.error);
        return;
    }

    isTranscribing.value = true;

    try {
        const arrayBuffer = await selectedFile.value.arrayBuffer();
        console.log('Arquivo convertido para ArrayBuffer, tamanho:', arrayBuffer.byteLength);
        console.log('Arquivo arraybuffer:', arrayBuffer);
        console.log('arquivo original:', selectedFile.value);
        let mimeType = selectedFile.value.type;

        if (!mimeType) {
            const fileName = selectedFile.value.name.toLowerCase();

            if (fileName.endsWith('.mp3')) mimeType = 'audio/mpeg';
            else if (fileName.endsWith('.wav')) mimeType = 'audio/wav';
            else if (fileName.endsWith('.m4a')) mimeType = 'audio/mp4';
            else if (fileName.endsWith('.aac')) mimeType = 'audio/aac';
            else if (fileName.endsWith('.ogg')) mimeType = 'audio/ogg';
            else if (fileName.endsWith('.flac')) mimeType = 'audio/flac';
            else if (fileName.endsWith('.webm')) mimeType = 'audio/webm';
        }

        const url = new URL('https://api.deepgram.com/v1/listen');
        url.searchParams.set('model', 'nova-2');
        url.searchParams.set('language', 'pt-BR');
        url.searchParams.set('punctuate', true);
        url.searchParams.set('diarize', true);
        url.searchParams.set('utterances', true);
        url.searchParams.set('smart_format', true);
        url.searchParams.set('multichannel', false);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Authorization': `Token ${DEEPGRAM_API_KEY}`,
                'Content-Type': mimeType,
            },
            body: arrayBuffer
        });

        const responseText = await response.text();
        console.log('Resposta bruta do Deepgram (texto):', responseText);

        if (!response.ok) {
            const errorData = JSON.parse(responseText);
            throw new Error(errorData.err_msg);
        }

        const result = JSON.parse(responseText);
        console.log('Resposta bruta do Deepgram:', result);
        
        if (!result.results || !result.results.channels || result.results.channels.length === 0) {
            throw new Error('Nenhum resultado de transcrição foi retornado. Verifique se o arquivo contém áudio válido.');
        }

        const processedTranscription = processDeepgramResultAndCreateChatDesign(result, selectedFile.value.name);
        console.log('Transcrição processada:', processedTranscription);
        
        if (processedTranscription.utterances.length === 0) {
            throw new Error('Não foi possível extrair texto do áudio. Verifique se o arquivo contém fala audível.');
        }

        chatTranscription.value = processedTranscription.utterances;
        transcriptions.value.unshift(processedTranscription);

        selectedFile.value = null;
        uploader.value?.clear();
    } catch (error) {
        alert('Erro ao transcrever o áudio.');
    } finally {
        isTranscribing.value = false;
    }
};

const getLastUtteranceEndTime = (utterances) => {
    if (!utterances?.length) return null;
    return endConversationTime.value = utterances[utterances.length - 1].end ?? null;
};

const processDeepgramResultAndCreateChatDesign = (result, fileName) => {
    const utterances = [];
    
    if (result.results?.utterances) {
        getLastUtteranceEndTime(result.results?.utterances)

        // Se a diarização estiver disponível, usar utterances
        result.results.utterances.forEach((utterance) => {
            utterances.push({
                text: utterance.transcript,
                start: Math.round(utterance.start * 100) / 100,
                end: Math.round(utterance.end * 100) / 100
            });
        });
    } else if (result.results?.channels?.[0]?.alternatives?.[0]) {
        // Fallback: usar transcrição simples se diarização não estiver disponível
        const transcript = result.results.channels[0].alternatives[0].transcript;
        
        // Dividir em partes simulando diferentes utterances
        const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);
        sentences.forEach((sentence, index) => {
            utterances.push({
                text: sentence.trim() + '.',
                start: index * 10,
                end: (index + 1) * 10
            });
        });
    }

    return {
        fileName: fileName,
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        utterances: utterances
    };
};

const finishConversation = async () => {
    loadingFinish.value = true;

    try {
        const payload = buildPayload();
        const response = await AnamneseService.generator(payload);

        redirectTo(response.transcript_id);
    } catch (error) {
        showError(t('notifications.titles.error'), t('notifications.messages.anamnesisGeneratingError'), 3000);
    } finally {
        loadingFinish.value = false;
    }
};

const confirmInputModeChangeIfFileSelected = (newValue) => {
    if (!hasSelectedFile() && !hasTranscriptions()) {
        inputMode.value = newValue
        return
    }
    
    pendingInputMode.value = newValue;
    dialogChangeInputMode.value = true
}

const confirmChangeInputMode = () => {
    dialogChangeInputMode.value = false;
    inputMode.value = pendingInputMode.value;
    pendingInputMode.value = null;
    clearTranscriptionData();
}

const handleRecordedFile = (file) => {
    selectedFile.value = file;
};

const buildPayload = () => {
    const { patient, template_id: template, type_id: type } = form.value;
    return {
        conversation: chatTranscription.value,
        patient,
        template,
        type,
        endConversationTime: endConversationTime.value,
        fileSize: fileSize.value
    };
};

const validateForm = () => {
    if (!form.value.template_id) {
        errorMessage.value = true;

        showError(t('notifications.titles.error'), "Por favor, verifique os campos do formulário.", 3000);
        return false;
    }
    return true;
};

const redirectTo = (id) => {
    router.push({
        name: 'transcriptsShow',
        params: { id: id },
        query: { type: 'new' }
    });
}

const isRecordMode = () => inputMode.value === 'record';
const hasSelectedFile = () => selectedFile.value != null;
const hasTranscriptions = () => transcriptions.value.length > 0;

async function loadTemplates() {
    loadingTemplates.value = true
    try {
        dropdownTemplates.value = await SelectOptionsService.getTemplates()
    } catch (error) {
        console.error(error)
    } finally {
        loadingTemplates.value = false
    }
}

async function loadTypes() {
    loadingTypes.value = true
    try {
        dropdownTypes.value = await SelectOptionsService.getTypes()
    } catch (error) {
        console.error(error)
    } finally {
        loadingTypes.value = false
    }
}

onMounted(() => {
    loadTemplates();
    loadTypes();
});
</script>

<style scoped>
.custom-uploader .p-fileupload-content {
  padding: 0 !important;
  background: none;
  box-shadow: none;
  border: none !important;
}
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color .2s;
}
.upload-text {
  text-align: center;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-size: 0.9rem;
}
::v-deep(.p-fileupload-header) {
    padding: 0 !important;
    margin: 0 !important;
    height: 0 !important;
    border: none !important;
}
::v-deep(.p-fileupload-content) {
    padding: 0 !important;
    border: none !important;
}
::v-deep(.p-fileupload-advanced) {
    border: none !important;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>