<template>
    <div class="flex flex-col gap-5 max-w-2xl">
        <div class="flex items-center justify-between">
            <div>
                <p class="font-semibold">Gerar insights automaticamente</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">Ativar análise clínica por IA ao finalizar</p>
            </div>
            <InputSwitch v-model="form.autoInsights" />
        </div>

        <div class="flex items-center justify-between">
            <div>
                <p class="font-semibold">Modo escuro</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">Alternar tema da interface</p>
            </div>
            <InputSwitch v-model="form.darkMode" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const form = reactive({
    autoInsights: true,
    darkMode: localStorage.getItem('app_theme') === 'dark',
});

watch(() => form.darkMode, (value) => {
    const theme = value ? 'dark' : 'light'

    localStorage.setItem('app_theme', theme)

    document.documentElement.classList.toggle('app-dark');
});

</script>

<style scoped>

</style>