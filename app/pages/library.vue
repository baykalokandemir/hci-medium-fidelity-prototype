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
                v-for="show in myShows" :key="show.id" 
                layout="horizontal"
                :show="{ id: show.id, title: show.title, subtitle: `Season ${show.currentSeason}, Episode ${show.currentEpisode}`, img: show.img, progress: libraryTab === 'completed' ? 100 : show.progress, seasons: show.seasons }" 
                :progressColor="libraryTab === 'completed' ? 'bg-green-500' : 'bg-brand'"
                :to="`/series/${show.id}`"
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
import dutchShows from '~/data/dutch_shows.json'

const { libraryTab } = useAppState()

const tabs = [
    { id: 'watching',    label: 'Watching' },
    { id: 'planToWatch', label: 'Plan to Watch' },
    { id: 'completed',   label: 'Completed' },
    { id: 'history',     label: 'History' }
]

// Intelligently bind the interactive view to the offline database mock states
const myShows = [
    { 
        ...dutchShows[0], // Undercover 
        currentSeason: 2, currentEpisode: 2, 
        progress: 45 // 45% of 3 seasons
    },
    { 
        ...dutchShows[1], 
        currentSeason: 1, currentEpisode: 4, 
        progress: 66 // 66% of 1 season
    },
    { 
        ...dutchShows[5], // Zondag Met Lubach
        currentSeason: 5, currentEpisode: 10, 
        progress: 38 // 38% of 13 seasons
    },
    { 
        ...dutchShows[4], // Wie is de Mol
        currentSeason: 20, currentEpisode: 2, 
        progress: 83 // 83% of 24 seasons
    }
]
</script>
