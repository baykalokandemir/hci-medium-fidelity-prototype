<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-8">
            <Bookmark class="w-8 h-8 text-slate-400" /> My Library
        </h2>

        <div class="flex gap-3 mb-8 border-b border-slate-200 pb-4 overflow-x-auto hide-scrollbar">
            <button v-for="t in tabs" :key="t.id" @click="libraryTab = t.id" :class="[libraryTab === t.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:text-brand', 'px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap']">{{ t.label }}</button>
        </div>

        <div class="space-y-4">
            <NuxtLink v-for="show in shows" :key="show.title" to="/series" class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-6 items-center shadow-sm hover:border-brand transition-colors group block">
                <div class="w-full sm:w-48 aspect-video relative rounded-lg overflow-hidden flex-shrink-0">
                    <img :src="show.img" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                </div>
                <div class="flex-1 w-full">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h4 class="text-lg font-bold text-slate-800 group-hover:text-brand transition-colors">{{ show.title }}</h4>
                            <p class="text-sm text-slate-500">{{ show.episode }}</p>
                        </div>
                        <span :class="[libraryTab === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-indigo-50 text-brand border-indigo-100', 'px-2.5 py-1 text-xs font-bold rounded border']">{{ tabs.find(t => t.id === libraryTab)?.label }}</span>
                    </div>
                    <div class="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                        <div :class="[libraryTab === 'completed' ? 'bg-green-500' : 'bg-brand', 'h-full']" :style="{ width: libraryTab === 'completed' ? '100%' : show.progress }"></div>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { Bookmark } from 'lucide-vue-next'

const { libraryTab } = useAppState()

const tabs = [
    { id: 'watching',    label: 'Watching' },
    { id: 'planToWatch', label: 'Plan to Watch' },
    { id: 'completed',   label: 'Completed' },
    { id: 'history',     label: 'History' }
]

const shows = [
    { title: "City Chronicles", episode: "Season 1, Episode 3", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80", progress: "40%" },
    { title: "Family Ties",     episode: "Season 2, Episode 7", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80", progress: "75%" },
    { title: "Morning News",    episode: "Season 3, Episode 1", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80", progress: "15%" },
    { title: "The Great Bake",  episode: "Season 1, Episode 5", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80", progress: "90%" }
]
</script>
