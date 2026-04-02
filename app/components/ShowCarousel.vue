<template>
    <section>
        <div class="flex items-center justify-between mb-4 mt-2">
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                <slot name="icon"></slot> {{ title }}
            </h2>
        </div>
        <div class="relative group">
            <button @click="scrollPrev" class="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-brand hover:border-brand z-20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer hidden sm:flex">
                <ChevronLeft class="w-6 h-6" />
            </button>

            <div ref="carouselRef" class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-2 px-2 scroll-smooth">
                <ShowCard v-for="show in infiniteShows" :key="show.uniqueKey" :show="show" layout="vertical" class="w-[85vw] sm:w-[400px] min-w-[85vw] sm:min-w-[400px] flex-shrink-0 snap-start" />
            </div>

            <button @click="scrollNext" class="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-brand hover:border-brand z-20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer hidden sm:flex">
                <ChevronRight class="w-6 h-6" />
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    shows: {
        type: Array,
        required: true
    }
})

// Create a virtually infinite array to allow seamless scrolling for thousands of pixels
const infiniteShows = computed(() => {
    const duplicated = []
    if (!props.shows || props.shows.length === 0) return []
    for (let i = 0; i < 50; i++) {
        props.shows.forEach((show, idx) => duplicated.push({ ...show, uniqueKey: i + '-' + show.id + '-' + idx }))
    }
    return duplicated
})

// Carousel Action Controllers directly scoped to this specific component instance
const carouselRef = ref(null)

const scrollNext = () => {
    if (carouselRef.value) carouselRef.value.scrollBy({ left: 424, behavior: 'smooth' }) // 400px card + 24px gap
}

const scrollPrev = () => {
    if (carouselRef.value) carouselRef.value.scrollBy({ left: -424, behavior: 'smooth' })
}
</script>
