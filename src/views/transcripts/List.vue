<template>
    <div className="card mr-5">
        <div class="font-semibold text-xl mb-4">{{ $t("transcription.listPage.allTranscripts") }}</div>

        <DataTable 
            :value="transcripts" 
            tableStyle="min-width: 50rem" 
            paginator 
            :rows="7" 
            :rowsPerPageOptions="[7, 10, 20, 50]"
            :loading="loading"
        >
            <Column field="code" header="Título" class="w-[88%]">
                <template #body="{ data }">
                    <p class="cursor-pointer">{{data.title}}</p>
                </template>
            </Column>

            <Column header="Ações" >
                <template #body="{ data }">
                    <Button 
                        icon="pi pi-trash" 
                        severity="secondary" 
                        @click="renameItem(data)" 
                        class="mr-3 mb-2 xl:mb-0" 
                        v-tooltip.top="$t('button.exclude')"
                    />
                    <Button 
                        icon="pi pi-pencil" 
                        severity="primary" 
                        @click="deleteItem(data)" 
                        v-tooltip.top="$t('button.rename')"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TranscriptsService } from '@/service/TranscriptsService';

const transcripts = ref([]);
const loading = ref(false);

const index = () => {
    loading.value = true;

    TranscriptsService.index()
        .then((response) => {
            transcripts.value = response;
        }).catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        }).finally(() => {
            loading.value = false;
        });
}

const renameItem = (item) => {
    console.log("Editar", item.id);
};

const deleteItem = (item) => {
    console.log("Excluir", item);
};

onMounted(() => {
    index();
});
</script>

<style scoped>
</style>
