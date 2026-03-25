<template>
    <div class="w-full bg-slate-100 rounded-full overflow-hidden" :class="height">
        <div class="h-full transition-all duration-500" :class="color" :style="{ width: typeof percentage === 'number' ? percentage + '%' : percentage }"></div>
    </div>
</template>

<script setup>
defineProps({
    percentage: {
        type: [Number, String],
        required: true
    },
    height: {
        type: String,
        default: 'h-1.5'
    },
    color: {
        type: String,
        default: 'bg-brand'
    }
})
</script>
