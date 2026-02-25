<template>
    <div class="flex flex-column h-12rem">
        <div class="border-2 border-dashed surface-border p-2 py-8 gap-y-4 dark:bg-neutral-800 border-round border-surface-300 surface-ground w-full flex flex-col text-center font-medium rounded-lg hover:border-blue-400 duration-200">
            <span class="font-robotomono text-3xl font-bold">{{ formatTime(timer) }}</span>

            <div class="flex justify-center gap-x-2">
                <Button v-if="!recording" class="!w-20 !h-20 !bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !rounded-full" @click="startRecording" v-tooltip.top="'Iniciar gravação'">
                    <Mic class="dark:!text-slate-200" />
                </Button>
                <div v-if="recording" class="flex gap-x-4">
                    <Button v-if="!isPaused" @click="pauseRecording" class="!w-20 !h-20 !border-1 !bg-white !border-neutral-300 !text-slate-700 hover:!bg-slate-100 !rounded-full" v-tooltip.top="'Pausar gravação'">
                        <Pause />
                    </Button>
                    <Button v-else @click="resumeRecording" class="!w-20 !h-20 !border-1 !bg-white !border-neutral-300 !text-slate-700 hover:!bg-slate-100 !rounded-full" v-tooltip.top="'Retomar gravação'">
                        <Play />
                    </Button>
                    <Button @click="stopRecording" severity="danger" class="!w-20 !h-20 !rounded-full" v-tooltip.top="'Concluir gravação'">
                        <Square />
                    </Button>
                </div>
            </div>

            <div v-if="recording" class="flex flex-col items-center mt-2">
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
                <p class="text-slate-600 mb-2">▶️ Sua gravação:</p>
                <audio :src="audioUrl" controls class="w-full"></audio>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mic, Pause, Play, Square } from 'lucide-vue-next';
import { useHelpers } from '@/utils/helper';

const emit = defineEmits(['recorded', 'recording-started'])
const { formatTime } = useHelpers();

const recording = ref(false);
const isPaused = ref(false);
const audioUrl = ref(null);
const timer = ref(0);
const bars = ref([5, 10, 8, 12, 7, 15, 9, 6, 9, 7, 1, 1]);
let interval = null;

let mediaRecorder;
let audioChunks = [];
let audioContext, analyser, dataArray, source, rafId;

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        let file = null;
        initConfigAudio(file);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

            file = new File(
                [audioBlob],
                `record-${Date.now()}.webm`,
                { type: 'audio/webm' }
            );

            emit('recorded', file);
            audioUrl.value = URL.createObjectURL(audioBlob);
            cleanupRecordingProcesses(interval, rafId);
            if (audioContext) audioContext.close();
        };

        mediaRecorder.start();
        recording.value = true;
        isPaused.value = false;
        timer.value = 0;
        emit('recording-started')

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
        cleanupRecordingProcesses(interval, rafId);
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
        cleanupRecordingProcesses(interval, rafId);
        if (audioContext) audioContext.close();
    }
};

const cleanupRecordingProcesses = (interval, rafId) => {
    clearInterval(interval);
    cancelAnimationFrame(rafId);
}

const initConfigAudio = (file) => {
    audioChunks = [];
    emit('recorded', file);
    audioUrl.value = null;
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
</script>

<style scoped>
</style>