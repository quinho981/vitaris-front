<template>
    <section>
        <div class="mb-3 py-3">
            <h1 class="text-3xl font-bold">Upload de áudio</h1>
            <p class="my-1 text-lg ">Grave uma consulta e obtenha a transcrição automaticamente</p>
        </div>
        <div class="flex gap-x-4">
            <div class="card w-1/2 flex flex-col">
                <div class="flex items-center gap-2">
                    <Upload />
                    <p class="font-semibold text-2xl mb-4">Enviar arquivo</p>
                </div>
                <p class="mt-1 text-slate-500 dark:text-slate-300 mb-3">Formatos suportados: MP3, WAV, M4A, AAC, OGG, FLAC (máx. 100MB)</p>
                <div class="flex flex-col">
                    <FileUpload
                        ref="uploader"
                        name="demo[]"
                        :auto="false"
                        @select="onFileSelect"
                        :multiple="false"
                        accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
                        class="custom-uploader"
                        :showThumbnails="false"
                    >
                        <template #header><span class="hidden"></span></template>
                        <template #content="{ files }">
                            <div v-if="files.length > 0">
                                <div class="flex flex-wrap p-0 sm:p-5 gap-5 bg-neutral-100">
                                    <div v-for="(file) of files" :key="file.name + file.type + file.size" class="flex !justify-between items-center w-full">
                                        <div class="flex items-center gap-3">
                                            <FileVolume />
                                            <span class="font-semibold text-xl">{{ file.name }}</span>
                                            {{ formatSize(file.size) }}
                                            <Badge :value="file.type" severity="warning" />
                                        </div>
                                        <div>
                                            <Button icon="pi pi-times" @click="removeFile(file)" outlined severity="danger" class="ml-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div
                                class="upload-area p-fileupload-choose p-fileupload-droppable gap-y-1 hover:!border-blue-400 duration-200"
                            >
                                <Upload :size="38" class="text-slate-500 mb-1" />
                                <p class="upload-text !text-lg">
                                    Arraste e solte seu arquivo aqui<br />
                                    ou clique para selecionar
                                </p>
                                <span class="p-button p-button-outlined p-button-md p-fileupload-choose" @click="openFileDialog">
                                    Selecionar Arquivo
                                </span>
                            </div>
                        </template>
                    </FileUpload>
                    <div class="mt-3">
                        <label class="mb-1" for="name1">Nome do Paciente</label>
                        <InputText id="name1" v-model="patientName" type="text" class="w-full" placeholder="Digite o nome do paciente... (opcional)" />
                    </div>
                    <div class="mt-2">
                        <label class=" mb-1" for="name2">Tipo de consulta</label>
                        <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecione (opcional)" class="w-full"></Select>
                    </div>
                    <div class="flex justify-end mt-3">
                        <Button
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
            <div class="card w-1/2 flex flex-col">
                <div class="flex items-center gap-2">
                    <FileAudio2 />
                    <p class="font-semibold text-2xl mb-4">Transcrições</p>
                </div>
                <p class="mt-1 text-slate-500 dark:text-slate-300 mb-3">Texto transcrito automaticamente pela IA</p>
                <div class="p-2 h-full w-full rounded-lg border-[1px] border-surface dark:border-surface flex flex-col gap-y-2 min-h-[350px] max-h-[351px] overflow-y-auto">
                    <div v-if="transcriptions.length === 0 && !isTranscribing" class="flex items-center justify-center h-full">
                        <p class="text-slate-400 text-center">A transcrição aparecerá aqui após o envio do áudio...</p>
                    </div>
                    
                    <div v-if="isTranscribing" class="flex items-center justify-center p-4">
                        <Loader2 :size="24" class="animate-spin mr-2" />
                        <p class="text-slate-600">Transcrevendo áudio...</p>
                    </div>

                    <div v-for="(transcription, index) in transcriptions" :key="index" class="transcription-item">
                        <div class="flex items-center gap-2 mb-3">
                            <FileAudio2 :size="16" class="text-blue-500" />
                            <span class="font-semibold text-sm text-gray-700">{{ transcription.fileName }}</span>
                            <span class="text-xs text-gray-500">{{ transcription.timestamp }}</span>
                        </div>
                        
                        <!-- Múltiplos balões sem distinção de speaker -->
                        <div v-for="(utterance, uttIndex) in transcription.utterances" :key="uttIndex" class="mb-2">
                            <div class="rounded-lg p-2">
                                <div class="flex items-start mb-2">
                                    <!-- <div class="flex-shrink-0 w-8 h-8 rounded-full text-blue-500 flex items-end justify-center font-semibold text-xs mr-3">
                                        <BrainCog  :size="18" />
                                    </div> -->
                                    <div>
                                        <div class="flex items-center gap-2 ">
                                            <!-- <p class="font-semibold text-xs text-gray-700">Transcrição</p> -->
                                            <span class="text-xs text-gray-500">{{ utterance.start }}s</span>
                                        </div>
                                        <p class="text-gray-800 p-2 rounded-lg bg-surface-100">{{ utterance.text }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="transcriptions.length != 0 && !isTranscribing" class="flex justify-end mt-4">
                    <Button icon="pi pi-trash" label="Limpar" outlined severity="danger" class="mr-3" />
                    <Button
                        @click="transcribeAudio"
                        class="!bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !text-white !rounded-lg font-semibold hover:!from-blue-600 hover:!to-blue-800 duration-300"
                    >
                        <!-- <Loader2 v-if="isTranscribing" :size="17" class="animate-spin mr-2" /> -->
                        <FileChartColumn  :size="17" />
                        Finalizar e gerar insights
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { usePrimeVue } from 'primevue/config';
import { Upload, FileAudio2, FileVolume, SendHorizontal, Loader2, FileChartColumn } from 'lucide-vue-next';

const $primevue = usePrimeVue();

// Configuração do Deepgram
const DEEPGRAM_API_KEY = '7bfd2857b37455faf82a84bf1f0e7406afdb1372'; // Substitua pela sua API key do Deepgram

const uploader = ref(null)
const selectedFile = ref(null)
const patientName = ref('')
const dropdownItem = ref(null);
const isTranscribing = ref(false)
const transcriptions = ref([])

const dropdownItems = ref([
    { name: 'Consulta Geral', code: 'geral' },
    { name: 'Consulta Especializada', code: 'especializada' },
    { name: 'Retorno', code: 'retorno' }
]);

function openFileDialog() {
    uploader.value?.choose();
}

const onFileSelect = (event) => {
    selectedFile.value = event.files[0];
};

const removeFile = (file) => {
    if (selectedFile.value === file) {
        selectedFile.value = null;
    }
    uploader.value.clear();
};

const validateAudioFile = (file) => {
    // Verificar tamanho (máx 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB em bytes
    if (file.size > maxSize) {
        return { valid: false, error: 'Arquivo muito grande. Máximo permitido: 100MB' };
    }

    // Verificar tipo MIME
    const supportedTypes = [
        'audio/mpeg',      // MP3
        'audio/mp3',       // MP3 alternativo
        'audio/wav',       // WAV
        'audio/wave',      // WAV alternativo
        'audio/x-wav',     // WAV alternativo
        'audio/mp4',       // M4A
        'audio/m4a',       // M4A
        'audio/x-m4a',     // M4A alternativo
        'audio/aac',       // AAC
        'audio/ogg',       // OGG
        'audio/webm',      // WebM
        'audio/flac'       // FLAC
    ];

    if (!supportedTypes.includes(file.type)) {
        return { 
            valid: false, 
            error: `Formato não suportado: ${file.type}. Use MP3, WAV, M4A, AAC, OGG, WebM ou FLAC` 
        };
    }

    return { valid: true };
};

const transcribeAudio = async () => {
    if (!selectedFile.value) {
        alert('Por favor, selecione um arquivo de áudio primeiro.');
        return;
    }

    if (!DEEPGRAM_API_KEY || DEEPGRAM_API_KEY === 'SUA_API_KEY_AQUI') {
        alert('Por favor, configure sua API key do Deepgram no código.');
        return;
    }

    // Validar arquivo antes de enviar
    const validation = validateAudioFile(selectedFile.value);
    if (!validation.valid) {
        alert(validation.error);
        return;
    }

    isTranscribing.value = true;

    try {
        // Converter arquivo para ArrayBuffer
        const arrayBuffer = await selectedFile.value.arrayBuffer();
        
        // Detectar mimetype baseado na extensão se necessário
        let mimeType = selectedFile.value.type;
        if (!mimeType) {
            const fileName = selectedFile.value.name.toLowerCase();
            if (fileName.endsWith('.mp3')) mimeType = 'audio/mpeg';
            else if (fileName.endsWith('.wav')) mimeType = 'audio/wav';
            else if (fileName.endsWith('.m4a')) mimeType = 'audio/mp4';
            else if (fileName.endsWith('.aac')) mimeType = 'audio/aac';
            else if (fileName.endsWith('.ogg')) mimeType = 'audio/ogg';
            else if (fileName.endsWith('.flac')) mimeType = 'audio/flac';
        }

        console.log('Enviando arquivo:', {
            nome: selectedFile.value.name,
            tamanho: selectedFile.value.size,
            tipo: mimeType
        });

        // Configurações da API do Deepgram com parâmetros mais conservadores
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
        console.log('Resposta bruta:', responseText);

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}: ${response.statusText}`;
            try {
                const errorData = JSON.parse(responseText);
                if (errorData.err_msg) {
                    errorMessage = errorData.err_msg;
                }
            } catch (e) {
                // Se não conseguir parsear como JSON, usa a mensagem padrão
            }
            throw new Error(errorMessage);
        }

        const result = JSON.parse(responseText);
        console.log('Resultado da transcrição:', result);
        
        // Verificar se há resultados
        if (!result.results || !result.results.channels || result.results.channels.length === 0) {
            throw new Error('Nenhum resultado de transcrição foi retornado. Verifique se o arquivo contém áudio válido.');
        }

        // Processar resultado e criar estrutura de chat
        const processedTranscription = processDeepgramResult(result, selectedFile.value.name);
        
        if (processedTranscription.utterances.length === 0) {
            throw new Error('Não foi possível extrair texto do áudio. Verifique se o arquivo contém fala audível.');
        }

        // Adicionar à lista de transcrições
        transcriptions.value.unshift(processedTranscription);

        // Limpar arquivo selecionado
        selectedFile.value = null;
        uploader.value.clear();

        console.log('Transcrição concluída com sucesso!');

    } catch (error) {
        console.error('Erro detalhado:', error);
        let userMessage = 'Erro ao transcrever o áudio.';
        
        if (error.message.includes('corrupt or unsupported data')) {
            userMessage = 'Arquivo de áudio corrompido ou em formato não suportado. Tente converter para MP3 ou WAV.';
        } else if (error.message.includes('failed to process audio')) {
            userMessage = 'Falha ao processar o áudio. Verifique se o arquivo não está corrompido.';
        } else if (error.message.includes('401')) {
            userMessage = 'API Key inválida. Verifique suas credenciais do Deepgram.';
        } else if (error.message.includes('402')) {
            userMessage = 'Cota da API excedida. Verifique seu plano no Deepgram.';
        } else if (error.message) {
            userMessage = error.message;
        }
        
        alert(userMessage);
    } finally {
        isTranscribing.value = false;
    }
};

const processDeepgramResult = (result, fileName) => {
    const utterances = [];
    
    if (result.results?.utterances) {
        console.log('-----------')
        console.log('Usou UTTERANCES')
        console.log('-----------')
        // Se a diarização estiver disponível, usar utterances
        result.results.utterances.forEach((utterance) => {
            utterances.push({
                text: utterance.transcript,
                start: Math.round(utterance.start * 100) / 100,
                end: Math.round(utterance.end * 100) / 100
            });
        });
    } else if (result.results?.channels?.[0]?.alternatives?.[0]) {
        console.log('-----------')
        console.log('Usou CHANNELS')
        console.log('-----------')
        // Fallback: usar transcrição simples se diarização não estiver disponível
        const transcript = result.results.channels[0].alternatives[0].transcript;
        
        // Dividir em partes simulando diferentes utterances
        const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);
        sentences.forEach((sentence, index) => {
            utterances.push({
                text: sentence.trim() + '.',
                start: index * 10, // Simulação de timestamps
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
        patientName: patientName.value || 'Paciente',
        consultationType: dropdownItem.value?.name || 'Não especificado',
        utterances: utterances
    };
};

// TRANSFORMAR EM HELPER
const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes || ['Bytes', 'KB', 'MB', 'GB'];

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
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

.transcription-item {
  border-bottom: 1px solid #e5e7eb;
}

.transcription-item:last-child {
  border-bottom: none;
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

/* Animação para novos itens */
.transcription-item {
    animation: fadeIn 0.5s ease-in-out;
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