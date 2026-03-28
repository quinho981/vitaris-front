<template>
    <div class="flex flex-col gap-5">
        <div class="border rounded-lg p-4 flex justify-between items-center">
            <div>
                <p class="font-semibold text-lg">Plano atual</p>
                <p class="text-slate-500">VitalFy Pro</p>
            </div>

            <Tag value="Ativo" severity="success" />
        </div>

        <div class="flex gap-4">
            <Button label="Alterar plano" />
            <Button label="Cancelar assinatura" severity="danger" outlined />
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>