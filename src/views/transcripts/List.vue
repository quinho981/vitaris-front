<template>
    <div className="card mr-5">
        <div class="font-semibold text-xl mb-4">{{ $t("transcription.listPage.allTranscripts") }}</div>

        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="code" header="Transcrição" class="w-[90%]">
                <template #body="{ data }">
                    <p class="cursor-pointer">{{data.code}}</p>
                </template>
            </Column>

            <Column header="Ações" >
                <template #body="{ data }">
                    <Button icon="pi pi-user" severity="info" @click="editItem(data)"  class="mr-2"/>
                    <Button icon="pi pi-bell" severity="warn" @click="deleteItem(data)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
    {
        id: 1,
        code: 'Parte de transcrição vai aparecer assim mais ou menos...',
    },
    {
        id: 2,
        code: 'Parte de transcrição vai aparecer assim mais ou menos...',
    },
    {
        id: 3,
        code: 'Parte de transcrição vai aparecer assim mais ou menos...',
    },
    {
        id: 4,
        code: 'Parte de transcrição vai aparecer assim mais ou menos...',
    },
    {
        id: 5,
        code: 'Parte de transcrição vai aparecer assim mais ou menos...',
    },
]);

const editItem = (item) => {
    console.log("Editar", item);
};

const deleteItem = (item) => {
    console.log("Excluir", item);
};
</script>

<style scoped>
button {
    transition: all 0.3s ease;
}
button:hover {
    opacity: 0.8;
}
</style>
