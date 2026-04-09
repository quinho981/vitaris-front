<template>
    <div class="contents">
        <div class="item-icon flex-shrink-0">
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${template.category.color || 'bg-slate-100 text-slate-600'}`">
                <component :is="getIcon(template.category.icon)" :size="18" />
            </div>
        </div>

        <div class="flex-1 min-w-0">
            <p class="font-semibold text-surface-800 leading-tight dark:text-surface-300">{{ template.name }}</p>
            <p class="text-sm text-surface-400 truncate mt-0.5">
                {{ template.description || `Template para ${template.name}` }}
            </p>
        </div>

        <div class="hidden sm:flex items-center gap-x-2 flex-shrink-0">
            <div :class="`py-1 px-2 rounded-full font-semibold flex text-xs items-center justify-center ${template.category.color || 'bg-slate-100 text-slate-600'}`">
                {{template.category.name}}
            </div>
            <Tag
                severity="secondary"
                :value="`${template.total} uso${template.total !== 1 ? 's' : ''}`"
                rounded
                class="!text-xs !py-0.5"
            />
        </div>

        <div class="hidden md:flex items-center gap-x-2 flex-shrink-0">
            <Button
                label="Ver estrutura"
                size="small"
                outlined
                class="!text-xs !py-1.5 !px-3 !border-surface-200 !text-surface-600 hover:!bg-surface-100 dark:!border-surface-600 dark:!text-surface-300 dark:hover:!bg-surface-700"
                @click.stop="$emit('open', template)"
            />
            <Button
                label="Iniciar consulta"
                size="small"
                class="!text-xs !py-1.5 !px-3"
                @click.stop="$emit('start', template)"
            />
        </div>

        <div class="flex md:hidden flex-shrink-0">
            <Button
                icon="pi pi-play"
                size="small"
                rounded
                class="!w-8 !h-8"
                @click.stop="$emit('start', template)"
            />
        </div>
    </div>
</template>

<script setup>
import { Stethoscope, Slice, TestTubeDiagonal, Baby, Brain, Activity, FileText } from 'lucide-vue-next'

const iconMap = {
    Stethoscope, Slice, TestTubeDiagonal, Baby, Brain, Activity, FileText
}

const props = defineProps({
    template: {
        type: Object,
        required: true
    }
})

defineEmits(['open', 'start'])

const getIcon = (iconName) => {
    return iconMap[iconName] || FileText
}
</script>