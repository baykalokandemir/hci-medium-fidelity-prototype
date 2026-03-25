<template>
    <div class="flex" :class="wrapperClass">
        <Star v-for="s in maxStars" :key="s" class="w-4 h-4" :class="[s <= Math.round(rating) ? 'fill-current text-yellow-500' : 'text-slate-300', starClass]" />
    </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next'

defineProps({
    rating: {
        type: Number,
        required: true
    },
    maxStars: {
        type: Number,
        default: 5
    },
    wrapperClass: {
        type: String,
        default: ''
    },
    starClass: {
        type: String,
        default: 'w-4 h-4'
    }
})
</script>
