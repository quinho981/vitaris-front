<script setup>
import { ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { authStore } from '@/stores/authStore'
import { useRouter } from 'vue-router';
import { Stethoscope, PanelLeft  } from 'lucide-vue-next';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const auth = authStore();
const router = useRouter();
const overlayPanel = ref(null)
const loading = ref(false);

const toggleMenu = (event) => {
    overlayPanel.value.toggle(event)
}

const logout = async () => {
    loading.value = true;

    try {
        await auth.logout();
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        loading.value = false;
        router.push({ name: 'login' });
    }
}
</script>

<template>
    <div class="layout-topbar !border-b-[1px] dark:border-gray-700">
        <div class="layout-topbar-logo-container">
            <router-link to="/" class="layout-topbar-logo !gap-0">
                <div class="py-[0.6rem] bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mr-2 text-white dark:text-gray-600">
                    <Stethoscope :size="20" class="dark:text-slate-300" />
                </div>

                <span class="font-poppins text-slate-800 dark:text-slate-300">VITALFY</span>
            </router-link>
            <button class="layout-menu-button layout-topbar-action ml-[6.6rem]" @click="onMenuToggle">
                <PanelLeft :size="18" />
            </button>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <!-- <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div> -->
            </div>

            <!-- <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button> -->

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button> -->
                    <button type="button" class="layout-topbar-action" @click="toggleMenu">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>

                    <OverlayPanel ref="overlayPanel">
                        <div class="flex flex-col gap-2 min-w-[150px]">
                            <NuxtLink to="/usuario" class="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <i class="pi pi-user-edit mr-2"></i> Meu Perfil
                            </NuxtLink>

                            <Button 
                                @click="logout" 
                                :loading="loading" 
                                icon="pi pi-sign-out" 
                                :label='$t("button.leave")'
                                severity="danger" outlined
                            ></Button>
                        </div>
                    </OverlayPanel>
                </div>
            </div>
        </div>

        
    </div>
</template>
