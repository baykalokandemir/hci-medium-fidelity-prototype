<template>
    <div class="max-w-4xl mx-auto pb-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-8">Account Settings</h2>
        
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <form @submit.prevent="saveSettings" class="p-6 md:p-10 space-y-10">
                
                <!-- 1. Learning Profile -->
                <section>
                    <h3 class="text-xl font-bold border-b pb-3 mb-6 text-slate-800">Learning Profile</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Target Language</label>
                            <select v-model="form.language" @change="onLanguageChange" class="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand text-slate-700 bg-slate-50">
                                <option value="" disabled>Select language...</option>
                                <option v-for="lang in Object.keys(languages)" :key="lang" :value="lang">{{ lang }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2" :class="{ 'opacity-50': !form.language }">Dialect / Accent</label>
                            <select v-model="form.dialect" :disabled="!form.language" class="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand disabled:opacity-50 text-slate-700 bg-slate-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select dialect...</option>
                                <option v-for="d in dialectsForLang" :key="d" :value="d">{{ d }}</option>
                            </select>
                        </div>
                    </div>

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
                </section>

                <!-- 2. Topics of Interest -->
                <section>
                    <h3 class="text-xl font-bold border-b pb-3 mb-6 text-slate-800">Topics of Interest <span class="text-slate-400 font-normal text-sm ml-2">(Select up to 5)</span></h3>
                    <div class="relative mb-4">
                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" v-model="tagSearch" placeholder="Search topics (e.g. History, Casual Conversation)..." class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand text-sm">
                    </div>
                    <div class="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                        <button 
                            v-for="tag in filteredTags" 
                            :key="tag" 
                            type="button"
                            @click="toggleTag(tag)"
                            :class="[
                                form.tags.includes(tag) 
                                    ? 'bg-brand text-white border-brand shadow-sm' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand hover:text-brand',
                                'px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200'
                            ]"
                        >
                            {{ form.tags.includes(tag) ? '✓ ' : '' }}{{ tag }}
                        </button>
                    </div>
                </section>

                <!-- 3. Hard Mode -->
                <section>
                    <h3 class="text-xl font-bold border-b pb-3 mb-6 text-slate-800">Application Mode</h3>
                    <div class="bg-rose-50 border border-rose-200 p-5 rounded-2xl">
                        <label class="flex items-start gap-4 cursor-pointer group">
                            <div class="mt-0.5">
                                <input type="checkbox" v-model="form.hardMode" class="w-6 h-6 text-rose-600 border-rose-300 rounded focus:ring-rose-500 accent-rose-600 cursor-pointer">
                            </div>
                            <div>
                                <span class="block text-lg font-black text-rose-700 group-hover:text-rose-800 transition-colors mb-1">Enable Hard Mode</span>
                                <span class="block text-sm text-rose-600/90 leading-relaxed font-medium">Warning: This instantly translates the entire app interface, menus, and all content descriptions entirely into your Target Language. Recommended only for intermediate learners or above.</span>
                            </div>
                        </label>
                    </div>
                </section>

                <!-- 4. Security Configuration -->
                <section>
                    <h3 class="text-xl font-bold border-b pb-3 mb-6 text-slate-800">Security</h3>
                    <div class="space-y-5 max-w-lg">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                            <input type="password" v-model="form.passCurrent" placeholder="Enter current password" class="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand bg-slate-50">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                            <input type="password" v-model="form.passNew" placeholder="Enter new password" class="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand bg-slate-50">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                            <input type="password" v-model="form.passConfirm" placeholder="Re-enter new password" class="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand bg-slate-50">
                        </div>
                    </div>
                </section>

                <!-- Submit Action -->
                <div class="pt-6 border-t border-slate-200 flex justify-end">
                    <button type="submit" class="px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base">Save All Changes</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'

const form = ref({
    language: 'Spanish',
    dialect: 'Mexican',
    proficiency: 45,
    tags: ['Drama', 'Casual Conversation'],
    hardMode: false,
    passCurrent: '',
    passNew: '',
    passConfirm: ''
})

// --- Language & Dialect Model ---
const languages = {
    "Spanish": ["Standard (Spain)", "Mexican", "Argentine", "Colombian", "Neutral Latin American"],
    "French": ["Standard (France)", "Quebecois", "Belgian", "Swiss"],
    "English": ["American (General)", "British (RP)", "Australian", "Irish", "Scottish"],
    "Japanese": ["Standard (Tokyo)", "Kansai-ben", "Kyushu"],
    "Dutch": ["Standard Dutch", "Flemish (Belgium)"],
    "German": ["Standard (Hochdeutsch)", "Austrian", "Swiss German"],
    "Italian": ["Standard (Florence)", "Roman", "Milanese", "Neapolitan"]
}

const dialectsForLang = computed(() => form.value.language ? languages[form.value.language] : [])

const onLanguageChange = () => {
    form.value.dialect = dialectsForLang.value.length > 0 ? dialectsForLang.value[0] : ''
}

// --- Proficiency Visual Model ---
const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const currentLevelLabel = computed(() => {
    const bucket = Math.min(5, Math.floor(form.value.proficiency / (100 / 6)))
    return cefrLevels[bucket]
})

const currentColor = computed(() => {
    const hue = 120 - (form.value.proficiency * 1.2)
    return `hsl(${Math.max(0, hue)}, 85%, 45%)`
})

// --- Tag Cloud Model ---
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
        if (form.value.tags.length < 5) form.value.tags.push(tag)
    } else {
        form.value.tags.splice(index, 1)
    }
}

// --- Submit Action ---
const saveSettings = () => {
    if (form.value.passNew && form.value.passNew !== form.value.passConfirm) {
        alert("New passwords do not match!")
        return
    }
    alert("Settings saved successfully!")
    form.value.passCurrent = ''
    form.value.passNew = ''
    form.value.passConfirm = ''
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
