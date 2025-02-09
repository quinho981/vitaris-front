<template>
    <Dialog 
        :header='$t("termOfUse")' 
        v-model:visible="props.active" 
        :breakpoints="{ '960px': '75vw' }" 
        :style="{ width: '60vw' }" 
        :modal="true"
    >
        <div class="terms-content" v-html="htmlTerms"></div>
        <template #footer>
            <Button :label='$t("button.close")' @click="close" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";
import { marked } from "marked";
import terms from '@/assets/terms.md?raw';

const emit = defineEmits(['close']);

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
});
const htmlTerms = marked(terms);

const close = () => {
    emit('close', false);
}
</script>

<style scoped>
:deep(h2) {
    font-size: 14px;
    font-weight: 700;
}

:deep(h3) {
    font-size: 13.5px;
    font-weight: 700;
}

:deep(span) {
    font-size: 13.5px;
    font-weight: 700;
}

:deep(ul) {
    margin-left: 20px;
}

:deep(li) {
    list-style-type: disc;
}

:deep(hr) {
    margin-bottom: 10px;
}

.terms-content {
    max-height: 70vh;
    overflow-y: auto;
    padding: 0 10px;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 13.3px;
}

.terms-content::-webkit-scrollbar {
    width: 8px;
}

.terms-content::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
}
</style>