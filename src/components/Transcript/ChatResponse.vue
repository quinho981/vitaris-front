<template>
    <div>
        <div 
            v-if="isLoading"
            class="flex justify-center items-center "
        >
            <Skeleton width="3%" height="35px" class="mb-2 mr-2 !rounded-3xl"></Skeleton>
            <Skeleton width="55%" height="30dvh" class="mb-2 !rounded-xl"></Skeleton>
        </div>
        <Fluid
            v-else
            :visible="isVisible"
            ref="fluidRef"
            class="flex justify-center h-[calc(100dvh-13rem)] overflow-auto"
        >
            <div class="flex w-full md:w-3/5">
                <div class="flex md:px-3 w-full ">
                    <ul>
                        <li 
                            class="flex mb-3 items-center"
                            v-for="(itemContent, index) in item" :key="index"
                        >
                            <Avatar 
                                label="V" 
                                class="mr-2 flex-shrink-0" 
                                size="small" 
                                :style="{ 'background-color': '#2196F3', color: '#ffffff' }" 
                                shape="circle"
                            ></Avatar> 
                            <span
                                id="anamnese-result"
                                ref="typingElements"
                                class="bg-slate-200 dark:bg-[#18181b] p-2 rounded-xl" 
                                v-html="itemContent"
                            ></span>
                        </li>
                    </ul>
                </div>
            </div>
        </Fluid>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isVisible = computed(() => props.active);
const isLoading = computed(() => !props.item.length);

const emit = defineEmits(['close']);

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    },
    item: {
        type: Array,
        default: () => []
    }
});
</script>

<style scoped>
</style>