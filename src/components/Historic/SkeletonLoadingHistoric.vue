<template>
    <div>
        <div v-for="(_, i) in skeletonMessages" :key="i">
            <Skeleton height="7.3rem" class="mb-4"></Skeleton>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const count = Math.floor(Math.random() * 4) + 1
const skeletonMessages = ref(Array.from({ length: count }))
</script>

<style>
</style>