<template>
    <div>
        <div class="flex items-center justify-between mr-6 font-semibold text-xl">
            <div>
                Nova consulta <i class="pi pi-pencil"></i>
            </div>
            <div v-if="stepStatus('finished')">
                <Button label="Copiar texto" icon="pi pi-copy" class="p-button-link !m-0 !p-0" />
            </div>
        </div>
        <Fluid
            :class="{'items-center': stepStatus('not-started')}" 
            class="flex justify-center h-[calc(100dvh-13rem)] overflow-auto"
        >
            <div class="flex w-full md:w-3/5">
                <div class="flex flex-col gap-3 md:px-3 w-full ">
                    <ul>
                        <li 
                            class="flex mb-3 items-center"
                            v-for="(item, index) in chat" :key="index"
                        >
                            <Avatar label="V" class="mr-2" size="small" :style="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></Avatar> 
                            <span
                                ref="typingElements"
                                class="bg-slate-200 p-2 rounded-xl" 
                                v-html="item"
                            ></span>
                        </li>
                        <div 
                            v-if="loadingTranscript && stepStatus('in-progress')"
                            class="flex items-center"
                        >
                            <Avatar label="V" class="mr-2" size="small" :style="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></Avatar>
                            <div class="inline-flex items-center gap-[3px] bg-slate-200 p-2 rounded-xl">
                                <div class="dot mt-1 w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                                <div class="dot mt-1 w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                                <div class="dot mt-1 w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                            </div>
                        </div>
                    </ul>

                    <div
                        v-if="stepStatus('not-started')"  
                        class="font-semibold text-4xl text-center mb-2"
                    >
                        Como posso ajudar hoje?
                    </div>
                    
                    <div
                        v-if="stepStatus('not-started')"  
                        class="flex flex-wrap"
                    >
                        <label for="query-content">Contexto da consulta</label>
                        <Textarea
                            rows="1"
                            autoResize  
                            id="query-content" 
                            class="text-lg !max-h-44 border !rounded-3xl py-2"
                            v-model="transcribedText"
                        />
                        <span class="pt-1 flex items-center">
                            Enviar arquivo de áudio 
                            <i 
                                class="pi pi-info-circle pl-1" 
                                v-tooltip.top="'Permitido apenas arquivos .mp3'"
                            ></i> 
                        </span>
                    </div>

                    <div class="flex-column">
                        <div
                            v-if="stepStatus('not-started')" 
                            class="flex items-center pr-1 py-1"
                        >
                            <div class="content-microphone-test mr-1">
                                <div id="bars-container" class="flex gap-0.5 items-center">
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                    <div class="bar w-[4px] h-[15px] rounded-lg"></div>
                                </div>
                            </div>
                            <div class="label-microphone-test">
                                Testar microfone
                            </div>
                        </div>
                        <div class="pt-1">
                            <Button 
                                v-if="stepStatus('not-started')"
                                icon="pi pi-microphone" 
                                label="Gravar consulta" 
                                rounded 
                                @click="recordConversation"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fluid>
        <Fluid 
            v-if="stepStatus('in-progress') || stepStatus('paused')"
            class="flex justify-center items-center px-4"
        >
            <div class="flex flex-col md:w-3/5 mt-2">
                <div class="flex gap-2 mt-2">
                    <Button
                        v-if="stepStatus('in-progress') || stepStatus('paused')"
                        icon="pi pi-times-circle" 
                        label="Cancelar gravação" 
                        severity="danger"
                        rounded 
                        @click="cancelConversation"
                    />
                    <Button
                        v-if="stepStatus('in-progress')"
                        icon="pi pi-stop-circle" 
                        label="Pausar gravação" 
                        severity="warn"
                        rounded 
                        @click="stopConversation"
                    />
                    <Button
                        v-if="stepStatus('paused')"
                        icon="pi pi-play" 
                        label="Continuar gravação"
                        severity="info"
                        rounded 
                        @click="recordConversation"
                    />
                    <Button
                        v-if="stepStatus('in-progress') || stepStatus('paused')"
                        icon="pi pi-check-circle" 
                        label="Finalizar gravação"
                        :loading="loadingFinish"
                        rounded 
                        @click="finishConversation"
                    />
                </div>
                <p class="text-xs text-center mt-2">Vitaris pode cometer erros. Considere verificar informações importantes.</p>
            </div>
        </Fluid>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { AnamneseService } from '@/service/AnamneseService';

const transcribedText = ref('');
const chat = ref([]);
const buttonRecognition = ref(false);
const loadingTranscript = ref(false);
const loadingFinish = ref(false);
const status = ref('not-started')

let recognition;

const setupSpeechRecognition = () => {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'pt-BR';
    recognition.interimResults = true;

    let transcript = '';
    recognition.onresult = (event) => {
        for(let i = event.resultIndex; i < event.results.length; i++) {
            if(event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
                loadingTranscript.value = false
                chat.value.push(event.results[i][0].transcript);
            }
            loadingTranscript.value = true
        }
        transcribedText.value = transcript;
    };

    recognition.onerror = (event) => {
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
            recordConversation();
        }
        
        buttonRecognition.value = false
        loadingTranscript.value = false
    };

    recognition.onend = () => {
        if (buttonRecognition.value) {
            recognition.start();
        }
    };

};

const recordConversation = () => {
    if (recognition) {
        recognition.start();
        status.value = 'in-progress'
        buttonRecognition.value = true
        loadingTranscript.value = true
    }
};

const stopConversation = () => {
    if (recognition) {
        recognition.stop();
        status.value = 'paused'
        buttonRecognition.value = false
        loadingTranscript.value = false
    }
};

const cancelConversation = () => {
    if (recognition) {
        recognition.abort();
        status.value = 'not-started'
        transcribedText.value = ''
        chat.value = []
        buttonRecognition.value = false
        loadingTranscript.value = false
    }
};

const finishConversation = () => {
    if (recognition) {
        recognition.stop();

        loadingFinish.value = true
        AnamneseService.generator(transcribedText.value)
            .then((response) => {
                chat.value = []
                status.value = 'finished'
                loadingFinish.value = false
                chat.value.push(response);
            })
            .catch(e => {
                console.log(e)
                loadingFinish.value = false
            })
            
        buttonRecognition.value = false
        loadingTranscript.value = false
    }
};

const setupMicrophoneAnalyser = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.fftSize = 256;
                microphone.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);

                const bars = document.querySelectorAll('.bar');

                scriptProcessor.onaudioprocess = function () {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);

                    // Calcula o volume médio e aplica um fator de amplificação
                    const average = array.reduce((sum, value) => sum + value, 0) / array.length;
                    const amplifiedAverage = average * 3; // Ajuste esse fator para alterar a sensibilidade

                    // Limita o valor para não ultrapassar o máximo de 255
                    const normalizedVolume = Math.min(amplifiedAverage, 255);

                    // Define quantas barras devem ser "ativas" com base no volume
                    const activeBarsCount = Math.floor((normalizedVolume / 255) * bars.length);

                    // Atualiza a cor das barras da esquerda para a direita
                    bars.forEach((bar, index) => {
                        if (index < activeBarsCount) {
                            bar.style.background = 'green'; // Barra ativa
                        } else {
                            bar.style.background = 'lightgray'; // Barra inativa
                        }
                    });
                };
            })
            .catch(function (err) {
                console.error('Erro ao acessar o microfone:', err);
            });
    } else {
        alert('API getUserMedia não suportada neste navegador.');
    }
}

const stepStatus = (step) => {
    return step === status.value
}





// ADICIONAR O CÓDIGO ABAIXO EM UM HELPER
// =============================================
// =============================================
const typingElements = ref([])
const typeText = (el, text) => {
    // Limpa o conteúdo anterior
    el.textContent = ''
    
    let index = 0
    const type = () => {
        if (index < text.length) {
            // Adiciona um caractere por vez
            el.textContent += text.charAt(index)
            index++
            
            // Agenda o próximo caractere
            setTimeout(type, 10) // Velocidade de digitação (30ms entre caracteres)
        }
    }
    
    // Inicia a digitação
    type()
}

// Observa as mudanças no chat
watch(() => chat.value, async (newChat) => {
    await nextTick() // Espera o DOM atualizar
    
    if (newChat.length > 0) {
        const lastIndex = newChat.length - 1
        const lastTextEl = typingElements.value[lastIndex]
        
        if (lastTextEl) {
            // Se o texto contém HTML, usa innerHTML
            if (newChat[lastIndex].includes('<')) {
                typeTextHTML(lastTextEl, newChat[lastIndex])
            } else {
                typeText(lastTextEl, newChat[lastIndex])
            }
        }
    }
}, { deep: true })
// =============================================
// =============================================
// =============================================



onMounted(() => {
    setupMicrophoneAnalyser();    
    setupSpeechRecognition();
});

onBeforeUnmount(() => {
    if (recognition) {
        recognition.stop();
    }
});
</script>

<style scoped>
.dot {
    animation: bounce 0.6s infinite alternate;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-5px); /* Ajuste da altura do "pulo" */
    }
}
</style>
