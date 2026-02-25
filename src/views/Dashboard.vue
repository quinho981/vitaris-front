<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref, watch } from 'vue';
import { Mic, FileText, Clock, Eye, Download, OctagonAlert, Timer } from 'lucide-vue-next';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                type: 'bar',
                label: 'Subscriptions',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                data: [4000, 10000, 15000, 4000],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Advertising',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                data: [2100, 8400, 2400, 7500],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Affiliate',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                data: [4100, 5200, 3400, 7400],
                borderRadius: {
                    topLeft: 8,
                    topRight: 8
                },
                borderSkipped: true,
                barThickness: 32
            }
        ]
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});



const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,       // permite ao chart respeitar o tamanho do container
};

const pieData = ref(null);
const pieOptions = ref(null);
const lineData = ref(null);
const lineOptions = ref(null);

onMounted(() => {
    setColorOptions();
});

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    pieData.value = {
        labels: ['Retorno', 'Urgência', 'Consulta inicial'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400')]
            }
        ]
    };

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
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                tension: 0.4
            },
            // {
            //     label: 'Second Dataset',
            //     data: [28, 48, 40, 19, 86, 27, 90],
            //     fill: false,
            //     backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
            //     borderColor: documentStyle.getPropertyValue('--p-primary-200'),
            //     tension: 0.4
            // }
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
);
</script>

<template>
    <section>
        <div class="flex items-center justify-between mb-3 py-3">
            <div>
                <h1 class="text-3xl font-bold">Dashboard</h1>
                <p class="my-1 text-lg">Bem-vindo de volta, Dr. Silva</p>
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
                            <div class="text-surface-900 dark:text-surface-0 font-black text-3xl">15</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <!-- <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i> -->
                            <FileText :size="22" class="text-blue-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+3 vs ontem</span>
                    <!-- <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Tempo total</span>
                            <div class="text-surface-900 dark:text-surface-0 font-black text-3xl">2h 15m</div>
                        </div>
                        <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <!-- <i class="pi pi-shopping-cart text-green-500 !text-xl"></i> -->
                            <Clock :size="22" class="text-green-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+45m vs ontem</span>
                    <!-- <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Transcrições urgentes</span>
                            <div class="text-surface-900 dark:text-surface-0 font-black text-3xl">2h 15m</div>
                        </div>
                        <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <!-- <i class="pi pi-shopping-cart text-red-500 !text-xl"></i> -->
                            <OctagonAlert :size="22" class="text-red-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+45m vs ontem</span>
                    <!-- <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 xl:col-span-3 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div class="card mb-0">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="block font-semibold mb-4">Média de duração</span>
                            <div class="text-surface-900 dark:text-surface-0 font-black text-3xl">3min</div>
                        </div>
                        <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full" style="width: 3rem; height: 3rem">
                            <!-- <i class="pi pi-shopping-cart text-purple-500 !text-xl"></i> -->
                            <Timer :size="22" class="text-purple-500" />
                        </div>
                    </div>
                    <span class="text-primary font-medium">+1 vs ontem</span>
                    <!-- <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            
            
            <div class="card col-span-12">
                <div class="flex items-center justify-between">
                    <p class="font-semibold text-2xl">Transcrições recentes</p>
                    <router-link
                        :to="{ name: 'transcriptsList' }"
                        class="p-button p-button-secondary flex items-center justify-center gap-2"
                    >
                        Ver todas
                    </router-link>
                </div>
                <div class="border-[1px] border-surface p-3 rounded-lg mt-4 hover:border-blue-400 duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-3">
                            <div class="p-3 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700">
                                <FileText class="text-white dark:text-surface-200" />
                            </div>
                            <div class="flex flex-col">
                                <h4 class="text-lg font-bold">Maria Santos</h4>
                                <p>Consulta Geral • 18m</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <p>
                                <Tag severity="secondary" value="Oftalmologia" rounded></Tag>
                            </p>
                            <Button label="Secondary" severity="secondary" text>
                                <Eye :size="22" />
                            </Button>
                            <Button label="Secondary" severity="secondary" text>
                                <Download :size="22" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="border-[1px] border-surface p-3 rounded-lg mt-4 hover:border-blue-300 duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-3">
                            <div class="p-3 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700">
                                <FileText class="text-white dark:text-surface-200" />
                            </div>
                            <div class="flex flex-col">
                                <h4 class="text-lg font-bold">Maria Santos</h4>
                                <p>Consulta Geral • 18m</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <p>
                                <Tag severity="secondary" value="Oftalmologia" rounded></Tag>
                            </p>
                            <Button label="Secondary" severity="secondary" text>
                                <Eye :size="22" />
                            </Button>
                            <Button label="Secondary" severity="secondary" text>
                                <Download :size="22" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="border-[1px] border-surface p-3 rounded-lg mt-4 hover:border-blue-300 duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-3">
                            <div class="p-3 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700">
                                <FileText class="text-white dark:text-surface-200" />
                            </div>
                            <div class="flex flex-col">
                                <h4 class="text-lg font-bold">Maria Santos</h4>
                                <p>Consulta Geral • 18m</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <p>
                                <Tag severity="secondary" value="Oftalmologia" rounded></Tag>
                            </p>
                            <Button label="Secondary" severity="secondary" text>
                                <Eye :size="22" />
                            </Button>
                            <Button label="Secondary" severity="secondary" text>
                                <Download :size="22" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="border-[1px] border-surface p-3 rounded-lg mt-4 hover:border-blue-300 duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-3">
                            <div class="p-3 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700">
                                <FileText class="text-white dark:text-surface-200" />
                            </div>
                            <div class="flex flex-col">
                                <h4 class="text-lg font-bold">Maria Santos</h4>
                                <p>Consulta Geral • 18m</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <p>
                                <Tag severity="secondary" value="Oftalmologia" rounded></Tag>
                            </p>
                            <Button label="Secondary" severity="secondary" text>
                                <Eye :size="22" />
                            </Button>
                            <Button label="Secondary" severity="secondary" text>
                                <Download :size="22" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="border-[1px] border-surface p-3 rounded-lg mt-4 hover:border-blue-300 duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-3">
                            <div class="p-3 rounded-full !bg-gradient-to-br !from-blue-500 !to-blue-700">
                                <FileText class="text-white dark:text-surface-200" />
                            </div>
                            <div class="flex flex-col">
                                <h4 class="text-lg font-bold">Maria Santos</h4>
                                <p>Consulta Geral • 18m</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <p>
                                <Tag severity="secondary" value="Oftalmologia" rounded></Tag>
                            </p>
                            <Button label="Secondary" severity="secondary" text>
                                <Eye :size="22" />
                            </Button>
                            <Button label="Secondary" severity="secondary" text>
                                <Download :size="22" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-12 lg:col-span-6">
                <div class="card">
                    <p class="font-semibold text-2xl mb-4">Transcrições na última semana</p>
                    <Chart type="line" :data="lineData" :options="lineOptions" class="w-full !h-80"></Chart>
                </div>
            </div>

            <div class="col-span-12 lg:col-span-6">
                <div class="card">
                    <p class="font-semibold text-2xl mb-4">Transcrições por tipo de consulta</p>
                    <Chart type="pie" :data="pieData" :options="pieOptions" class="w-full !h-80"></Chart>
                </div>
            </div>

            <!-- <div class="col-span-12 xl:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Recent Sales</div>
                    <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                        <Column style="width: 15%" header="Image">
                            <template #body="slotProps">
                                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" width="50" class="shadow" />
                            </template>
                        </Column>
                        <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
                        <Column field="price" header="Price" :sortable="true" style="width: 35%">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column style="width: 15%" header="View">
                            <template #body>
                                <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="card">
                    <div class="flex justify-between items-center mb-6">
                        <div class="font-semibold text-xl">Best Selling Products</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                            <Menu ref="menu2" :popup="true" :model="items" class="!min-w-40"></Menu>
                        </div>
                    </div>
                    <ul class="list-none p-0 m-0">
                        <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                                <div class="mt-1 text-muted-color">Clothing</div>
                            </div>
                            <div class="mt-2 md:mt-0 flex items-center">
                                <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                                    <div class="bg-orange-500 h-full" style="width: 50%"></div>
                                </div>
                                <span class="text-orange-500 ml-4 font-medium">%50</span>
                            </div>
                        </li>
                        <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
                                <div class="mt-1 text-muted-color">Accessories</div>
                            </div>
                            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                                <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                                    <div class="bg-cyan-500 h-full" style="width: 16%"></div>
                                </div>
                                <span class="text-cyan-500 ml-4 font-medium">%16</span>
                            </div>
                        </li>
                        <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
                                <div class="mt-1 text-muted-color">Accessories</div>
                            </div>
                            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                                <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                                    <div class="bg-pink-500 h-full" style="width: 67%"></div>
                                </div>
                                <span class="text-pink-500 ml-4 font-medium">%67</span>
                            </div>
                        </li>
                        <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
                                <div class="mt-1 text-muted-color">Office</div>
                            </div>
                            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                                <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                                    <div class="bg-green-500 h-full" style="width: 35%"></div>
                                </div>
                                <span class="text-primary ml-4 font-medium">%35</span>
                            </div>
                        </li>
                        <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
                                <div class="mt-1 text-muted-color">Accessories</div>
                            </div>
                            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                                <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                                    <div class="bg-purple-500 h-full" style="width: 75%"></div>
                                </div>
                                <span class="text-purple-500 ml-4 font-medium">%75</span>
                            </div>
                        </li>
                        <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
                                <div class="mt-1 text-muted-color">Clothing</div>
                            </div>
                            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                                <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                                    <div class="bg-teal-500 h-full" style="width: 40%"></div>
                                </div>
                                <span class="text-teal-500 ml-4 font-medium">%40</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-span-12 xl:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Revenue Stream</div>
                    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
                </div>
                <div class="card">
                    <div class="flex items-center justify-between mb-6">
                        <div class="font-semibold text-xl">Notifications</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
                            <Menu ref="menu1" :popup="true" :model="items" class="!min-w-40"></Menu>
                        </div>
                    </div>

                    <span class="block text-muted-color font-medium mb-4">TODAY</span>
                    <ul class="p-0 mx-0 mt-0 mb-6 list-none">
                        <li class="flex items-center py-2 border-b border-surface">
                            <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                                <i class="pi pi-dollar !text-xl text-blue-500"></i>
                            </div>
                            <span class="text-surface-900 dark:text-surface-0 leading-normal"
                                >Richard Jones
                                <span class="text-surface-700 dark:text-surface-100">has purchased a blue t-shirt for <span class="text-primary font-bold">$79.00</span></span>
                            </span>
                        </li>
                        <li class="flex items-center py-2">
                            <div class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0">
                                <i class="pi pi-download !text-xl text-orange-500"></i>
                            </div>
                            <span class="text-surface-700 dark:text-surface-100 leading-normal">Your request for withdrawal of <span class="text-primary font-bold">$2500.00</span> has been initiated.</span>
                        </li>
                    </ul>

                    <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
                    <ul class="p-0 m-0 list-none mb-6">
                        <li class="flex items-center py-2 border-b border-surface">
                            <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                                <i class="pi pi-dollar !text-xl text-blue-500"></i>
                            </div>
                            <span class="text-surface-900 dark:text-surface-0 leading-normal"
                                >Keyser Wick
                                <span class="text-surface-700 dark:text-surface-100">has purchased a black jacket for <span class="text-primary font-bold">$59.00</span></span>
                            </span>
                        </li>
                        <li class="flex items-center py-2 border-b border-surface">
                            <div class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0">
                                <i class="pi pi-question !text-xl text-pink-500"></i>
                            </div>
                            <span class="text-surface-900 dark:text-surface-0 leading-normal"
                                >Jane Davis
                                <span class="text-surface-700 dark:text-surface-100">has posted a new questions about your product.</span>
                            </span>
                        </li>
                    </ul>
                    <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
                    <ul class="p-0 m-0 list-none">
                        <li class="flex items-center py-2 border-b border-surface">
                            <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                                <i class="pi pi-arrow-up !text-xl text-green-500"></i>
                            </div>
                            <span class="text-surface-900 dark:text-surface-0 leading-normal">Your revenue has increased by <span class="text-primary font-bold">%25</span>.</span>
                        </li>
                        <li class="flex items-center py-2 border-b border-surface">
                            <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0">
                                <i class="pi pi-heart !text-xl text-purple-500"></i>
                            </div>
                            <span class="text-surface-900 dark:text-surface-0 leading-normal"><span class="text-primary font-bold">12</span> users have added your products to their wishlist.</span>
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>
    </section>
</template>
