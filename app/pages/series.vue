<template>
    <div class="max-w-5xl mx-auto pb-12">
        <NuxtLink to="/explore" class="inline-flex text-sm font-medium text-slate-500 hover:text-slate-800 items-center gap-2 mb-6 transition-colors">
            <ArrowLeft class="w-4 h-4" /> Back to Explore
        </NuxtLink>

        <!-- Series Header -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
            <div class="h-64 md:h-80 w-full relative">
                <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end">
                    <div class="p-8 w-full text-white">
                        <div class="flex justify-between items-end flex-wrap gap-4">
                            <div>
                                <div class="inline-block px-3 py-1 bg-brand text-white font-bold rounded-full text-xs mb-3">B1 Level</div>
                                <h1 class="text-4xl font-bold mb-2">City Chronicles</h1>
                                <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-200 font-medium items-center">
                                    <span>3 Seasons</span>
                                    <span class="text-slate-500">•</span>
                                    <span>Drama</span>
                                    <span class="text-slate-500">•</span>
                                    <span class="flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-1 rounded-lg">
                                        <StarRating :rating="4.3" :maxStars="1" />
                                        <span class="font-bold text-white">4.3</span>
                                        <span class="text-slate-300 text-xs">LinguaTV</span>
                                    </span>
                                    <span class="flex items-center gap-1.5 bg-yellow-400/90 text-slate-900 px-2.5 py-1 rounded-lg">
                                        <span class="font-black text-xs tracking-tight">IMDb</span>
                                        <span class="font-bold">7.8</span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <NuxtLink to="/episode" class="px-6 py-3 bg-brand hover:bg-brand-light text-white font-semibold rounded-xl flex items-center gap-2 transition-colors">
                                    <Play class="w-5 h-5 fill-current" /> Play S1 E1
                                </NuxtLink>
                                <button @click.stop="openSaveListModal" class="p-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl transition-colors">
                                    <Bookmark class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-8">
                <h3 class="font-bold text-slate-800 mb-2">About the Series</h3>
                <p class="text-slate-600 leading-relaxed max-w-3xl">A captivating drama series following daily life in the capital. Perfect for conversational practice and modern idioms. Follows the interwoven stories of residents in an apartment complex.</p>
            </div>
        </div>

        <!-- Seasons & Episodes -->
        <div class="mb-12">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-slate-800">Episodes</h2>
                <div class="flex gap-2">
                    <button class="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-sm font-medium">Season 1</button>
                    <button class="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">Season 2</button>
                    <button class="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">Season 3</button>
                </div>
            </div>
            <div class="space-y-3">
                <NuxtLink v-for="i in 5" :key="i" to="/episode" class="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-brand cursor-pointer transition-colors group block w-full text-left">
                    <div class="w-10 text-center font-bold text-slate-400 group-hover:text-brand">{{ i }}</div>
                    <div class="w-32 aspect-video bg-slate-200 rounded overflow-hidden flex-shrink-0 relative">
                        <img src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover">
                        <PlayCircle class="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-slate-800">Episode {{ i }}: The Arrival</h4>
                        <p class="text-sm text-slate-500 line-clamp-1">New neighbors move into the complex, causing a stir among the regulars.</p>
                    </div>
                    <div class="pr-4 text-slate-400"><ChevronRight class="w-5 h-5" /></div>
                </NuxtLink>
            </div>
        </div>

        <!-- Reviews Section -->
        <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-6">User Reviews</h2>

            <ReviewInput />

            <div class="space-y-4">
                <ReviewCard 
                    author="Jane Doe"
                    avatarInitials="JD"
                    :rating="5"
                    text="Excellent dictation speed. It perfectly bridges the gap between A2 and B1. I actually used the phrase from episode 3 at work yesterday!"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft, Play, PlayCircle, Bookmark, ChevronRight } from 'lucide-vue-next'

const { openSaveListModal } = useAppState()
</script>
