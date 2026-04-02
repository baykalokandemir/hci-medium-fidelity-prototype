<template>
    <NuxtLink :to="computedTo" :class="[
        'bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow group block cursor-pointer overflow-hidden',
        layout === 'horizontal' ? 'p-4 flex flex-col sm:flex-row gap-6 items-center text-left' : 
        layout === 'hero' ? 'flex flex-col md:flex-row w-full min-h-[380px]' : 
        'flex flex-row aspect-[2/1]'
    ]">
        <!-- Image Container -->
        <div :class="[
            'relative overflow-hidden flex-shrink-0 bg-slate-100 flex flex-col items-center justify-center',
            layout === 'horizontal' ? 'w-full sm:w-48 aspect-video rounded-lg' : 
            layout === 'hero' ? 'w-full md:w-2/5 h-64 md:h-auto' :
            'w-1/3 h-full'
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
            layout === 'hero' ? 'flex-1 w-full md:w-3/5 p-6 sm:p-10 relative z-10 justify-center' :
            'w-2/3 h-full p-4 relative z-10 justify-between'
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
                <div v-if="show.progress !== undefined" class="mt-auto -mb-1">
                    <ProgressBar :percentage="show.progress" :color="progressColor" :seasons="show.seasons" />
                </div>
                <slot name="extra"></slot>
            </div>

            <!-- Hero Content -->
            <div v-else-if="layout === 'hero'" class="flex flex-col h-full justify-center">
                <h3 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 mb-2 leading-tight group-hover:text-brand transition-colors">{{ show.title }}</h3>
                
                <div class="flex items-center gap-2 mb-4">
                    <span v-if="show.lvl" class="px-2.5 py-1 bg-brand text-white text-[10px] md:text-xs font-bold rounded uppercase flex-shrink-0">{{ show.lvl }}</span>
                    <div v-if="show.tags" class="flex flex-wrap gap-1.5">
                        <span v-for="tag in show.tags" :key="tag" class="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] md:text-xs font-medium rounded whitespace-nowrap">{{ tag }}</span>
                    </div>
                </div>
                
                <div class="flex items-center gap-3 mb-3">
                    <span v-if="show.ratingWeb" class="flex items-center gap-1 text-xs font-bold text-slate-700 leading-none">
                        <Star class="w-4 h-4 text-yellow-500 fill-current" /> {{ show.ratingWeb }}
                    </span>
                    <span v-if="show.ratingImdb" class="text-[10px] font-black text-slate-900 bg-yellow-400 px-1.5 py-0.5 rounded leading-tight">
                        IMDb {{ show.ratingImdb }}
                    </span>
                </div>

                <p class="text-sm md:text-base text-slate-600 line-clamp-2 md:line-clamp-3 mb-5 leading-relaxed">{{ show.description || show.subtitle }}</p>

                <div v-if="show.recommendationReason" class="bg-yellow-50/80 border border-yellow-100 border-l-4 border-l-yellow-400 p-4 rounded-r-xl mb-6 shadow-sm">
                    <p class="text-sm text-slate-700 leading-relaxed font-medium">
                        <strong class="font-bold flex items-center gap-1.5 mb-1 text-yellow-600"><Sparkles class="w-4 h-4 text-yellow-500" /> Why we chose this for you:</strong>
                        {{ show.recommendationReason }}
                    </p>
                </div>
                
                <slot name="extra"></slot>
            </div>

            <!-- Default Content (1/3 & 2/3 Split) -->
            <div v-else class="flex flex-col h-full">
                <!-- Title & Ratings row -->
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-slate-800 text-xl leading-tight group-hover:text-brand transition-colors truncate pr-2">{{ show.title || 'Untitled Series' }}</h4>
                    <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span v-if="show.ratingWeb" class="flex items-center gap-1 text-xs font-bold text-slate-700 leading-none">
                            <Star class="w-3.5 h-3.5 text-yellow-500 fill-current" /> {{ show.ratingWeb }}
                        </span>
                        <span v-if="show.ratingImdb" class="text-[10px] font-black text-slate-900 bg-yellow-400 px-1.5 py-0.5 rounded leading-tight">
                            IMDb {{ show.ratingImdb }}
                        </span>
                    </div>
                </div>
                
                <!-- Tags & Difficulty -->
                <div class="flex items-center gap-2 mb-3 overflow-hidden">
                    <span v-if="show.lvl" class="px-2 py-0.5 bg-brand text-white text-xs font-bold rounded flex-shrink-0 uppercase">{{ show.lvl }}</span>
                    <div v-if="show.tags" class="flex gap-1.5 overflow-hidden">
                        <span v-for="tag in show.tags" :key="tag" class="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded whitespace-nowrap">{{ tag }}</span>
                    </div>
                </div>
                
                <!-- Description -->
                <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">{{ show.description || show.subtitle }}</p>
                
                <div class="mt-auto self-end flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-brand border border-brand/30 bg-indigo-50/50 hover:bg-indigo-50 hover:border-brand/50 rounded-lg transition-all w-max shadow-sm">
                    <Info class="w-3.5 h-3.5" /> View Details
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Star, Sparkles, ImageOff, Info } from 'lucide-vue-next'

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
