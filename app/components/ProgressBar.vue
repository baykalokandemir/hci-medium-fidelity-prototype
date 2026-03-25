<template>
    <div class="w-full relative pt-5 pb-1">
        <!-- Base Track -->
        <div class="w-full bg-slate-200 rounded-full overflow-hidden relative z-0" :class="height">
            <div class="h-full transition-all duration-500 absolute left-0 top-0 bottom-0" :class="color" :style="{ width: typeof percentage === 'number' ? percentage + '%' : percentage }"></div>
        </div>
        
        <!-- Markers Layer -->
        <div v-if="seasons && seasons > 1 && seasons < 10" class="absolute left-0 right-0 flex pointer-events-none z-10 bottom-1" :class="height">
            <div v-for="i in seasons" :key="i" class="relative h-full" :style="{ width: `${100 / seasons}%` }">
                <!-- Label centered above the segment -->
                <div class="absolute inset-x-0 bottom-full mb-1 flex justify-center text-[10px] font-black text-slate-400 tracking-wider">
                    S{{ i }}
                </div>
                
                <!-- The separating marker -->
                <div v-if="i < seasons" class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-[250%] bg-white border border-slate-300 rounded-full transform translate-x-1/2 shadow-sm"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    percentage: {
        type: [Number, String],
        required: true
    },
    height: {
        type: String,
        default: 'h-1.5'
    },
    color: {
        type: String,
        default: 'bg-brand'
    },
    seasons: {
        type: Number,
        default: 0
    }
})
</script>
