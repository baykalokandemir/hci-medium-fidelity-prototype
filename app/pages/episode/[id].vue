<template>
    <div class="max-w-5xl mx-auto pb-12">
        <NuxtLink :to="`/series/${currentShow.id}`" class="inline-flex text-sm font-medium text-slate-500 hover:text-brand items-center gap-2 mb-6 transition-colors">
            <ArrowLeft class="w-4 h-4" /> Back to {{ currentShow.title }}
        </NuxtLink>

        <!-- Media Carousel -->
        <div class="w-full aspect-video bg-slate-900 rounded-2xl mb-4 relative overflow-hidden shadow-lg">
            <img :src="slide.img" :class="[slide.type === 'trailer' ? 'opacity-60' : 'opacity-90', 'w-full h-full object-cover transition-opacity duration-300 absolute inset-0 z-0']">

            <div v-if="slide.type === 'trailer'" class="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                <div class="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center cursor-pointer transition-colors border-2 border-white/40">
                    <Play class="w-7 h-7 text-white fill-current ml-1" />
                </div>
                <span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur">{{ slide.label }}</span>
            </div>
            <div v-else class="absolute bottom-4 left-4 z-10">
                <span class="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur">{{ slide.label }}</span>
            </div>

            <button @click="carouselPrev" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur z-20">
                <ChevronLeft class="w-5 h-5" />
            </button>
            <button @click="carouselNext" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur z-20">
                <ChevronRight class="w-5 h-5" />
            </button>
        </div>

        <!-- Carousel dots -->
        <div class="flex items-center justify-center gap-2 mb-8">
            <button v-for="(s, i) in slides" :key="i" @click="carouselGo(i)" :class="[i === carouselIndex ? 'w-6 h-2.5 bg-brand' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400', 'rounded-full transition-all']"></button>
        </div>

        <!-- Watch on Platform + Bookmark -->
        <div class="flex flex-wrap gap-3 mb-8">
            <div class="relative group/plat z-20">
                <button class="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl text-sm transition-colors">
                    <ExternalLink class="w-4 h-4" /> Watch on Available Platforms
                    <ChevronDown class="w-4 h-4 ml-1" />
                </button>
                <div class="absolute left-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg py-2 w-52 hidden group-hover/plat:block">
                    <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-700 font-medium">
                        <span class="w-5 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-black">N</span> Netflix
                    </a>
                    <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-700 font-medium">
                        <span class="w-5 h-5 bg-blue-700 rounded text-white text-xs flex items-center justify-center font-black">M</span> Max
                    </a>
                    <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-700 font-medium">
                        <span class="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-black">H</span> Hulu
                    </a>
                </div>
            </div>
            <button @click="openSaveListModal" class="flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-brand hover:text-brand text-slate-700 font-medium rounded-xl text-sm transition-colors bg-white shadow-sm">
                <Bookmark class="w-4 h-4" /> Save to Library
            </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main Content -->
            <div class="lg:w-2/3 space-y-8">
                <div>
                    <h1 class="text-3xl lg:text-4xl font-black text-slate-800 mb-3 tracking-tight">S{{ currentEp.season }} E{{ currentEp.episodeNumber }}: {{ currentEp.title }}</h1>
                    
                    <!-- Dual Ratings & Tags -->
                    <div class="flex items-center gap-3 mb-4">
                        <span class="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                            <StarRating :rating="currentShow.ratingWeb" :maxStars="1" />
                            <span class="font-bold text-slate-800 text-sm">{{ currentShow.ratingWeb }}</span>
                            <span class="text-slate-500 text-xs">LinguaTV</span>
                        </span>
                        <span class="flex items-center gap-1.5 bg-yellow-400 px-2.5 py-1 rounded-lg">
                            <span class="font-black text-xs tracking-tight text-slate-900">IMDb</span>
                            <span class="font-bold text-slate-900 text-sm">{{ currentShow.ratingImdb }}</span>
                        </span>
                        
                        <span class="w-1.5 h-1.5 bg-slate-300 rounded-full mx-1"></span>
                        <span class="px-2.5 py-1 bg-brand text-white text-[10px] md:text-xs font-bold rounded uppercase">{{ currentShow.level }}</span>
                    </div>

                    <p class="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                        {{ currentEp.description }}
                    </p>
                </div>

                <!-- Quiz Section -->
                <div v-if="currentEp.quizzes && currentEp.quizzes.length > 0" class="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-5">
                        <HelpCircle class="w-6 h-6 text-brand" /> Interactive Context Check
                    </h3>
                    <div class="space-y-6">
                        <template v-for="(q, idx) in currentEp.quizzes" :key="idx">
                            <QuizCard 
                                v-if="q.type === 'binary'"
                                :title="'True / False'" 
                                :questionNumber="q.questionNumber || ('Q' + (idx+1))" 
                                :question="q.question"
                                :options="[{ text: 'True' }, { text: 'False' }]"
                            />
                            <QuizCard 
                                v-else
                                :title="'Language Check'" 
                                :questionNumber="q.questionNumber || ('Q' + (idx+1))" 
                                :question="q.question"
                                :options="q.options"
                            />
                        </template>
                    </div>
                </div>

                <!-- Episode Reviews -->
                <div v-if="currentEp.reviews && currentEp.reviews.length > 0">
                    <h2 class="text-2xl font-bold text-slate-800 mb-6">Rate This Episode</h2>
                    <ReviewInput placeholder="How was the language difficulty? Any memorable scenes or phrases?" />
                    <div class="space-y-4 mt-6">
                        <ReviewCard 
                            v-for="(r, idx) in currentEp.reviews" 
                            :key="idx"
                            :author="r.author"
                            :avatarInitials="r.avatarInitials || r.author[0]"
                            :rating="r.rating"
                            :text="r.text"
                        />
                    </div>
                </div>
            </div>

            <!-- Language Notes Sidebar -->
            <div class="lg:w-1/3">
                <LanguageNotes 
                    v-if="currentEp.languageNotes && currentEp.languageNotes.length > 0" 
                    :notes="currentEp.languageNotes" 
                    class="sticky top-6 shadow-sm"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft, Play, ChevronLeft, ChevronRight, ExternalLink, ChevronDown, Bookmark, HelpCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import dutchShows from '~/data/dutch_shows.json'

const { openSaveListModal, carouselIndex } = useAppState()
const route = useRoute()
const epId = route.params.id

let foundShow = null
let foundEp = null

// Walk through the database to find the matching contextual tree
for (const show of dutchShows) {
    if (show.episodes) {
        const matchep = show.episodes.find(e => e.id === epId)
        if (matchep) {
            foundShow = show
            foundEp = matchep
            break
        }
    }
}

// Global safety fallback for invalid states or empty payloads
const currentShow = foundShow || dutchShows[0]
const currentEp = foundEp || currentShow.episodes[0] || {}

// Dynamic responsive photo carousel slides mapping exactly to the active episode
const slides = computed(() => {
    return [
        { type: 'trailer', img: currentEp.img, label: 'Official Scene · ' + (currentEp.duration || '0m') },
        { type: 'photo',   img: currentShow.img, label: 'Series Overview' },
        { type: 'photo',   img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80', label: 'Cast Behind The Scenes' }
    ]
})

const slide = computed(() => slides.value[carouselIndex.value] || slides.value[0])

const carouselNext = () => {
    carouselIndex.value = (carouselIndex.value + 1) % slides.value.length
}

const carouselPrev = () => {
    carouselIndex.value = (carouselIndex.value + slides.value.length - 1) % slides.value.length
}

const carouselGo = (i) => {
    carouselIndex.value = i
}
</script>
