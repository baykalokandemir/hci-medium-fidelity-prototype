<template>
    <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-800 mb-8">Account Settings</h2>
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <form @submit.prevent="saveSettings" class="p-6 md:p-8 space-y-8">
                <section>
                    <h3 class="text-lg font-semibold border-b pb-2 mb-4 text-slate-700">Learning Profile</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Target Language</label>
                            <select class="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand">
                                <option selected>Dutch</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>German</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Current Proficiency</label>
                            <select class="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand">
                                <option>Absolute Beginner (A0)</option>
                                <option selected>Beginner (A1-A2)</option>
                                <option>Intermediate (B1-B2)</option>
                                <option>Advanced (C1-C2)</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 class="text-lg font-semibold border-b pb-2 mb-4 text-slate-700">Content Preferences</h3>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3"><input type="checkbox" checked class="w-4 h-4 text-brand rounded"><span class="text-slate-700">Show Dual Subtitles</span></label>
                        <label class="flex items-center gap-3"><input type="checkbox" checked class="w-4 h-4 text-brand rounded"><span class="text-slate-700">Enable Cultural Quizzes</span></label>
                        <label class="flex items-center gap-3"><input type="checkbox" class="w-4 h-4 text-brand rounded"><span class="text-slate-700">Highlight difficult vocabulary</span></label>
                    </div>
                </section>
                <div class="flex justify-end pt-4 border-t">
                    <button type="submit" class="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const saveSettings = () => {
    alert('Settings saved successfully!')
    router.push('/explore')
}
</script>
