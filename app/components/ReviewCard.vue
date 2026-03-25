<template>
    <div class="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4 sm:gap-6 hover:border-brand transition-colors group">
        <!-- Optional Image (for Reviews page viewing external shows) -->
        <img v-if="imgUrl" :src="imgUrl" class="w-24 h-32 object-cover rounded-lg hidden sm:block group-hover:scale-105 transition-transform">
        
        <div class="flex-1">
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-3">
                    <!-- If it's for a user review on an episode -->
                    <div v-if="avatarInitials" class="w-8 h-8 bg-brand rounded-full text-white flex items-center justify-center text-xs font-bold">{{ avatarInitials }}</div>
                    <h4 class="font-bold text-lg text-slate-800 transition-colors" :class="{'group-hover:text-brand': clickable}">{{ author }}</h4>
                </div>
                <StarRating :rating="rating" />
            </div>
            <p class="text-slate-600 text-sm mb-4 leading-relaxed">{{ text }}</p>
            <div v-if="date || helpfulCount !== undefined" class="flex items-center gap-4 text-xs text-slate-400">
                <span v-if="helpfulCount !== undefined" class="flex items-center gap-1"><ThumbsUp class="w-4 h-4" /> {{ helpfulCount }} Helpful</span>
                <span v-if="date">Reviewed on {{ date }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ThumbsUp } from 'lucide-vue-next'

defineProps({
    author: String,
    rating: Number,
    text: String,
    date: String,
    helpfulCount: Number,
    avatarInitials: String,
    imgUrl: String,
    clickable: Boolean
})
</script>
