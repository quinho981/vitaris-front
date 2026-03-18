<template>
    <section>
        <div class="mb-3 py-3">
            <h1 class="text-3xl font-bold">Templates</h1>
            <p class="my-1 text-lg ">Modelos pré-configurados para diferentes especialidades</p>
        </div>
        <div class="flex flex-col gap-y-4">
            <div class="card">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText v-model="searchQuery" placeholder="Pesquisar templates..." class="w-full" />
                </IconField>
            </div>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-wrap gap-4">
                    <div 
                        v-for="template in templates" 
                        :key="template.id"
                        class="card flex flex-col flex-grow gap-y-4 w-full sm:basis-[48%] lg:basis-[32%] hover:shadow-lg transition-shadow duration-300"
                    >
                        <component 
                            :is="getIcon(template.name)" 
                            :class="`p-3 rounded-lg ${getColor(template.name)}`" 
                            :size="45" 
                        />
                        <h3 class="text-xl font-bold">{{ template.name }}</h3>

                        <p class="line-clamp-2">{{ template.description || `Template para ${template.name}` }}</p>

                        <div>
                            <Tag 
                                severity="secondary" 
                                :value="`${template.total} uso${template.total !== 1 ? 's' : ''}`" 
                                rounded 
                            />
                        </div>

                        <div class="flex gap-x-4">
                            <Button 
                                label="Ver estrutura" 
                                class="w-full !bg-white border-1 !border-slate-200 !text-black hover:!bg-slate-100"
                                @click="openTemplate(template)"
                            />

                            <Button 
                                label="Iniciar consulta" 
                                class="w-full" 
                                @click="startTemplate(template)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TemplateDetails
            v-model:visible="showModal"
            :template="selectedTemplate"
            @start="startTemplate"
        />
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Heart, Brain, Bone, Eye, Stethoscope, Users, FileText } from 'lucide-vue-next';
import Cookies from 'js-cookie';
import api from '@/services/axios';

const searchQuery = ref("")
const showModal = ref(false)
const selectedTemplate = ref(null)
const templates = ref([])

const iconMap = {
    "Cardiologia": Heart,
    "Neurologia": Brain,
    "Ortopedia": Bone,
    "Oftalmologia": Eye,
    "Clínica médica": Stethoscope,
    "Pediatria": Users
}

const colors = [
    "bg-blue-50 text-blue-600",
    "bg-green-50 text-green-600",
    "bg-purple-50 text-purple-600",
    "bg-yellow-50 text-yellow-600",
    "bg-pink-50 text-pink-600",
    "bg-indigo-50 text-indigo-600",
]

const getColor = (name) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i)
    }
    return colors[hash % colors.length]
}

const getIcon = (name) => {
    return iconMap[name] || FileText
}

const openTemplate = (template) => {
    selectedTemplate.value = template
    showModal.value = true
}

const startTemplate = (template) => {
    console.log("iniciar consulta com template:", template)
}

const getTemplatesUsage = async () => {
    const token = Cookies.get('token');

    try {
        const response = await api.get(`/templates/with-documents-count`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        templates.value = response.data
    } catch (error) {
        console.error(error);
    } finally {
        // loadingTypes.value = false;
    }
}

onMounted(async () => {
    getTemplatesUsage();
});

</script>
