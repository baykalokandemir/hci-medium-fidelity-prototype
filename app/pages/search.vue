<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-8">
            <Search class="w-8 h-8 text-slate-400" /> Search Hub
        </h2>

        <div class="flex gap-4 mb-8">
            <input type="text" placeholder="Search for shows, topics, or vocabulary..." class="flex-1 px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand outline-none shadow-sm">
            <button class="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors">Search</button>
        </div>

        <div class="mb-10">
            <p class="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Popular Filters</p>
            <div class="flex flex-wrap gap-2">
                <span class="px-4 py-1.5 bg-slate-800 text-white rounded-full text-sm cursor-pointer">Drama</span>
                <span class="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-slate-400 rounded-full text-sm cursor-pointer">Comedy</span>
                <span class="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-slate-400 rounded-full text-sm cursor-pointer">News</span>
                <span class="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-slate-400 rounded-full text-sm cursor-pointer">Beginner</span>
                <span class="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-slate-400 rounded-full text-sm cursor-pointer">Subtitled</span>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-8 border-b border-slate-200">
            <select class="px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none"><option>Genre</option></select>
            <select class="px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none"><option>Language Level</option></select>
            <select class="px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none"><option>Dialect</option></select>
            <select class="px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none"><option>Format</option></select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink v-for="i in 6" :key="i" to="/series" class="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group block">
                <div class="aspect-video relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                </div>
                <div class="p-4">
                    <div class="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'
</script>
