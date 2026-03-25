<template>
    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-200" :class="{ 'opacity-50 pointer-events-none': disabled }">
        <div class="flex justify-between mb-4">
            <span class="text-xs font-bold text-slate-400 uppercase">{{ title }}</span>
            <span class="text-xs font-bold text-brand">{{ questionNumber }}</span>
        </div>
        <p class="font-medium text-slate-700 mb-5">{{ question }}</p>
        
        <!-- Binary / True-False Layout -->
        <div v-if="options.length === 2" class="grid grid-cols-2 gap-4">
            <button v-for="(opt, idx) in options" :key="idx" 
                    @click="emit('answer', opt)"
                    :class="[
                        selected === opt ? 'border-brand bg-indigo-50 text-brand' : 'border-slate-200 hover:bg-slate-50 text-slate-600',
                        'p-3 border font-medium rounded-lg flex items-center justify-center gap-2 transition-colors'
                    ]">
                <component v-if="opt.icon" :is="opt.icon" class="w-4 h-4" />
                {{ opt.text || opt }}
            </button>
        </div>
        
        <!-- Multiple Choice Layout -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button v-for="(opt, idx) in options" :key="idx"
                    @click="emit('answer', opt)"
                    :class="[
                        selected === opt ? 'border-brand bg-indigo-50 text-brand' : 'border-slate-200 hover:bg-slate-50',
                        'p-3 border rounded-lg text-left text-slate-700 transition-colors'
                    ]">
                {{ opt.text || opt }}
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    questionNumber: String,
    question: String,
    options: {
        type: Array,
        required: true
    },
    disabled: Boolean,
    selected: [String, Object]
})

const emit = defineEmits(['answer'])
</script>
