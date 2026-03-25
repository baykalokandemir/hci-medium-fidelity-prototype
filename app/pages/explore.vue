<template>
    <div class="max-w-5xl mx-auto space-y-10">
        <!-- Top Search Bar -->
        <form @submit.prevent="handleSearch" class="flex gap-4 max-w-2xl">
            <div class="relative flex-1">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input v-model="searchQuery" type="text" placeholder="Search shows, vocabulary, or culture..." class="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand outline-none">
            </div>
            <button type="submit" class="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors shadow-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">Search</button>
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
                    <button class="px-6 py-3 border-2 border-slate-200 hover:border-brand hover:text-brand bg-white text-slate-800 font-semibold rounded-xl transition-colors w-max flex items-center gap-2">
                        <Info class="w-5 h-5" /> View Details
                    </button>
                </template>
            </ShowCard>
        </section>

        <!-- Trending Carousel -->
        <section>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <TrendingUp class="w-5 h-5 text-pink-500" /> Currently Trending
            </h2>
            <div class="relative group">
                <!-- Prev Navigation -->
                <button @click="scrollPrev" class="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-brand hover:border-brand z-20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer hidden sm:flex">
                    <ChevronLeft class="w-6 h-6" />
                </button>

                <!-- Scroll Window -->
                <div ref="carouselRef" class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-2 px-2 scroll-smooth">
                    <ShowCard v-for="show in infiniteShows" :key="show.uniqueKey" :show="show" layout="vertical" class="w-[280px] min-w-[280px] flex-shrink-0 snap-start" />
                </div>

                <!-- Next Navigation -->
                <button @click="scrollNext" class="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-brand hover:border-brand z-20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer hidden sm:flex">
                    <ChevronRight class="w-6 h-6" />
                </button>
            </div>
        </section>
    </div>
</template>

<script setup>
import { Search, Star, PlayCircle, Info, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import dutchShows from '~/data/dutch_shows.json'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    } else {
        router.push('/search')
    }
}

// Use the first show natively for the Recommended Hero banner
const heroShow = dutchShows[0]

// Create a virtually infinite array to allow seamless scrolling for thousands of pixels
const infiniteShows = computed(() => {
    const duplicated = []
    for (let i = 0; i < 50; i++) {
        dutchShows.forEach(show => duplicated.push({ ...show, uniqueKey: i + '-' + show.id }))
    }
    return duplicated
})

// Carousel Action Controllers
const carouselRef = ref(null)

const scrollNext = () => {
    if (carouselRef.value) carouselRef.value.scrollBy({ left: 304, behavior: 'smooth' }) // 280px card + 24px flex gap (gap-6)
}

const scrollPrev = () => {
    if (carouselRef.value) carouselRef.value.scrollBy({ left: -304, behavior: 'smooth' })
}
</script>
