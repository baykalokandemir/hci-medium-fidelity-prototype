<template>
    <div class="max-w-5xl mx-auto pb-12">
        <NuxtLink to="/explore" class="inline-flex text-sm font-medium text-slate-500 hover:text-slate-800 items-center gap-2 mb-6 transition-colors">
            <ArrowLeft class="w-4 h-4" /> Back to Explore
        </NuxtLink>

        <!-- Series Header -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
            <div class="h-64 md:h-80 w-full relative bg-slate-800 flex items-center justify-center">
                <img v-if="!headerImgError" :src="show.img" @error="headerImgError = true" class="w-full h-full object-cover absolute inset-0 z-0">
                <div v-if="headerImgError" class="flex flex-col items-center justify-center text-slate-500 absolute inset-0 z-0">
                    <ImageOff class="w-12 h-12 mb-3 opacity-50" />
                    <span class="text-sm font-bold uppercase tracking-widest opacity-50">Picture Not Available</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end z-10">
                    <div class="p-8 w-full text-white">
                        <div class="flex justify-between items-end flex-wrap gap-4">
                            <div>
                                <div class="inline-block px-3 py-1 bg-brand text-white font-bold rounded-full text-[10px] md:text-xs mb-3 uppercase tracking-wide">{{ show.level }}</div>
                                <h1 class="text-4xl lg:text-5xl font-black mb-3">{{ show.title }}</h1>
                                <div class="flex flex-wrap gap-x-4 gap-y-3 text-sm text-slate-200 font-medium items-center">
                                    <span>{{ show.seasons }} Seasons ({{ show.totalEpisodes }} Eps)</span>
                                    <span class="text-slate-500">•</span>
                                    <span>{{ show.tags.join(', ') }}</span>
                                    <span class="text-slate-500">•</span>
                                    <span class="flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-1 rounded-lg">
                                        <StarRating :rating="show.ratingWeb" :maxStars="1" />
                                        <span class="font-bold text-white">{{ show.ratingWeb }}</span>
                                        <span class="text-slate-300 text-xs text-brand font-medium tracking-wide ml-1">LinguaTV</span>
                                    </span>
                                    <span class="flex items-center gap-1.5 bg-yellow-400/90 text-slate-900 px-2.5 py-1 rounded-lg">
                                        <span class="font-black text-xs tracking-tight">IMDb</span>
                                        <span class="font-bold">{{ show.ratingImdb }}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-3 mt-4 sm:mt-0">
                                <NuxtLink v-if="show.episodes && show.episodes.length > 0" :to="`/episode/${show.episodes[0].id}`" class="px-6 py-3.5 bg-brand hover:bg-brand-light text-white font-bold rounded-xl flex items-center gap-2 transition-transform shadow-lg hover:scale-105 active:scale-95">
                                    <Play class="w-5 h-5 fill-current" /> Play S1 E1
                                </NuxtLink>
                                <button @click.stop="toggleSave" class="px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-white shadow-lg">
                                    Save to Library <Bookmark class="w-5 h-5" :class="{ 'fill-yellow-400 text-yellow-400': isSaved }" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-8">
                <h3 class="text-lg font-black text-slate-800 mb-2">About the Series</h3>
                <p class="text-slate-600 leading-relaxed max-w-4xl text-sm md:text-base">{{ show.description }}</p>
                
                <div class="mt-4 flex gap-2">
                    <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase">Subtitles: {{ show.subtitles.join(', ') }}</span>
                    <span v-if="show.dubs.length > 0" class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase">Audio: {{ show.dubs.join(', ') }}</span>
                </div>
            </div>
        </div>

        <!-- Seasons & Episodes -->
        <div class="mb-12">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-slate-800">Episodes</h2>
                <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    <button class="px-5 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">Season 1</button>
                    <button class="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors whitespace-nowrap" v-if="show.seasons > 1">Season 2</button>
                    <button class="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors whitespace-nowrap" v-if="show.seasons > 2">Season 3</button>
                </div>
            </div>
            <div class="space-y-4">
                <NuxtLink v-for="ep in show.episodes" :key="ep.id" :to="`/episode/${ep.id}`" class="flex items-center gap-4 md:gap-6 p-4 bg-white border border-slate-200 rounded-2xl hover:border-brand cursor-pointer transition-colors group block w-full text-left shadow-sm hover:shadow-md">
                    <div class="w-8 md:w-12 text-center font-black text-slate-300 text-xl group-hover:text-brand transition-colors">{{ ep.episodeNumber }}</div>
                    <div class="w-28 md:w-40 aspect-video bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative flex border border-slate-200 items-center justify-center">
                        <img v-if="!failedImages.has(ep.id)" :src="ep.img" @error="failedImages.add(ep.id)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0 z-0">
                        <div v-if="failedImages.has(ep.id)" class="flex flex-col items-center justify-center text-slate-400 z-0 relative">
                            <ImageOff class="w-6 h-6 mb-1 opacity-50" />
                            <span class="text-[8px] font-bold uppercase opacity-50 text-center leading-tight">Unavailable</span>
                        </div>
                        <PlayCircle v-if="!failedImages.has(ep.id)" class="absolute inset-0 m-auto w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm drop-shadow-md z-10" />
                        <div class="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">{{ ep.duration }}</div>
                    </div>
                    <div class="flex-1 py-1">
                        <h4 class="font-bold text-slate-800 text-base md:text-lg mb-1 group-hover:text-brand transition-colors">Episode {{ ep.episodeNumber }}: {{ ep.title }}</h4>
                        <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">{{ ep.description }}</p>
                    </div>
                    <div class="pr-2 text-slate-300 group-hover:text-brand transition-colors"><ChevronRight class="w-6 h-6" /></div>
                </NuxtLink>
            </div>
        </div>

        <!-- Reviews Section -->
        <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-6">Expat Reviews</h2>

            <ReviewInput />

            <div class="space-y-4 mt-8">
                <ReviewCard 
                    v-for="(r, idx) in show.reviews" 
                    :key="idx"
                    :author="r.author"
                    :avatarInitials="r.avatarInitials"
                    :rating="r.rating"
                    :date="r.date"
                    :text="r.text"
                    :helpfulCount="r.helpfulCount"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Play, PlayCircle, Bookmark, ChevronRight, ImageOff } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import dutchShows from '~/data/dutch_shows.json'

const { openSaveListModal } = useAppState()

const isSaved = ref(false)
const toggleSave = () => {
    isSaved.value = !isSaved.value
    openSaveListModal()
}
const route = useRoute()
const showId = route.params.id

const headerImgError = ref(false)
const failedImages = ref(new Set())

// Locate the specific show payload based on the URL parameter.
const show = dutchShows.find(s => s.id === showId) || dutchShows[0]
</script>
