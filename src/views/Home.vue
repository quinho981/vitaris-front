<template>
    <div>
        <div class="font-semibold text-xl">
            Nova consulta <i class="pi pi-pencil"></i>
        </div>
        <Fluid class="flex justify-center items-center min-h-screen">
            <div class="flex w-3/5">
                <div class="flex flex-col gap-4 p-3 w-full">
                    <ul>
                        <li 
                            class="inline-flex mb-3 bg-emerald-100 p-2 rounded-xl"
                            v-for="(item, index) in teste" :key="index"
                        >
                            <span>{{item}}</span>
                        </li>
                        <div 
                            v-if="loadingTranscript"
                            class="dot-container bg-emerald-100 p-2 rounded-xl"
                        >
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </ul>

                    <div class="font-semibold text-4xl text-center">Como posso ajudar hoje?</div>
                    
                    <div class="flex flex-wrap">
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
                        <div class="flex items-center pr-1 py-1">
                            <div class="content-microphone-test mr-1">
                                <div id="bars-container" style="display: flex; gap: 2px; align-items: center; ">
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
                        <div class="pt-2">
                            <Button 
                                v-if="!buttonRecognition"
                                icon="pi pi-microphone" 
                                label="Gravar consulta" 
                                rounded 
                                @click="recordConversation"
                            />
                            <Button
                                v-if="buttonRecognition"
                                icon="pi pi-times" 
                                label="Parar gravação" 
                                severity="danger"
                                rounded 
                                @click="stopConversation"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fluid>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const transcribedText = ref('');
const teste = ref([]);
const buttonRecognition = ref(false);
const loadingTranscript = ref(false);
let recognition;

const setupSpeechRecognition = () => {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'pt-BR';
    recognition.onerror = e => console.log('error: ', e)
    recognition.interimResults = true;
    // recognition.maxAlternatives = 1;


    recognition.onresult = (event) => {
        let transcript = '';
        console.log('event: ', event.results)
        for(let i = event.resultIndex; i < event.results.length; i++) {
            if(event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
                loadingTranscript.value = false
                teste.value.push(transcript);
            }
            // console.log(transcript)
            loadingTranscript.value = true
        }

        transcribedText.value = transcript;
        console.log("Transcribed text:", transcript);
    };

    recognition.onerror = (event) => {
        buttonRecognition.value = false
        loadingTranscript.value = false
        console.error("Speech recognition error detected:", event.error);
    };
};

const recordConversation = () => {
    if (recognition) {
        recognition.start();
        buttonRecognition.value = true
        loadingTranscript.value = true
        console.log("Recording started...");
    }
};

const stopConversation = () => {
    if (recognition) {
        recognition.stop();
        buttonRecognition.value = false
        loadingTranscript.value = false
        console.log("Recording stopped.");
    }
};

onMounted(() => {
    setupSpeechRecognition();

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
});

onBeforeUnmount(() => {
    if (recognition) {
        recognition.stop();
    }
});
</script>

<style>
.dot-container {
    display: inline-flex;
    /* justify-content: center; */
    align-items: center;
    gap: 3px;
}

.dot {
    margin-top: 4px;
    width: 6px;
    height: 6px;
    background-color: #333; /* Cor da reticência */
    border-radius: 50%;
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
