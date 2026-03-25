<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-8">
            <FileText class="w-8 h-8 text-slate-400" /> My Reviews
        </h2>
        <div class="flex items-center gap-6 mb-8 text-sm text-slate-600 border-b border-slate-200 pb-4">
            <span>Total Reviews: <strong>12</strong></span>
            <span>Avg Rating: <strong>4.2</strong> <Star class="w-4 h-4 inline text-yellow-500 fill-current mb-1" /></span>
        </div>
        <div class="space-y-6">
            <NuxtLink v-for="i in 4" :key="i" to="/series" class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-6 hover:border-brand transition-colors group block">
                <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=200&q=80" class="w-24 h-32 object-cover rounded-lg hidden sm:block group-hover:scale-105 transition-transform">
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-lg text-slate-800 group-hover:text-brand transition-colors">City Chronicles</h4>
                        <div class="flex text-yellow-500">
                            <Star v-for="s in 4" :key="s" class="w-4 h-4 fill-current" />
                            <Star class="w-4 h-4 text-slate-300" />
                        </div>
                    </div>
                    <p class="text-slate-600 text-sm mb-4 leading-relaxed">This series was fantastic for learning everyday slang! The pacing in the first few episodes was a bit fast, but I got used to it. Highly recommended for B1 learners.</p>
                    <div class="flex items-center gap-4 text-xs text-slate-400">
                        <span class="flex items-center gap-1"><ThumbsUp class="w-4 h-4" /> 24 Helpful</span>
                        <span>Reviewed on Oct 12, 2025</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { FileText, Star, ThumbsUp } from 'lucide-vue-next'
</script>
