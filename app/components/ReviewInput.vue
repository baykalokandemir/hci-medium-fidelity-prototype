<template>
    <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
        <h3 class="font-semibold text-slate-800 mb-4">{{ title }}</h3>
        <div class="flex items-center gap-2 mb-3">
            <Star v-for="s in 5" :key="s" @click="currentRating = s" :class="[s <= currentRating ? 'fill-current text-yellow-500' : 'text-slate-300', 'w-6 h-6 hover:text-yellow-400 cursor-pointer transition-colors']" />
        </div>
        <textarea v-model="text" :placeholder="placeholder" class="w-full p-4 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand mb-4 h-24 resize-none bg-white"></textarea>
        <div class="flex justify-end">
            <button @click="submit" class="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors">Submit Review</button>
        </div>
    </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
    title: { type: String, default: 'Leave a Review' },
    placeholder: { type: String, default: 'How was the language level?' }
})

const emit = defineEmits(['submit'])

const currentRating = ref(0)
const text = ref('')

const submit = () => {
    emit('submit', { rating: currentRating.value, text: text.value })
    currentRating.value = 0
    text.value = ''
}
</script>
