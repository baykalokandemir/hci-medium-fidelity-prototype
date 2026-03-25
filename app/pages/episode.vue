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
                            <Star class="w-3.5 h-3.5 text-yellow-500 fill-current" />
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
                        <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                            <div class="flex justify-between mb-4">
                                <span class="text-xs font-bold text-slate-400 uppercase">True / False</span>
                                <span class="text-xs font-bold text-brand">Q1</span>
                            </div>
                            <p class="font-medium text-slate-700 mb-5">Did the neighbor use formal language ("U") when speaking to the landlord?</p>
                            <div class="grid grid-cols-2 gap-4">
                                <button class="p-3 border border-brand bg-indigo-50 text-brand font-medium rounded-lg flex items-center justify-center gap-2"><Check class="w-4 h-4" /> True</button>
                                <button class="p-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-lg flex items-center justify-center gap-2"><X class="w-4 h-4" /> False</button>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-200 opacity-50 pointer-events-none">
                            <div class="flex justify-between mb-4">
                                <span class="text-xs font-bold text-slate-400 uppercase">Multiple Choice</span>
                                <span class="text-xs font-bold text-brand">Q2</span>
                            </div>
                            <p class="font-medium text-slate-700 mb-5">What does "gezellig" imply in the context of their living room?</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div class="p-3 border border-slate-200 rounded-lg">A. Expensive</div>
                                <div class="p-3 border border-slate-200 rounded-lg">B. Crowded</div>
                                <div class="p-3 border border-slate-200 rounded-lg">C. Cozy & warm</div>
                                <div class="p-3 border border-slate-200 rounded-lg">D. Modern</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Episode Reviews -->
                <div>
                    <h2 class="text-2xl font-bold text-slate-800 mb-6">Rate This Episode</h2>
                    <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-6">
                        <h3 class="font-semibold text-slate-800 mb-4">Leave a Review</h3>
                        <div class="flex items-center gap-2 mb-3 text-slate-300">
                            <Star v-for="s in 5" :key="s" class="w-6 h-6 hover:text-yellow-400 cursor-pointer transition-colors" />
                        </div>
                        <textarea placeholder="How was the language difficulty? Any memorable scenes or phrases?" class="w-full p-4 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand mb-4 h-24 resize-none bg-white"></textarea>
                        <div class="flex justify-end">
                            <button class="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900">Submit Review</button>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-white p-5 border border-slate-200 rounded-xl">
                            <div class="flex justify-between items-start mb-2">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-brand rounded-full text-white flex items-center justify-center text-xs font-bold">MK</div>
                                    <span class="font-semibold text-slate-800">Maria K.</span>
                                </div>
                                <div class="flex text-yellow-500">
                                    <Star v-for="s in 4" :key="s" class="w-4 h-4 fill-current" />
                                    <Star class="w-4 h-4 text-slate-300" />
                                </div>
                            </div>
                            <p class="text-slate-600 text-sm">The lobby scene was perfect for practicing formal vs informal greetings. The vocabulary notes matched exactly what I needed!</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Language Notes Sidebar -->
            <div class="lg:w-1/3 space-y-6">
                <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h4 class="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                        <BookOpen class="w-5 h-5 text-brand" /> Language Notes
                    </h4>
                    <ul class="space-y-4 text-sm">
                        <li class="group">
                            <div class="font-bold text-slate-700 mb-1 flex justify-between">Huisbaas <PlusCircle class="w-4 h-4 text-slate-300 group-hover:text-brand cursor-pointer" /></div>
                            <div class="text-slate-500">Landlord</div>
                        </li>
                        <li class="group">
                            <div class="font-bold text-slate-700 mb-1 flex justify-between">Kennismaken <PlusCircle class="w-4 h-4 text-slate-300 group-hover:text-brand cursor-pointer" /></div>
                            <div class="text-slate-500">To get acquainted / meet</div>
                        </li>
                        <li class="group">
                            <div class="font-bold text-slate-700 mb-1 flex justify-between">Huurcontract <PlusCircle class="w-4 h-4 text-slate-300 group-hover:text-brand cursor-pointer" /></div>
                            <div class="text-slate-500">Rental contract</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft, Play, ChevronLeft, ChevronRight, ExternalLink, ChevronDown, Bookmark, Star, HelpCircle, Check, X, BookOpen, PlusCircle } from 'lucide-vue-next'
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
