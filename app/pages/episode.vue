<template>
    <div class="max-w-5xl mx-auto pb-12">
        <NuxtLink to="/series" class="inline-flex text-sm font-medium text-slate-500 hover:text-brand items-center gap-2 mb-6 transition-colors">
            <ArrowLeft class="w-4 h-4" /> Back to Series
        </NuxtLink>

        <!-- Media Carousel -->
        <div class="w-full aspect-video bg-slate-900 rounded-2xl mb-4 relative overflow-hidden shadow-lg">
            <img :src="slide.img" :class="[slide.type === 'trailer' ? 'opacity-60' : 'opacity-90', 'w-full h-full object-cover transition-opacity duration-300']">

            <div v-if="slide.type === 'trailer'" class="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div class="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center cursor-pointer transition-colors border-2 border-white/40">
                    <Play class="w-7 h-7 text-white fill-current ml-1" />
                </div>
                <span class="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur">{{ slide.label }}</span>
            </div>
            <div v-else class="absolute bottom-4 left-4">
                <span class="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur">{{ slide.label }}</span>
            </div>

            <button @click="carouselPrev" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur">
                <ChevronLeft class="w-5 h-5" />
            </button>
            <button @click="carouselNext" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur">
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
            <button @click="openSaveListModal" class="flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-brand hover:text-brand text-slate-700 font-medium rounded-xl text-sm transition-colors bg-white">
                <Bookmark class="w-4 h-4" /> Save to Library
            </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main Content -->
            <div class="lg:w-2/3 space-y-8">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800 mb-2">S1 E1: The Arrival</h1>
                    <!-- Dual Ratings -->
                    <div class="flex items-center gap-3 mb-3">
                        <span class="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                            <StarRating :rating="4.1" :maxStars="1" />
                            <span class="font-bold text-slate-800 text-sm">4.1</span>
                            <span class="text-slate-400 text-xs">LinguaTV</span>
                        </span>
                        <span class="flex items-center gap-1.5 bg-yellow-400 px-2.5 py-1 rounded-lg">
                            <span class="font-black text-xs tracking-tight text-slate-900">IMDb</span>
                            <span class="font-bold text-slate-900 text-sm">8.1</span>
                        </span>
                    </div>
                    <p class="text-slate-600 leading-relaxed">
                        New neighbors move into the complex, causing a stir among the regulars. Watch out for the formal vs informal greetings used in the lobby scene.
                    </p>
                </div>

                <!-- Quiz -->
                <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <HelpCircle class="w-6 h-6 text-brand" /> Mid-Episode Quiz
                    </h3>
                    <div class="space-y-6">
                        <QuizCard 
                            title="True / False" 
                            questionNumber="Q1" 
                            question='Did the neighbor use formal language ("U") when speaking to the landlord?'
                            :options="[{ text: 'True', icon: Check }, { text: 'False', icon: X }]"
                        />
                        <QuizCard 
                            title="Multiple Choice" 
                            questionNumber="Q2" 
                            question='What does "gezellig" imply in the context of their living room?'
                            :options="['A. Expensive', 'B. Crowded', 'C. Cozy & warm', 'D. Modern']"
                            disabled
                        />
                    </div>
                </div>

                <!-- Episode Reviews -->
                <div>
                    <h2 class="text-2xl font-bold text-slate-800 mb-6">Rate This Episode</h2>
                    <ReviewInput placeholder="How was the language difficulty? Any memorable scenes or phrases?" />
                    <div class="space-y-4">
                        <ReviewCard 
                            author="Maria K."
                            avatarInitials="MK"
                            :rating="4.5"
                            text="The lobby scene was perfect for practicing formal vs informal greetings. The vocabulary notes matched exactly what I needed!"
                        />
                    </div>
                </div>
            </div>

            <!-- Language Notes Sidebar -->
            <div class="lg:w-1/3 space-y-6">
                <LanguageNotes :notes="[
                    { term: 'Huisbaas', definition: 'Landlord' },
                    { term: 'Kennismaken', definition: 'To get acquainted / meet' },
                    { term: 'Huurcontract', definition: 'Rental contract' }
                ]"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft, Play, ChevronLeft, ChevronRight, ExternalLink, ChevronDown, Bookmark, HelpCircle, Check, X } from 'lucide-vue-next'
import { computed } from 'vue'

const { openSaveListModal, carouselIndex } = useAppState()

const slides = [
    { type: 'trailer', img: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1200&q=80', label: 'Official Trailer · 2:47' },
    { type: 'photo',   img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80', label: 'Scene: The Lobby' },
    { type: 'photo',   img: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80', label: 'Scene: The Apartment' },
]

const slide = computed(() => slides[carouselIndex.value])

const carouselNext = () => {
    carouselIndex.value = (carouselIndex.value + 1) % slides.length
}

const carouselPrev = () => {
    carouselIndex.value = (carouselIndex.value + slides.length - 1) % slides.length
}

const carouselGo = (i) => {
    carouselIndex.value = i
}
</script>
