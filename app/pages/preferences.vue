<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
        <div class="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div class="p-8 md:p-12">
                <!-- Header -->
                <div class="text-center mb-10">
                    <h1 class="text-3xl font-black text-slate-800 mb-3">Tailor Your Experience</h1>
                    <p class="text-slate-500">Tell us what you want to learn and we'll curate the perfect content for you.</p>
                </div>

                <form @submit.prevent="finishOnboarding" class="space-y-8">
                    <!-- 1. Language & Dialect Container -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Target Language</label>
                            <select v-model="form.language" @change="onLanguageChange" required class="w-full px-5 py-3.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-all text-slate-700 font-medium">
                                <option value="" disabled>Select a language...</option>
                                <option v-for="lang in Object.keys(languages)" :key="lang" :value="lang">{{ lang }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2" :class="{ 'opacity-50': !form.language }">Dialect / Accent</label>
                            <select v-model="form.dialect" :disabled="!form.language" required class="w-full px-5 py-3.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-all text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select dialect...</option>
                                <option v-for="dialect in dialectsForLang" :key="dialect" :value="dialect">{{ dialect }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- 2. Proficiency Slider -->
                    <div>
                        <div class="flex justify-between items-end mb-2">
                            <label class="block text-sm font-bold text-slate-700">Current Proficiency</label>
                            <span class="font-black px-3 py-1 rounded-lg text-sm text-white shadow-sm transition-colors duration-200" :style="{ backgroundColor: currentColor }">{{ currentLevelLabel }}</span>
                        </div>
                        <div class="relative pt-2 pb-6">
                            <input 
                                type="range" 
                                v-model="form.proficiency" 
                                min="0" max="100" 
                                class="w-full h-2 rounded-lg appearance-none cursor-pointer custom-slider"
                                :style="{ '--slider-color': currentColor, '--slider-progress': form.proficiency + '%' }"
                            >
                            <div class="flex justify-between text-xs font-bold text-slate-400 absolute w-full mt-3">
                                <span :class="{'text-green-500': form.proficiency < 16}">A1</span>
                                <span :class="{'text-lime-500': form.proficiency >= 16 && form.proficiency < 33}">A2</span>
                                <span :class="{'text-yellow-500': form.proficiency >= 33 && form.proficiency < 50}">B1</span>
                                <span :class="{'text-orange-500': form.proficiency >= 50 && form.proficiency < 66}">B2</span>
                                <span :class="{'text-red-500': form.proficiency >= 66 && form.proficiency < 83}">C1</span>
                                <span :class="{'text-rose-700': form.proficiency >= 83}">C2</span>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Tags Multi-select -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-2">Topics of Interest <span class="text-slate-400 font-normal">(Select up to 5)</span></label>
                        
                        <!-- Search Box -->
                        <div class="relative mb-3">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" v-model="tagSearch" placeholder="Search topics (e.g. Comedy, Slang, History)..." class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-all text-sm">
                        </div>

                        <!-- Tag Cloud -->
                        <div class="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50/50">
                            <button 
                                v-for="tag in filteredTags" 
                                :key="tag" 
                                type="button"
                                @click="toggleTag(tag)"
                                :class="[
                                    form.tags.includes(tag) 
                                        ? 'bg-brand text-white border-brand shadow-md transform scale-105' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-brand hover:text-brand',
                                    'px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200'
                                ]"
                            >
                                {{ form.tags.includes(tag) ? '✓ ' : '' }}{{ tag }}
                            </button>
                            <div v-if="filteredTags.length === 0" class="text-sm text-slate-400 p-3 italic">
                                No topics found matching "{{ tagSearch }}"
                            </div>
                        </div>
                    </div>

                    <!-- Submit -->
                    <div class="pt-4 mt-8 border-t border-slate-100 flex justify-end">
                        <button type="submit" class="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-lg w-full md:w-auto">
                            Complete Setup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

definePageMeta({
    layout: false 
})

const router = useRouter()

const form = ref({
    language: '',
    dialect: '',
    proficiency: 25,
    tags: []
})

// Language & Dialect Data
const languages = {
    "Spanish": ["Standard (Spain)", "Mexican", "Argentine", "Colombian", "Neutral Latin American"],
    "French": ["Standard (France)", "Quebecois", "Belgian", "Swiss"],
    "English": ["American (General)", "British (RP)", "Australian", "Irish", "Scottish"],
    "Japanese": ["Standard (Tokyo)", "Kansai-ben", "Kyushu"],
    "Dutch": ["Standard Dutch", "Flemish (Belgium)"],
    "German": ["Standard (Hochdeutsch)", "Austrian", "Swiss German"],
    "Italian": ["Standard (Florence)", "Roman", "Milanese", "Neapolitan"]
}

const dialectsForLang = computed(() => {
    return form.value.language ? languages[form.value.language] : []
})

const onLanguageChange = () => {
    // Auto-select the first dialect so there isn't an invalid state
    if (dialectsForLang.value.length > 0) {
        form.value.dialect = dialectsForLang.value[0]
    } else {
        form.value.dialect = ''
    }
}

// Proficiency logic
const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const currentLevelLabel = computed(() => {
    const bucket = Math.min(5, Math.floor(form.value.proficiency / (100 / 6)))
    return cefrLevels[bucket]
})

// Dynamically compute HSL color from Green (120) to Red (0)
const currentColor = computed(() => {
    const hue = 120 - (form.value.proficiency * 1.2)
    return `hsl(${Math.max(0, hue)}, 85%, 45%)`
})

// Tags logic
const allTags = [
    "Drama", "Comedy", "Action", "Romance", "Thriller", "Horror", "Documentary", "Sci-Fi", 
    "News", "Politics", "Economy", "History", "Science", "Technology",
    "Casual Conversation", "Workplace/Business", "Slang/Idioms", "Academic",
    "Grammar Focus", "Listening Practice", "Reading Practice",
    "Cooking", "Travel", "Sports", "Music", "Art", "Pop Culture"
]

const tagSearch = ref('')

const filteredTags = computed(() => {
    if (!tagSearch.value) return allTags
    return allTags.filter(t => t.toLowerCase().includes(tagSearch.value.toLowerCase()))
})

const toggleTag = (tag) => {
    const index = form.value.tags.indexOf(tag)
    if (index === -1) {
        if (form.value.tags.length < 5) {
            form.value.tags.push(tag)
        }
    } else {
        form.value.tags.splice(index, 1)
    }
}

const finishOnboarding = () => {
    router.push('/explore')
}
</script>

<style scoped>
.custom-slider {
  background: linear-gradient(to right, var(--slider-color) var(--slider-progress), #e2e8f0 var(--slider-progress));
}
.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: var(--slider-color);
  cursor: pointer;
  margin-top: -8px; 
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 4px solid white;
  transition: background 0.1s;
}
.custom-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  border-radius: 9999px;
}
</style>
