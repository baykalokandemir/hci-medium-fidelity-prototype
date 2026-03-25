<template>
    <div class="max-w-5xl mx-auto space-y-10">
        <!-- Top Search Bar -->
        <div class="relative max-w-2xl">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search shows, vocabulary, or culture..." class="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand outline-none">
        </div>

        <!-- Recommended -->
        <section>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Star class="w-5 h-5 text-brand" /> Recommended for You
            </h2>
            <NuxtLink to="/series" class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow block">
                <div class="md:w-1/2 aspect-video relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80" class="object-cover w-full h-full" alt="Series cover">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <PlayCircle class="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg rounded-full" />
                    </div>
                </div>
                <div class="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                    <div class="inline-block px-3 py-1 bg-indigo-50 text-brand font-bold rounded-full text-xs mb-4 w-max border border-indigo-100">B1 Level</div>
                    <h3 class="text-3xl font-bold text-slate-800 mb-2">City Chronicles</h3>
                    <p class="text-slate-500 mb-6">A captivating drama series following daily life in the capital. Perfect for conversational practice and modern idioms.</p>
                    <button class="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium rounded-lg transition-colors w-max flex items-center gap-2">
                        <Info class="w-4 h-4" /> Details
                    </button>
                </div>
            </NuxtLink>
        </section>

        <!-- Trending -->
        <section>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <TrendingUp class="w-5 h-5 text-pink-500" /> Currently Trending
            </h2>
            <div class="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
                <NuxtLink v-for="show in trendingShows" :key="show.title" to="/series" class="min-w-[280px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-brand transition-colors group block">
                    <div class="aspect-video relative overflow-hidden">
                        <img :src="show.img" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">{{ show.lvl }}</div>
                    </div>
                    <div class="p-4">
                        <h4 class="font-bold text-slate-800 mb-1">{{ show.title }}</h4>
                        <div class="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                            <div class="h-full bg-brand" :style="{ width: show.progress + '%' }"></div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<script setup>
import { Search, Star, PlayCircle, Info, TrendingUp } from 'lucide-vue-next'

const trendingShows = [
    { title: "Morning News",  img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80", lvl: "A2", progress: 25 },
    { title: "The Great Bake", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80", lvl: "A1", progress: 75 },
    { title: "Police Dept",   img: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=400&q=80", lvl: "B2", progress: 50 },
    { title: "Family Ties",   img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80", lvl: "B1", progress: 100 }
]
</script>
