<script setup>
import { ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { authStore } from '@/stores/authStore'

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const auth = authStore();

const op = ref(null)

const toggleMenu = (event) => {
  op.value.toggle(event)
}
</script>

<template>
    <div class="layout-topbar !border-b-2 dark:border-gray-700">
        <div class="layout-topbar-logo-container">
            <router-link to="/" class="layout-topbar-logo !gap-0">
                <img src="/logo-vitalfy.png" alt="VITALFY" class="w-14 h-14" />

                <span >VITALFY</span>
            </router-link>
            <button class="layout-menu-button layout-topbar-action ml-[6.6rem]" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
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

                    <OverlayPanel ref="op">
                        <div class="flex flex-col gap-2 min-w-[150px]">
                            <NuxtLink to="/usuario" class="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <i class="pi pi-user-edit mr-2"></i> Meu Perfil
                            </NuxtLink>

                            <button @click="auth.logout()" class="px-3 py-2 hover:bg-gray-100 text-left w-full rounded cursor-pointer">
                                <i class="pi pi-sign-out mr-2"></i> Sair
                            </button>
                        </div>
                    </OverlayPanel>
                </div>
            </div>
        </div>

        
    </div>
</template>
