<template>
    <div class="max-w-5xl mx-auto space-y-10">
        <!-- Top Search Bar -->
        <form @submit.prevent="handleSearch" class="flex gap-4 w-full">
            <div class="relative flex-1">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="searchQuery" type="text" placeholder="Search shows, vocabulary, or culture..." class="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand outline-none">
                <div class="absolute right-4 top-1/2 -translate-y-1/2 group">
                    <button type="button" @click="isMagic = !isMagic" class="hover:scale-110 active:scale-95 transition-transform block">
                        <Sparkles class="w-5 h-5 transition-colors" :class="isMagic ? 'fill-yellow-400 text-yellow-400' : 'fill-white text-slate-400'" />
                    </button>
                    <!-- Custom Tooltip -->
                    <div class="absolute top-full right-1/2 translate-x-1/2 mt-5 w-56 p-3 bg-white border border-slate-200 text-slate-600 text-xs leading-relaxed font-medium text-center rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
                        Describe a show in natural language to find a matching show
                        <!-- Tooltip arrow -->
                        <div class="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45 rounded-sm"></div>
                    </div>
                </div>
            </div>
            <button type="submit" class="px-6 py-3 bg-brand text-white font-medium rounded-xl hover:bg-brand-light transition-colors shadow-sm focus:ring-2 focus:ring-brand focus:outline-none">Search</button>
        </form>

        <!-- Recommended -->
        <section>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Star class="w-5 h-5 text-brand fill-current" /> Recommended for You
            </h2>
            
            <ShowCard 
                :show="heroShow" 
                layout="hero"
            >
                <template #image-overlay>
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <PlayCircle class="w-20 h-20 text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xl rounded-full" />
                    </div>
                </template>
                <template #extra>
                    <button class="px-6 py-3 bg-brand hover:bg-brand-light text-white font-semibold rounded-xl transition-colors w-max flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-brand focus:outline-none">
                        <Info class="w-5 h-5" /> View Details
                    </button>
                </template>
            </ShowCard>
        </section>

        <ShowCarousel title="Currently Trending" :shows="dutchShows">
            <template #icon><TrendingUp class="w-5 h-5 text-pink-500" /></template>
        </ShowCarousel>

        <ShowCarousel title="Recommended in Romance" :shows="romanceShows">
            <template #icon><Heart class="w-5 h-5 text-red-500 fill-red-500/20" /></template>
        </ShowCarousel>

        <ShowCarousel title="New in Cooking" :shows="cookingShows">
            <template #icon><ChefHat class="w-5 h-5 text-orange-500" /></template>
        </ShowCarousel>
    </div>
</template>

<script setup>
import { Search, Star, PlayCircle, Info, TrendingUp, Heart, ChefHat, Sparkles } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import dutchShows from '~/data/dutch_shows.json'

const router = useRouter()
const searchQuery = ref('')
const isMagic = ref(false)

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    } else {
        router.push('/search')
    }
}

// Compute the filtered thematic carousels
const romanceShows = computed(() => dutchShows.filter(s => s.tags?.includes('Romance')))
const cookingShows = computed(() => dutchShows.filter(s => s.tags?.includes('Cooking')))

// Use the first show natively for the Recommended Hero banner
const heroShow = dutchShows[0]
</script>
