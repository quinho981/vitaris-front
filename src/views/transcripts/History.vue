<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Transcrições</h1>
        <p class="text-gray-600 mt-1">Gerencie e organize suas transcrições médicas</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-filter" label="Filtros" outlined class="!h-10 !text-slate-950 !bg-white !border-zinc-200" />
        <Button icon="pi pi-plus" label="Nova Transcrição" class="!h-10 !bg-slate-950 !border-none " @click="goToNewTranscription" />
      </div>
    </div>
    <div class="bg-white dark:bg-[#18181b] rounded-lg shadow p-4 mb-6">
        <div class="flex gap-4 mb-4 items-center">
                         <SelectButton 
             v-model="value" 
             :options="options" 
             size="large"
             :pt="{
                root: {
                    button: {style: 'color: black, fontWeight: bold'}
                }
             }"
             />
        </div>
        <div class="flex gap-4 mb-4">
        <InputText v-model="search" placeholder="Buscar transcrições..." class="flex-1" />
        <Button label="Por Data" outlined class="!text-slate-950 !border-zinc-200"/>
        <Button label="Por Categoria" outlined class="!text-slate-950 !border-zinc-200"/>
      </div>
    </div>
    <div class="bg-white dark:bg-[#18181b] rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in filteredTranscripts" :key="item.id" class="bg-white dark:bg-[#18181b] border rounded-lg p-4 shadow hover:shadow-lg transition relative">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2">
              <i class="pi pi-file text-xl text-teal-600" />
              <span class="font-bold text-base">Consulta - {{ item.patient_name }}</span>
            </div>
            <Button icon="pi pi-star" class="p-0" text :class="{'text-yellow-400': item.favorite}" @click="toggleFavorite(item)" />
          </div>
          <div class="text-gray-500 text-sm mb-1">{{ item.patient_name }}</div>
          <div class="text-gray-700 dark:text-gray-300 text-sm mb-2 truncate">{{ item.summary }}</div>
          <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{{ formatDate(item.created_at) }}</span>
            <span>{{ formatSize(item.size) }}</span>
          </div>
          <div class="flex gap-2 mb-2">
            <span class="bg-slate-200 dark:bg-[#27272a] text-xs rounded px-2 py-1 font-semibold">{{ item.category }}</span>
          </div>
          <div class="flex gap-3 items-center">
            <Button icon="pi pi-eye" text @click="goToDetail(item)" v-tooltip.top="'Visualizar'" />
            <Button icon="pi pi-download" text v-tooltip.top="'Baixar'" />
            <Button icon="pi pi-trash" text severity="danger" @click="deleteTranscript(item)" v-tooltip.top="'Excluir'" />
          </div>
        </div>
      </div>
      <div v-if="!filteredTranscripts.length" class="text-center text-gray-400 py-10">
        Nenhuma transcrição encontrada.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { TranscriptsService } from '@/service/TranscriptsService';
import { useShowToast } from '@/utils/useShowToast';

const router = useRouter();
const { showSuccess, showError } = useShowToast();

const transcripts = ref([]);
const search = ref('');
const tab = ref('documents');

const value = ref('Documentos');
const options = ref(['Documentos','Templates','Arquivados']);

const fetchTranscripts = async () => {
  try {
    const response = await TranscriptsService.index(1);
    transcripts.value = response.transcripts.map(t => ({
      ...t,
      patient_name: t.patient_name || t.title || 'Paciente',
      summary: t.summary || t.title || '',
      size: t.size || 0,
      category: t.category || 'Geral',
      favorite: t.favorite || false,
    }));
  } catch (e) {
    showError('Erro', 'Erro ao carregar transcrições', 3000);
  }
};

onMounted(fetchTranscripts);

const filteredTranscripts = computed(() => {
  if (!search.value) return transcripts.value;
  return transcripts.value.filter(t =>
    t.patient_name.toLowerCase().includes(search.value.toLowerCase()) ||
    t.summary.toLowerCase().includes(search.value.toLowerCase())
  );
});

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
};
const formatSize = (size) => {
  if (!size) return '';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const goToDetail = (item) => {
  router.push({ name: 'transcriptsShow', params: { id: item.id } });
};
const goToNewTranscription = () => {
  router.push('/home');
};
const toggleFavorite = (item) => {
  item.favorite = !item.favorite;
  // Aqui você pode chamar um serviço
};
const deleteTranscript = async (item) => {
  try {
    await TranscriptsService.delete(item.id);
    transcripts.value = transcripts.value.filter(t => t.id !== item.id);
    showSuccess('Sucesso', 'Transcrição excluída', 3000);
  } catch (e) {
    showError('Erro', 'Erro ao excluir transcrição', 3000);
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  padding: 2rem;
}

:deep(.p-selectbutton, ) {
  width: 100% !important;
}

:deep(.p-togglebutton) {
  font-weight: bold !important;
  width: 100% !important;
  font-size: 15px;
  height: 3.5rem;
}

</style> 