<template>
    <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h4 class="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-brand" /> {{ title }}
        </h4>
        <ul class="space-y-4 text-sm">
            <li v-for="note in notes" :key="note.term" class="group">
                <div class="font-bold text-slate-700 mb-1 flex justify-between">
                    {{ note.term }} 
                    <PlusCircle class="w-4 h-4 text-slate-300 group-hover:text-brand cursor-pointer transition-colors" />
                </div>
                <div class="text-slate-500">{{ note.definition }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { BookOpen, PlusCircle } from 'lucide-vue-next'

defineProps({
    title: {
        type: String,
        default: 'Language Notes'
    },
    notes: {
        type: Array,
        required: true
    }
})
</script>
