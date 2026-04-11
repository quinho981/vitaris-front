<template>
    <div class="flex flex-col gap-5">
        <div class="border rounded-lg p-4 flex justify-between items-center dark:border-neutral-700">
            <div>
                <p class="font-semibold text-lg">Plano atual</p>
                <p class="text-slate-500 dark:text-slate-400">VitalFy Pro</p>
            </div>

            <Tag value="Ativo" severity="success" />
        </div>

        <div class="flex gap-4">
            <Button label="Alterar plano" />
            <Button label="Cancelar assinatura" severity="danger" outlined class="dark:hover:!bg-red-950" />
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>