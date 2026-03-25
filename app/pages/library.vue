<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-8">
            <Bookmark class="w-8 h-8 text-slate-400" /> My Library
        </h2>

        <div class="flex gap-3 mb-8 border-b border-slate-200 pb-4 overflow-x-auto hide-scrollbar">
            <button v-for="t in tabs" :key="t.id" @click="libraryTab = t.id" :class="[libraryTab === t.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:text-brand', 'px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap']">{{ t.label }}</button>
        </div>

        <div class="space-y-4">
            <ShowCard 
                v-for="show in shows" :key="show.title" 
                layout="horizontal"
                :show="{ title: show.title, subtitle: show.episode, img: show.img, progress: libraryTab === 'completed' ? 100 : parseInt(show.progress) }" 
                :progressColor="libraryTab === 'completed' ? 'bg-green-500' : 'bg-brand'"
            >
                <template #badge>
                    <span :class="[libraryTab === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-indigo-50 text-brand border-indigo-100', 'px-2.5 py-1 text-xs font-bold rounded border']">{{ tabs.find(t => t.id === libraryTab)?.label }}</span>
                </template>
            </ShowCard>
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
    { title: "City Chronicles", episode: "Season 1, Episode 3", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80", progress: "40" },
    { title: "Family Ties",     episode: "Season 2, Episode 7", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80", progress: "75" },
    { title: "Morning News",    episode: "Season 3, Episode 1", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80", progress: "15" },
    { title: "The Great Bake",  episode: "Season 1, Episode 5", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80", progress: "90" }
]
</script>
