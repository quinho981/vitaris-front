<template>
    <section>
        <div class="flex items-center justify-between mb-3 py-3">
            <div>
                <h1 class="text-3xl font-bold">Dashboard</h1>
                <p class="my-1 text-lg">Bem-vindo de volta, <span class="font-semibold">{{ userStore.username }}</span></p>
            </div>
            <div>
                <router-link
                    :to="{ name: 'upload' }"
                    class="p-button p-component !bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !text-white !text-[14px] !font-semibold !p-3 flex items-center gap-2 hover:!from-blue-600 hover:!to-blue-800 duration-300"
                >
                    <Mic :size="18" />
                    Nova Transcrição
                </router-link>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Transcrições hoje</span>
                            <div v-if="!loadingSummary" class="text-surface-900 dark:text-surface-0 font-black text-3xl">{{ dataSummary.totalTranscripts }}</div>
                            <Skeleton v-else height="35px" width="3.2rem" class="rounded-xl" />
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <FileText :size="22" class="text-blue-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+3 vs ontem</span>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Tempo total (hoje)</span>
                            <div v-if="!loadingSummary" class="text-surface-900 dark:text-surface-0 font-black text-3xl">{{ convertSecondsToMinutes(dataSummary.totalTimeTranscripts) }}</div>
                            <Skeleton v-else height="35px" width="6.5rem" class="rounded-xl" />
                        </div>
                        <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <Clock :size="22" class="text-green-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+45m vs ontem</span>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Transcrições urgentes (hoje)</span>
                            <div v-if="!loadingSummary" class="text-surface-900 dark:text-surface-0 font-black text-3xl">{{ dataSummary.totalUrgentTranscripts }}</div>
                            <Skeleton v-else height="35px" width="3.2rem" class="rounded-xl" />
                        </div>
                        <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <OctagonAlert :size="22" class="text-red-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+45m vs ontem</span>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Média de duração (hoje)</span>
                            <div v-if="!loadingSummary" class="text-surface-900 dark:text-surface-0 font-black text-3xl">{{ convertSecondsToMinutes(dataSummary.averageTranscriptsTime) }}</div>
                            <Skeleton v-else height="35px" width="4.5rem" class="rounded-xl" />
                        </div>
                        <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <Timer :size="22" class="text-purple-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+1 vs ontem</span>
                </div>
            </div>
            
            <div class="card col-span-12">
                <div class="flex items-center justify-between">
                    <p class="font-semibold text-2xl">Transcrições recentes</p>
                    <router-link
                        :to="{ name: 'transcriptsHistory' }"
                        class="p-button p-button-secondary flex items-center justify-center gap-2"
                    >
                        Ver todas
                    </router-link>
                </div>
                <RecentTranscriptsItem 
                    :transcripts="recentTranscripts"
                    :loading="loadingTranscripts"
                />
            </div>

            <div class="col-span-12 lg:col-span-6">
                <div class="card">
                    <p class="font-semibold text-2xl mb-4">Transcrições na última semana</p>
                    <div class="relative h-80">
                        <Chart
                            type="line"
                            :data="lineData"
                            :options="lineOptions"
                            class="w-full h-full"
                        />

                        <div
                            v-if="loadingSummary"
                            class="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded-xl"
                        >
                            <ProgressSpinner style="width:60px;height:60px" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-12 lg:col-span-6">
                <div class="card">
                    <p class="font-semibold text-2xl mb-4">Transcrições por tipo de consulta na semana</p>
                    <div class="relative h-80">
                        <Chart
                            type="pie"
                            :data="pieData"
                            :options="pieOptions"
                            class="w-full h-full"
                        />

                        <div
                            v-if="loadingCharts"
                            class="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded-xl"
                        >
                            <ProgressSpinner style="width:60px;height:60px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useUserStore } from '@/stores/userStore'
import { DashboardService } from '@/service/DashboardService';
import { Mic, FileText, Clock, OctagonAlert, Timer } from 'lucide-vue-next';
import { useHelpers } from '@/utils/helper';

const { convertSecondsToMinutes } = useHelpers();

const userStore = useUserStore();
const { getPrimary, getSurface, isDarkTheme } = useLayout();

const loadingSummary = ref(false)
const loadingCharts = ref(false)
const loadingTranscripts = ref(false)
const weekData = ref([0, 0, 0, 0, 0, 0, 0])
const pieData = ref(null);
const pieOptions = ref(null);
const lineData = ref(null);
const lineOptions = ref(null);
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
}
const dataSummary = ref({
    'averageTranscriptsTime': 0,
    'totalTimeTranscripts': 0,
    'totalTranscripts': 0,
    'totalUrgentTranscripts': 0,
});
const recentTranscripts = ref([])

const getSummary = () => {
    loadingSummary.value = true

    DashboardService.summary()
        .then((response) => {
            dataSummary.value = response
        })
        .finally(() => {
            loadingSummary.value = false
        })
}

const getCharts = () => {
    loadingCharts.value = true

    DashboardService.charts()
        .then((response) => {
            const data = [0, 0, 0, 0, 0, 0, 0];

            handleBarChart(response, data)
            handlePieChart(response)
        })
        .finally(() => {
            loadingCharts.value = false
        })
}

const getLatestRecentTranscripts = () => {
    loadingTranscripts.value = true

    DashboardService.latestRecentTranscripts()
        .then((response) => {
            recentTranscripts.value = response
        })
        .finally(() => {
            loadingTranscripts.value = false
        })
}

const handleBarChart = (response, data) => {
    response.transcriptsByWeek.forEach(item => {
        const day = Number(item.day_of_week);
        data[day] = Number(item.total);
    });
    
    weekData.value = data;
}

const handlePieChart = (response) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = response.transcriptsByType;

    const colors = [
        '--p-indigo-500',
        '--p-purple-500',
        '--p-teal-500',
        '--p-orange-500',
        '--p-pink-500'
    ];

    const hoverColors = [
        '--p-indigo-400',
        '--p-purple-400',
        '--p-teal-400',
        '--p-orange-400',
        '--p-pink-400'
    ];

    pieData.value = {
        labels: data.map(item => item.type),
        datasets: [
            {
                data: data.map(item => Number(item.transcripts_count)),
                backgroundColor: data.map((_, i) =>
                    documentStyle.getPropertyValue(colors[i % colors.length])
                ),
                hoverBackgroundColor: data.map((_, i) =>
                    documentStyle.getPropertyValue(hoverColors[i % hoverColors.length])
                )
            }
        ]
    };
};

const setColorOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    pieOptions.value = {
        ...commonOptions,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    lineData.value = {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        datasets: [
            {
                label: 'Transcrições',
                data: weekData,
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                tension: 0.4
            },
        ]
    };

    lineOptions.value = {
        ...commonOptions,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
)

onMounted(() => {
    getSummary();
    getLatestRecentTranscripts();
    getCharts();
    setColorOptions();
})
</script>

<style scoped>
</style>