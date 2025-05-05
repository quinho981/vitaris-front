<script setup>
import { ref, computed, onMounted } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import Signature from '@/components/Modal/Signature.vue';
import { useUserStore } from '@/stores/userStore'
import { TranscriptsService } from '@/service/TranscriptsService';

const userStore = useUserStore();

const FREE_PLAN = 'free';
const modalHelpAndSupport = ref(false);
const modalSignatureActive = ref(false);

const model = ref([
    // {
    //     label: 'Home',
    //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    // },
    {
        label: 'Hoje',
        items: [{ label: 'Anamnese médica para...', icon: 'pi pi-fw pi-home', to: '/home' }]
    },
    {
        label: 'Ontem',
        items: [
            { label: 'Paciente relata dores no...', icon: 'pi pi-fw pi-home', to: '/b' },
            { label: 'Consulta dor de cabeça', icon: 'pi pi-fw pi-home', to: '/a' }
        ]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            }
        ]
    }
]);

const index = async () => {
    try {
        const response = await TranscriptsService.indexPerDate();
        model.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

const planColor = computed(() => {
    return userStore.plan === FREE_PLAN ? 'bg-blue-500' : 'bg-yellow-500';
});

const planColorHexdecimal = computed(() => {
    return userStore.plan === FREE_PLAN ? '#3b82f6' : '#eab308';
});

const redirectTo = (to) => {
    window.open(to, "_blank");
};

const closeSignatureModal = () => {
    modalSignatureActive.value = false;
};

const truncate = (text, maxLength) => {
    if (!text) return '';
    return (text.length >= maxLength) ? text.slice(0, maxLength) + '...' : text;
}

const truncatedUsername = computed(() => truncate(userStore.username, 29));
const truncatedEmail = computed(() => truncate(userStore.userEmail, 35));

onMounted(() => {
    index();
});
</script>

<template>
    <div class="layout-sidebar">
        <div class="px-[1rem]">
            <Button 
                class="w-full my-2" 
                :label='$t("button.newTranscription")' 
                icon="pi pi-fw pi-plus" 
                rounded
                as="router-link"
                to="/home"
            />
        </div>
        <div class="layout-menu">
            <template v-for="(item, i) in model" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
            <div v-if="!model.length" class="flex flex-col items-center justify-center px-8 h-full">
                <img 
                    class="w-32 mb-4"
                    src="/demo/images/data-storage.svg"
                    alt="No transcription finded"
                />
                <p>Sem transcrições cadastradas até o momento...</p>
            </div>
        </div>
        <div class="layout-sidebar-footer border-t dark:border-gray-700">
            <div class="flex flex-col">
                <router-link to="/transcripts/list" class="flex items-center py-2 my-1 mt-2 hover:bg-[#f1f5f9] dark:hover:bg-[#27272a] rounded-3xl transition-all duration-300">
                    <i class="pi pi-fw pi-file-edit !text-sm mr-1 ml-2"></i>
                    <p>{{ $t("sidebar.allTranscripts") }}</p>
                </router-link>
                <a 
                    href="#" class="flex items-center py-2 my-1 hover:bg-[#f1f5f9] dark:hover:bg-[#27272a] rounded-2xl transition-all duration-300" 
                    @click.prevent="modalHelpAndSupport = !modalHelpAndSupport"
                >
                    <i class="pi pi-fw pi-phone !text-sm mr-1 ml-2"></i>
                    <p>{{ $t("sidebar.helpAndSupport") }}</p>
                </a>
                <div 
                    class="bg-gradient-to-r from-teal-500 to-green-400 rounded-[5px] p-[0.150rem] my-1"
                    @click="modalSignatureActive = !modalSignatureActive"
                >
                    <div class="flex gap-x-2 justify-center items-center rounded-[5px] bg-white dark:bg-[#18181b] p-1 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/50 div-icon-transition">
                        <div class="mr-2">
                            <i class="gradient-text pi pi-fw pi-bolt !text-xl icon-transition"></i>
                        </div>
                        <div class="text-sm">
                            <ul>
                                <li class="gradient-text font-bold">{{ $t("button.signature.unlockProPlan") }}</li>
                                <li>{{ $t("button.signature.onlyRemaining") }} <b>3</b> {{ $t("button.signature.transcriptions") }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex items-center pt-3 pb-3 relative">
                    <div class="relative flex flex-col items-center">
                        <Avatar 
                            :label="userStore.username.charAt(0)"
                            :class="{'mr-[7px]': userStore.plan !== 'free'}"
                            class="mr-3 flex-shrink-0 uppercase" 
                            size="small" 
                            :style="{ 'background-color': '#14b8a6', color: '#ffffff', border: `3px solid ${planColorHexdecimal}`, height: '2.4rem', width: '2.4rem' }" 
                            shape="circle">
                        </Avatar> 
                        <span 
                            class="absolute top-[26px] right-[10px] text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                            :class="planColor"
                        >
                            {{ userStore.plan }}
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <span class="flex justify-start text-base font-bold">
                            {{ truncatedUsername }}
                        </span>
                        <span class="flex justify-start text-sm font-medium text-gray-500 dark:text-gray-300">
                            {{ truncatedEmail }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!--- TODO: Transformar em componente -->
        <Dialog 
            :header='$t("sidebar.buttons.helpAndSupport")' 
            :visible="modalHelpAndSupport" 
            :breakpoints="{ '960px': '75vw' }" 
            :style="{ width: '27vw' }" 
            modal
            @update:visible="modalHelpAndSupport = $event"
            :dismissable-mask="true"
            :pt="{
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <div class="flex flex-col gap-y-2">
                <Button 
                    class="w-full"
                    :label='$t("sidebar.buttons.feedback")' 
                    icon="pi pi-fw pi-comments " 
                    rounded
                    severity="secondary"
                    @click='redirectTo("https://wa.me/5571999999999?text=Gostaria%20de%20passar%20um%20feedback")'
                />
                <Button 
                    class="w-full"
                    :label='$t("sidebar.buttons.talkToSupport")'
                    icon="pi pi-fw pi-phone " 
                    rounded
                    severity="secondary"
                    @click='redirectTo("https://wa.me/5571999999999?text=Quero%20de%20solicitar%20suporte")'
                />
            </div>
            <div class="flex flex-col sm:flex-row lg:flex-col xl:flex-row xl:justify-between justify-between my-1 font-semibold">
                <a 
                    href="https://wa.me/5571999999999" 
                    target="_blank"
                    class="flex justify-center sm:justify-start lg:justify-center xl:justify-start"    
                >
                    <Button label="+55 (71) 9 9999-9999" class="p-button-link" />
                </a>
                <a 
                    href="mailto:suportevital@vitalfy.com.br"
                    target="_blank"
                    class="flex justify-center sm:justify-start lg:justify-center xl:justify-start"
                >
                    <Button label="suportevital@vitalfy.com.br" class="p-button-link" />
                </a>
            </div>
        </Dialog>

        <Signature 
            :active="modalSignatureActive"
            @close="closeSignatureModal" 
        />
    </div>
</template>

<style lang="scss" scoped>
.gradient-text {
    background: linear-gradient(to right, #14b8a6, rgb(29, 242, 150));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.icon-transition {
  transition: all 0.3s ease;
}
.div-icon-transition:hover .icon-transition {
  animation: pulse-and-rotate 1s infinite alternate;
  transform-origin: center;
}
@keyframes pulse-and-rotate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.5) rotate(10deg);
  }
  100% {
    transform: scale(1.3) rotate(-10deg);
  }
}
</style>