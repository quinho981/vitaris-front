<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4">Transcrição via WebSocket</h2>
    <div class="mb-4">
      <label class="block mb-1">ID de Transcrição:</label>
      <input v-model="transcriptionId" type="number" class="w-full border rounded p-2" placeholder="Digite o ID" />
    </div>
    <div class="mb-4">
      <label class="block mb-1">Arquivo de Áudio (WAV):</label>
      <input ref="fileInput" type="file" accept="audio/wav" @change="onFileChange" class="w-full" />
    </div>
    <button
      :disabled="!canSend"
      @click="startTranscription"
      class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      Iniciar Transcrição
    </button>

    <div v-if="segments.length" class="mt-6">
      <h3 class="text-xl font-medium mb-2">Resultados:</h3>
      <ul class="space-y-2">
        <li
          v-for="(seg, index) in segments"
          :key="index"
          class="border p-3 rounded shadow-sm"
        >
          <p><strong>Speaker:</strong> {{ seg.speaker }}</p>
          <p><strong>Início:</strong> {{ seg.start }}s</p>
          <p><strong>Fim:</strong> {{ seg.end }}s</p>
          <p><strong>Texto:</strong> {{ seg.transcription }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const transcriptionId = ref(null)
const fileInput = ref(null)
const audioFile = ref(null)
const segments = ref([])
let ws = null

const canSend = computed(() => transcriptionId.value && audioFile.value)

function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type === 'audio/wav') {
    audioFile.value = file
  } else {
    audioFile.value = null
    alert('Por favor selecione um arquivo WAV válido.')
  }
}

async function startTranscription() {
  if (ws) {
    ws.close()
  }
  segments.value = []

  ws = new WebSocket('ws://localhost:8000/api/ws/transcribe')

  ws.onopen = () => {
    // Envia JSON inicial
    ws.send(JSON.stringify({ transcription_id: Number(transcriptionId.value) }))
    // Envia o arquivo WAV como bytes
    const reader = new FileReader()
    reader.onload = () => {
      const arrayBuffer = reader.result
      ws.send(arrayBuffer)
    }
    reader.readAsArrayBuffer(audioFile.value)
  }

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (data.error) {
        alert(data.error)
      } else {
        segments.value.push(data)
      }
    } catch (err) {
      console.error('Erro ao parsear mensagem:', err)
    }
  }

  ws.onerror = (err) => {
    console.error('WebSocket erro:', err)
  }

  ws.onclose = () => {
    console.info('Conexão WebSocket fechada')
  }
}
</script>

<style scoped>
/* Adicione estilos adicionais se necessário */
</style>
