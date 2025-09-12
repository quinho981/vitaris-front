<template>
  <section>
    <div class="flex flex-col mb-3 py-3">
      <h1 class="text-3xl font-bold">Histórico de transcrições</h1>
      <p class="my-1 text-lg">Gerencie e organize suas transcrições médicas</p>
    </div>
    <div class="card mb-5">
      <div class="flex gap-4 ">
        <IconField class="flex-1">
          <InputIcon class="pi pi-search" />
          <InputText v-model="search" placeholder="Buscar transcrições..." class="w-full" />
        </IconField>
        <Button label="Por data" outlined class="!text-slate-950 !border-zinc-200"/>
        <Button label="Por template" outlined class="!text-slate-950 !border-zinc-200"/>
      </div>
    </div>
    <div class="rounded-lg mb-6">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="item in filteredTranscripts" :key="item.id" class="flex justify-between flex-wrap card p-4 hover:shadow-lg transition-shadow duration-300">
          <div>
            <div class="flex justify-between items-center mb-1">
              <div class="flex gap-2 items-center w-full">
                <p v-if="editingId !== item.id" class="text-xl font-semibold">{{ item.patient }}</p>
                <InputText v-else-if="editingId === item.id" id="name" :value="item.patient" v-model="item.patient" type="text" class="w-full" placeholder="Digite o nome do paciente... (opcional)" /> 
                <Button 
                  v-if="editingId === item.id"
                  icon="pi pi-times" 
                  severity="danger" 
                  outlined
                  @click="toggleEdit(item)" 
                  class=" !text-red-500 !font-bold" 
                  v-tooltip.top="$t('button.cancel')"
                />
              </div>
            </div>
            <div class="flex justify-between mb-1 text-slate-600 dark:text-slate-200">
              <div class="flex gap-8">
                <div class="flex items-center gap-1"><Calendar :size="15" />{{ formatDate(item.created_at) }}</div>
                <div class="flex items-center gap-1"><Play :size="15" />{{ item.time }}</div>
                <div class="flex items-center gap-1"><FileAudio :size="15" />{{ formatSize(item.size) }}</div>
              </div>
            </div>
            <p class="text-slate-600 dark:text-slate-200">Paciente relata dor torácica há 3 dias, associada a dispneia aos esforços...</p>
          </div>
          <div class="flex flex-col justify-between mt-3 sm:mt-0 sm:items-center">
            <div class="flex gap-2">
              <Tag severity="primary" :value="item.template" rounded></Tag>
              <Tag severity="secondary" :value="item.type" rounded></Tag>
            </div>
            <div class="flex gap-x-2">
              <Button text @click="goToDetail(item)" v-tooltip.top="'Visualizar'">
                <Eye :size="18" class="text-slate-700 dark:text-slate-200" /> 
              </Button>
              <Button text @click="toggleEdit(item)" v-tooltip.top="'Renomear'" v-if="editingId !== item.id">
                <Pencil :size="18" class="text-slate-700 dark:text-slate-200" /> 
              </Button>
              <Button text severity="success" :loading="loadingRename" @click="renameItem(item)" v-tooltip.top="'Salvar'" v-if="editingId === item.id">
                <Save :size="18" class="text-green-500 dark:text-slate-200" /> 
              </Button>
              <Button text severity="danger" @click="deleteConfirmation(item)" v-tooltip.top="'Excluir'">
                <Trash :size="18" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="loading && transcripts.length > 0" class="flex items-center justify-center py-4">
        <Loader2 :size="24" class="animate-spin mr-2" />
        <p class="text-slate-600 mt-2">Carregando mais transcrições...</p>
      </div>

      <div v-if="loading && transcripts.length <= 0">
        <SkeletonLoadingHistoric />
      </div>

      <div ref="loadMoreTrigger" class="h-4"></div>
      
      <div v-if="!filteredTranscripts.length && !loading" class="card text-center text-gray-400 py-10">
        <div v-if="search">
          Nenhuma transcrição encontrada para "{{ search }}"
        </div>
        <div v-else>
          Nenhuma transcrição encontrada
        </div>
      </div>

      <div v-if="hasReachedEnd && transcripts.length > 0" class="text-center py-4 text-slate-500">
        <p>Todas as transcrições foram carregadas</p>
      </div>
    </div>

    <DeleteConfirmation 
      :active="dialogConfirmation"
      :item="selectedItem"
      :loading="dialogLoading"
      @close="dialogConfirmation = false" 
      @confirm="deleteTranscript"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { TranscriptsService } from '@/service/TranscriptsService';
import { useShowToast } from '@/utils/useShowToast';
import { FileText, Eye, Download, Trash, Star, Mic, Pencil, Calendar, Clock, Play, FileAudio, Loader2, Save } from 'lucide-vue-next';
import { useHelpers } from '@/utils/helper';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { showSuccess, showError } = useShowToast();
const { formatDate, formatSize, convertSecondsToMinutes } = useHelpers();
const router = useRouter();

const transcripts = ref([]);
const search = ref('');
const loading = ref(false);
const currentPage = ref(1);
const hasReachedEnd = ref(false);
const loadMoreTrigger = ref(null);
const observer = ref(null);
const selectedItem = ref({});
const dialogConfirmation = ref(false);
const dialogLoading = ref(false);
const editingId = ref(null);
const loadingRename = ref(false);

const fetchTranscripts = async (page = 1, reset = false) => {
  if (loading.value || (hasReachedEnd.value && !reset)) return;
  
  loading.value = true;
  
  try {
    const response = await TranscriptsService.index(page);
    const newTranscripts = response.transcripts.map(t => ({
      ...t,
      summary: t.summary || t.title || '',
      size: t.size || 10,
      category: t.category || 'Geral',
      template: t.document?.document_template?.name || 'Padrão',
      time: convertSecondsToMinutes(t.end_conversation_time),
      type: t.transcript_type.type
    }));

    if (reset) {
      transcripts.value = newTranscripts;
      currentPage.value = 1;
      hasReachedEnd.value = false;
    } else {
      transcripts.value = [...transcripts.value, ...newTranscripts];
    }

    if (newTranscripts.length === 0 || newTranscripts.length < 10) {
      hasReachedEnd.value = true;
    }

    currentPage.value = page;
  } catch (e) {
    showError('Erro', 'Erro ao carregar transcrições', 3000);
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  if (!hasReachedEnd.value && !loading.value) {
    await fetchTranscripts(currentPage.value + 1);
  }
};

const setupIntersectionObserver = () => {
  if (!loadMoreTrigger.value) return;

  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading.value && !hasReachedEnd.value) {
        loadMore();
      }
    },
    {
      rootMargin: '100px'
    }
  );

  observer.value.observe(loadMoreTrigger.value);
};

const filteredTranscripts = computed(() => {
  if (!search.value) return transcripts.value;
  
  return transcripts.value.filter(t =>
    t.patient.toLowerCase().includes(search.value.toLowerCase()) ||
    t.summary.toLowerCase().includes(search.value.toLowerCase())
  );
});

const goToDetail = (item) => {
  router.push({ name: 'transcriptsShow', params: { id: item.id } });
};

const toggleEdit = (item) => {
  editingId.value = editingId.value === item.id ? null : item.id;
};

const renameItem = async (item) => {
  loadingRename.value = true;

  try {
    const response = await TranscriptsService.update(item);

    if (response.status === 200) {
        transcripts.value = transcripts.value.map(transcript => 
          transcript.id === item.id ? { ...transcript, title: item.title } : transcript
        );
        editingId.value = null;
        showSuccess(t('notifications.titles.success'), t('notifications.messages.editSuccessfully'), 3000);
    }

    return response;
  } catch (error) {
    showError(t('notifications.titles.error'), t('notifications.messages.editError'), 3000);
  } finally {
    loadingRename.value = false;
  }
};


const deleteConfirmation = (item) => {
  selectedItem.value = item;
  dialogConfirmation.value = !dialogConfirmation.value;
};

const deleteTranscript = async (item) => {
  dialogLoading.value = true;

  try {
    await TranscriptsService.delete(item.id);
    transcripts.value = transcripts.value.filter(t => t.id !== item.id);
    dialogConfirmation.value = false;
    showSuccess('Sucesso', 'Transcrição excluída', 3000);
  } catch (e) {
    showError('Erro', 'Erro ao excluir transcrição', 3000);
  } finally {
    dialogLoading.value = false;
  }
};

const refreshData = async () => {
  await fetchTranscripts(1, true);
  await nextTick();
  setupIntersectionObserver();
};

onMounted(async () => {
  await fetchTranscripts(1, true);
  await nextTick();
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<style scoped>
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