<!-- REMOVER TELA -->

<template>
    <section>
        <div class="mb-3 py-3">
            <h1 class="text-3xl font-bold">Nova transcrição</h1>
            <p class="my-1 text-lg">Grave uma consulta e obtenha a transcrição automaticamente</p>
        </div>
        <div class="flex gap-x-4">
            <div class="card w-1/2 flex flex-col">
                <div class="flex items-center gap-2">
                    <Mic />
                    <p class="font-semibold text-2xl mb-4">Gravação</p>
                </div>
                <p class="mt-1 text-slate-500 dark:text-slate-300">Controle a gravação da consulta</p>
                <div class="flex flex-col py-4 gap-y-3">
                    <div>
                        <label class="mb-1" for="name1">Nome do Paciente</label>
                        <InputText id="name1" type="text" class="w-full" placeholder="Digite o nome do paciente..." />
                    </div>
                    <div>
                        <label class=" mb-1" for="name2">Tipo de consulta</label>
                        <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                            placeholder="Selecione" class="w-full"></Select>
                    </div>
                    <Divider />
                    <div>
                        <div class="flex flex-column h-12rem">
                            <div
                                class="border-2 border-dashed surface-border p-2 py-6 gap-y-4 bg-neutral-100 dark:bg-neutral-800 border-round surface-ground w-full flex flex-col text-center font-medium rounded-lg">

                                <span class="font-robotomono text-3xl font-bold">{{ formatTime(timer) }}</span>

                                <div class="flex justify-center gap-x-2">
                                    <Button v-if="!recording"
                                        class="!w-20 !h-20 !bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !rounded-full"
                                        @click="startRecording">
                                        <Mic class="dark:!text-slate-200" />
                                    </Button>
                                    <div v-if="recording" class="flex gap-x-4">
                                        <Button v-if="!isPaused" @click="pauseRecording"
                                            class="!w-20 !h-20 !border-1 !bg-white !border-neutral-300 !text-slate-700 hover:!bg-slate-100 !rounded-full">
                                            <Pause />
                                        </Button>
                                        <Button v-else @click="resumeRecording"
                                            class="!w-20 !h-20 !border-1 !bg-white !border-neutral-300 !text-slate-700 hover:!bg-slate-100 !rounded-full">
                                            <Play />
                                        </Button>
                                        <Button @click="stopRecording" severity="danger"
                                            class="!w-20 !h-20 !rounded-full">
                                            <Square />
                                        </Button>
                                    </div>
                                </div>

                                <div v-if="recording" class="flex flex-col items-center mt-6">
                                    <div class="relative flex items-end justify-center w-full h-20 bg-white/5 dark:bg-black/20 rounded-xl px-4 py-2">
                                        <div class="flex items-end justify-center gap-1">
                                        <div
                                            v-for="(bar, i) in bars"
                                            :key="i"
                                            class="w-2 rounded-full bg-gradient-to-t from-blue-400 to-blue-600 transition-all duration-150 ease-out"
                                            :style="{ height: Math.min(Math.max(bar * 1.1, 4), 80) + 'px' }"
                                        ></div>
                                        </div>
                                    </div>
                                    <p class="text-lg mt-3 font-semibold"
                                        :class="isPaused ? 'text-yellow-500' : 'text-blue-500'">
                                        {{ isPaused ? 'Pausado' : 'Gravando...' }}
                                    </p>
                                </div>

                                <div v-if="audioUrl" class="mt-4">
                                    <p class="text-slate-600">▶️ Sua gravação:</p>
                                    <audio :src="audioUrl" controls class="w-full"></audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card w-1/2 flex flex-col">
                <div class="flex items-center gap-2">
                    <FileText />
                    <p class="font-semibold text-2xl mb-4">Transcrição</p>
                </div>
                <p class="mt-1 text-slate-500 dark:text-slate-300">Texto transcrito automaticamente pela IA</p>

                <div
                    class="p-2 my-6 h-full w-full rounded-lg border-[1px] border-surface dark:border-surface flex flex-col gap-y-2">
                    <p class="text-slate-400">A transcrição aparecerá aqui conforme você grava...</p>
                </div>
                <div class="flex justify-end">
                    <Button
                        class="!bg-gradient-to-br !from-blue-500 !to-blue-700 dark:!text-slate-200 !border-none">
                        <Save :size="18" />
                        Salvar transcrição
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Mic, Pause, Play, FileText, Save, Square } from 'lucide-vue-next';

const dropdownItem = ref(null);
const recording = ref(false);
const isPaused = ref(false);
const audioUrl = ref(null);
const timer = ref(0);
const bars = ref([5, 10, 8, 12, 7, 15, 9, 6, 9, 7, 1, 1]);
let interval = null;

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

let mediaRecorder;
let audioChunks = [];
let audioContext, analyser, dataArray, source, rafId;

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioUrl.value = URL.createObjectURL(audioBlob);
            console.log(audioUrl.value);
            clearInterval(interval);
            cancelAnimationFrame(rafId);
            if (audioContext) audioContext.close();
        };

        mediaRecorder.start();
        recording.value = true;
        isPaused.value = false;
        timer.value = 0;

        interval = setInterval(() => {
            timer.value++;
        }, 1000);

        audioContext = new AudioContext();
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 32;
        source.connect(analyser);

        dataArray = new Uint8Array(analyser.frequencyBinCount);

        updateBars();
    } catch (err) {
        console.error('Erro ao acessar microfone:', err);
    }
};

const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        isPaused.value = true;
        clearInterval(interval);
        cancelAnimationFrame(rafId);
    }
};

const resumeRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        isPaused.value = false;

        interval = setInterval(() => {
            timer.value++;
        }, 1000);

        updateBars();
    }
};

const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        recording.value = false;
        isPaused.value = false;
        clearInterval(interval);
        cancelAnimationFrame(rafId);
        if (audioContext) audioContext.close();
    }
};

const updateBars = () => {
    analyser.getByteFrequencyData(dataArray);

    const shuffled = [...dataArray].sort(() => Math.random() - 0.5);

    bars.value = bars.value.map((bar, i) => {
        const target = shuffled[i % shuffled.length];
        const noise = Math.random() * 2 - 1;
        const newHeight = Math.max(target / 2 + noise, 4);
        return bar + (newHeight - bar) * 0.03;
    });

    rafId = requestAnimationFrame(updateBars);
};

const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
};
</script>
