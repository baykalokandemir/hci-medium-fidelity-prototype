<template>
    <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <BarChart2 class="w-8 h-8 text-slate-400" /> Progress Overview
            </h2>
            <div class="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-4 text-center">
                <div>
                    <Flame class="w-6 h-6 text-orange-500 mx-auto" />
                    <span class="text-xs font-bold text-slate-500">STREAK</span>
                </div>
                <div class="text-2xl font-black text-slate-800">14<span class="text-sm font-medium text-slate-400 ml-1">Days</span></div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-10">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Overall Language Proficiency</h3>
            <div class="relative pt-6">
                <div class="flex justify-between text-xs font-medium text-slate-400 mb-2 absolute top-0 w-full">
                    <span>Beginner</span><span>Elementary</span><span>Intermediate</span><span>Advanced</span>
                </div>
                <div class="h-4 bg-slate-100 rounded-full overflow-hidden flex relative">
                    <div class="h-full bg-brand w-[35%] z-10"></div>
                    <div class="absolute inset-0 flex">
                        <div class="h-full border-r border-slate-300 border-dashed w-[25%]"></div>
                        <div class="h-full border-r border-slate-300 border-dashed w-[25%]"></div>
                        <div class="h-full border-r border-slate-300 border-dashed w-[25%]"></div>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="text-xl font-bold text-slate-800 mb-6">Proficiency by Topic</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="topic in topics" :key="topic.title" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-brand transition-colors cursor-pointer">
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 bg-indigo-50 rounded-lg text-brand">
                        <component :is="topic.icon" class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-slate-700">{{ topic.title }}</span>
                </div>
                <ProgressBar :percentage="topic.progress" height="h-2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { BarChart2, Flame, Briefcase, Coffee, Award, Plane, Globe, Users } from 'lucide-vue-next'

const topics = [
    { title: "Office Talk",  icon: Briefcase, progress: 60 },
    { title: "Cooking",      icon: Coffee,    progress: 85 },
    { title: "Sports",       icon: Award,     progress: 30 },
    { title: "Travel",       icon: Plane,     progress: 45 },
    { title: "News & Events",icon: Globe,     progress: 20 },
    { title: "Family",       icon: Users,     progress: 70 },
]
</script>
