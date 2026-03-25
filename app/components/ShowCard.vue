<template>
    <NuxtLink :to="computedTo" :class="[
        'bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow group block cursor-pointer overflow-hidden',
        layout === 'horizontal' ? 'p-4 flex flex-col sm:flex-row gap-6 items-center text-left' : 
        layout === 'hero' ? 'flex flex-col md:flex-row w-full min-h-[380px]' : 
        'flex flex-col h-[420px]'
    ]">
        <!-- Image Container -->
        <div :class="[
            'relative overflow-hidden flex-shrink-0 bg-slate-100 flex flex-col items-center justify-center',
            layout === 'horizontal' ? 'w-full sm:w-48 aspect-video rounded-lg' : 
            layout === 'hero' ? 'w-full md:w-1/2 h-64 md:h-auto' :
            'h-2/3 w-full'
        ]">
            <img v-if="!imageError" :src="show.img" @error="imageError = true" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0">
            <div v-if="imageError" class="flex flex-col items-center justify-center text-slate-400 z-0 p-4">
                <ImageOff class="w-8 h-8 mb-1.5 opacity-40" />
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-50 text-center">Picture Not Available</span>
            </div>
            <div class="relative z-10 w-full h-full pointer-events-none">
                <slot name="image-overlay"></slot>
            </div>
        </div>
        
        <!-- Content Container -->
        <div :class="[
            'bg-white flex flex-col',
            layout === 'horizontal' ? 'flex-1 w-full' : 
            layout === 'hero' ? 'flex-1 w-full md:w-1/2 p-6 sm:p-10 relative z-10 justify-center' :
            'h-1/3 w-full p-4 relative z-10 justify-between'
        ]">
            <!-- Horizontal Content -->
            <div v-if="layout === 'horizontal'" class="flex flex-col h-full">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="text-lg font-bold text-slate-800 group-hover:text-brand transition-colors mb-1">{{ show.title }}</h4>
                        <p v-if="show.subtitle" class="text-sm text-slate-500">{{ show.subtitle }}</p>
                    </div>
                    <slot name="badge"></slot>
                </div>
                <ProgressBar v-if="show.progress !== undefined" :percentage="show.progress" :color="progressColor" class="mt-auto" />
                <slot name="extra"></slot>
            </div>

            <!-- Hero Content -->
            <div v-else-if="layout === 'hero'" class="flex flex-col h-full justify-center">
                <div class="flex items-center gap-2 mb-4">
                    <span v-if="show.lvl" class="px-2.5 py-1 bg-brand text-white text-[10px] md:text-xs font-bold rounded uppercase flex-shrink-0">{{ show.lvl }}</span>
                    <div v-if="show.tags" class="flex flex-wrap gap-1.5">
                        <span v-for="tag in show.tags" :key="tag" class="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] md:text-xs font-medium rounded whitespace-nowrap">{{ tag }}</span>
                    </div>
                </div>
                
                <h3 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 mb-2 leading-tight group-hover:text-brand transition-colors">{{ show.title }}</h3>
                
                <div class="flex items-center gap-3 mb-3">
                    <span v-if="show.ratingWeb" class="flex items-center gap-1 text-xs font-bold text-slate-700 leading-none">
                        <Star class="w-4 h-4 text-yellow-500 fill-current" /> {{ show.ratingWeb }}
                    </span>
                    <span v-if="show.ratingImdb" class="text-[10px] font-black text-slate-900 bg-yellow-400 px-1.5 py-0.5 rounded leading-tight">
                        IMDb {{ show.ratingImdb }}
                    </span>
                </div>

                <p class="text-sm md:text-base text-slate-600 line-clamp-2 md:line-clamp-3 mb-5 leading-relaxed">{{ show.description || show.subtitle }}</p>

                <div v-if="show.recommendationReason" class="bg-indigo-50/80 border border-indigo-100 border-l-4 border-l-brand p-4 rounded-r-xl mb-6 shadow-sm">
                    <p class="text-sm text-slate-700 leading-relaxed font-medium">
                        <strong class="font-bold flex items-center gap-1.5 mb-1 text-brand"><Sparkles class="w-4 h-4 text-brand" /> Why we chose this for you:</strong>
                        {{ show.recommendationReason }}
                    </p>
                </div>
                
                <slot name="extra"></slot>
            </div>

            <!-- Vertical / Grid Content (2/3 & 1/3 Split) -->
            <div v-else class="flex flex-col h-full">
                <!-- Top row: Tags & Difficulty -->
                <div class="flex items-center gap-2 mb-2 overflow-hidden">
                    <span v-if="show.lvl" class="px-2 py-0.5 bg-brand text-white text-[10px] font-bold rounded flex-shrink-0 uppercase">{{ show.lvl }}</span>
                    <div v-if="show.tags" class="flex gap-1 overflow-hidden">
                        <span v-for="tag in show.tags" :key="tag" class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded whitespace-nowrap">{{ tag }}</span>
                    </div>
                </div>
                
                <!-- Title & Ratings row -->
                <div class="flex justify-between items-start mb-1">
                    <h4 class="font-bold text-slate-800 text-base leading-tight group-hover:text-brand transition-colors truncate pr-2">{{ show.title || 'Untitled Series' }}</h4>
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                        <span v-if="show.ratingWeb" class="flex items-center gap-1 text-[10px] font-bold text-slate-700 leading-none">
                            <Star class="w-2.5 h-2.5 text-yellow-500 fill-current" /> {{ show.ratingWeb }}
                        </span>
                        <span v-if="show.ratingImdb" class="text-[9px] font-black text-slate-900 bg-yellow-400 px-1 rounded leading-tight">
                            IMDb {{ show.ratingImdb }}
                        </span>
                    </div>
                </div>
                
                <!-- Description -->
                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-auto">{{ show.description || show.subtitle }}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Star, Sparkles, ImageOff } from 'lucide-vue-next'

const imageError = ref(false)

const props = defineProps({
    show: {
        type: Object,
        required: true
    },
    layout: {
        type: String,
        default: 'horizontal' // horizontal, vertical, or hero
    },
    to: {
        type: String,
        default: '/series'
    },
    progressColor: {
        type: String,
        default: 'bg-brand'
    }
})

const computedTo = computed(() => {
    if (props.to && props.to !== '/series') return props.to
    return props.show?.id ? `/series/${props.show.id}` : '/series'
})
</script>
