<template>
    <div className="card mr-5">
        <div class="font-semibold text-xl mb-4">{{ $t("transcription.listPage.allTranscripts") }}</div>

        <DataTable 
            :value="transcripts" 
            tableStyle="min-width: 50rem" 
            :loading="loading"
            scrollable scrollHeight="480px"
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
                        @click="deleteConfirmation(data)"
                        class="mr-3 mb-2 xl:mb-0" 
                        v-tooltip.top="$t('button.exclude')"
                    />
                    <Button 
                        icon="pi pi-pencil" 
                        severity="primary" 
                        @click="renameItem(data)" 
                        v-tooltip.top="$t('button.rename')"
                    />
                </template>
            </Column>
            <template #empty>{{ $t("transcription.noTranscriptsFound") }}...</template>
        </DataTable>
        <Paginator 
            class="mt-5"
            :rows="10" 
            :totalRecords="total" 
            @page="onPage"
        ></Paginator>

        <DeleteConfirmation 
            :active="dialogConfirmation"
            :item="item"
            :loading="dialogLoading"
            @close="dialogConfirmation = false" 
            @confirm="deleteItem"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TranscriptsService } from '@/service/TranscriptsService';

const transcripts = ref([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const item = ref({});
const dialogConfirmation = ref(false);
const dialogLoading = ref(false);

const index = async () => {
    loading.value = true;

    try {
        const response = await TranscriptsService.index(page.value);

        transcripts.value = response.transcripts;
        total.value = response.total;
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);   
    } finally {
        loading.value = false;
    }
}

const onPage = (event) => {
    page.value = event.page + 1;

    index();
};

const renameItem = (item) => {
    console.log("Editar", item.id);
};

const deleteItem = async (item) => {
    dialogLoading.value = true;

    try {
        const response = await TranscriptsService.delete(item.id);

        if (response.status === 200) {
            transcripts.value = transcripts.value.filter(transcript => transcript.id !== item.id);
            total.value -= 1;
            dialogConfirmation.value = false;
            await index();
        }

        return response;
    } catch (error) {
        console.error("Erro ao excluir o item:", error);
    } finally {
        dialogLoading.value = false;
    }
};

const deleteConfirmation = (selectedItem) => {
    item.value = selectedItem;
    dialogConfirmation.value = !dialogConfirmation.value;
};

onMounted(() => {
    index();
});
</script>

<style scoped>
</style>