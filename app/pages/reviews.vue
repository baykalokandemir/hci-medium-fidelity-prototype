<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-8">
            <FileText class="w-8 h-8 text-slate-400" /> My Reviews
        </h2>
        <div class="flex items-center gap-6 mb-8 text-sm text-slate-600 border-b border-slate-200 pb-4">
            <span>Total Reviews: <strong>12</strong></span>
            <span class="flex items-center gap-1">Avg Rating: <strong>4.2</strong> <StarRating :rating="4.2" :maxStars="1" /></span>
        </div>
        <div class="space-y-6">
            <NuxtLink v-for="i in 4" :key="i" to="/series" class="block">
                <ReviewCard 
                    author="City Chronicles"
                    :rating="4"
                    text="This series was fantastic for learning everyday slang! The pacing in the first few episodes was a bit fast, but I got used to it. Highly recommended for B1 learners."
                    date="Oct 12, 2025"
                    :helpfulCount="24"
                    imgUrl="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=200&q=80"
                    clickable
                />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { FileText } from 'lucide-vue-next'
</script>
