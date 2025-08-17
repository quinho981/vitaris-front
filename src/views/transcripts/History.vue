<template>
  <section>
    <div class="flex items-center justify-between mb-3 py-3">
      <div>
        <h1 class="text-3xl font-bold">Histórico de transcrições</h1>
        <p class="my-1 text-lg">Gerencie e organize suas transcrições médicas</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-filter" label="Filtros" outlined class="!text-slate-950 !bg-white !border-zinc-200" />
        <router-link
          :to="{ name: 'transcription' }"
          class="p-button p-component !bg-gradient-to-br !from-blue-500 !to-blue-700 !border-none !text-white !text-[14px] !font-semibold !p-3 flex items-center gap-2 hover:!from-blue-600 hover:!to-blue-800 duration-300"
        >
          <Mic :size="18" />
          Nova Transcrição
        </router-link>
      </div>
    </div>
    <div class="card mb-5">
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
      <div class="flex gap-4 !mt-5">
        <IconField class="flex-1">
          <InputIcon class="pi pi-search" />
          <InputText v-model="search" placeholder="Buscar transcrições..." class="w-full" />
        </IconField>
        <Button label="Por Data" outlined class="!text-slate-950 !border-zinc-200"/>
        <Button label="Por Categoria" outlined class="!text-slate-950 !border-zinc-200"/>
      </div>
    </div>
    <div class="rounded-lg mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div v-for="item in filteredTranscripts" :key="item.id" class="card p-4 hover:shadow-lg transition-shadow duration-300">
          <div class="flex justify-between mb-2">
            <div class="flex items-center gap-2">
              <div>
                <FileText :size="18" class="text-blue-500 mr-1" />
              </div>
              <span class="font-bold text-base">Consulta - {{ item.patient_name }}</span>
            </div>
            <div class="ml-2">
              <Button class="p-0" text @click="toggleFavorite(item)" :class="item.favorite ? 'hover:!bg-yellow-50' : 'hover:!bg-gray-50'">
                <Star :size="17" :class="item.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'" />
              </Button>
            </div>
          </div>
          <p class="text-[13.5px]">{{ item.patient_name }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500 mb-2 mt-2">
            <span>{{ formatDate(item.created_at) }}</span>
            <span class="mr-2">{{ formatSize(item.size) }}</span>
          </div>
          <div class="flex items-center justify-between mt-4">
            <div>
              <Tag severity="secondary" :value="item.category" rounded />
            </div>
            <div class="flex gap-x-3 items-end">
              <Button text @click="goToDetail(item)" v-tooltip.top="'Visualizar'">
                <Eye :size="18" class="text-slate-500" /> 
              </Button>
              <Button text @click="goToDetail(item)" v-tooltip.top="'Renomear'">
                <Pencil :size="18" class="text-slate-500" /> 
              </Button>
              <Button text v-tooltip.top="'Baixar'">
                <Download :size="18" class="text-slate-500" />
              </Button>
              <Button text severity="danger" @click="deleteTranscript(item)" v-tooltip.top="'Excluir'">
                <Trash :size="18" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!filteredTranscripts.length" class="card text-center text-gray-400 py-10">
        Nenhuma transcrição encontrada
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { TranscriptsService } from '@/service/TranscriptsService';
import { useShowToast } from '@/utils/useShowToast';
import { FileText, Eye, Download, Trash, Star, Mic, Pencil } from 'lucide-vue-next';

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
      patient_name: t.patient || t.title || 'Paciente',
      summary: t.summary || t.title || '',
      size: t.size || 10,
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
/* .card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  padding: 2rem;
} */

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