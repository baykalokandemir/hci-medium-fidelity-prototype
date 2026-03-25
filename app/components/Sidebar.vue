<template>
  <aside 
    :class="[sidebarCollapsed ? 'w-20' : 'w-64', 'bg-surface border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 transition-all duration-300 z-50']"
  >
    <div class="p-6 flex items-center justify-between">
        <NuxtLink to="/explore" class="flex items-center gap-3 overflow-hidden cursor-pointer">
            <div class="w-8 h-8 flex-shrink-0 bg-brand rounded-lg flex items-center justify-center text-white">
                <Tv class="w-5 h-5" />
            </div>
            <h1 v-if="!sidebarCollapsed" class="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap">LinguaTV</h1>
        </NuxtLink>
        <button @click="toggleSidebar" :class="[sidebarCollapsed ? 'hidden' : 'block', 'text-slate-400 hover:text-slate-600 transition-colors']">
            <ChevronLeft class="w-5 h-5" />
        </button>
    </div>
    
    <button v-if="sidebarCollapsed" @click="toggleSidebar" class="mx-auto mb-4 text-slate-400 hover:text-slate-600 transition-colors">
        <ChevronRight class="w-5 h-5" />
    </button>

    <div v-if="!sidebarCollapsed" class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Home</div>
    <div v-else class="h-4"></div>
    
    <nav class="flex-1 px-3 space-y-1 overflow-y-auto hide-scrollbar">
        <NuxtLink to="/explore" :class="[route.path === '/explore' ? 'bg-indigo-50 text-brand' : 'text-slate-600 hover:bg-slate-50', 'w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="Explore">
            <Compass class="w-5 h-5 flex-shrink-0" />
            <span v-if="!sidebarCollapsed">Explore</span>
        </NuxtLink>
        <NuxtLink to="/search" :class="[route.path === '/search' ? 'bg-indigo-50 text-brand' : 'text-slate-600 hover:bg-slate-50', 'w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="Search Hub">
            <Search class="w-5 h-5 flex-shrink-0" />
            <span v-if="!sidebarCollapsed">Search Hub</span>
        </NuxtLink>

        <div v-if="!sidebarCollapsed" class="pt-6 pb-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">My Profile</div>
        <div v-else class="h-6"></div>
        
        <NuxtLink to="/progress" :class="[route.path === '/progress' ? 'bg-indigo-50 text-brand' : 'text-slate-600 hover:bg-slate-50', 'w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="Progress Overview">
            <BarChart2 class="w-5 h-5 flex-shrink-0" />
            <span v-if="!sidebarCollapsed">Progress Overview</span>
        </NuxtLink>
        <NuxtLink to="/reviews" :class="[route.path === '/reviews' ? 'bg-indigo-50 text-brand' : 'text-slate-600 hover:bg-slate-50', 'w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="My Reviews">
            <FileText class="w-5 h-5 flex-shrink-0" />
            <span v-if="!sidebarCollapsed">My Reviews</span>
        </NuxtLink>
        <NuxtLink to="/library" :class="[route.path.startsWith('/library') ? 'bg-indigo-50 text-brand' : 'text-slate-600 hover:bg-slate-50', 'w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="My Library">
            <Bookmark class="w-5 h-5 flex-shrink-0" />
            <span v-if="!sidebarCollapsed">My Library</span>
        </NuxtLink>
        
        <div v-if="!sidebarCollapsed" class="pl-11 pr-3 py-1 space-y-1">
            <button @click="navigateLibrary('watching')" :class="[libraryTab === 'watching' && route.path === '/library' ? 'text-brand font-bold' : 'text-slate-500', 'block w-full text-left text-xs hover:text-brand py-1']">Watching</button>
            <button @click="navigateLibrary('planToWatch')" :class="[libraryTab === 'planToWatch' && route.path === '/library' ? 'text-brand font-bold' : 'text-slate-500', 'block w-full text-left text-xs hover:text-brand py-1']">Plan to Watch</button>
            <button @click="navigateLibrary('completed')" :class="[libraryTab === 'completed' && route.path === '/library' ? 'text-brand font-bold' : 'text-slate-500', 'block w-full text-left text-xs hover:text-brand py-1']">Completed</button>
            <button @click="navigateLibrary('history')" :class="[libraryTab === 'history' && route.path === '/library' ? 'text-brand font-bold' : 'text-slate-500', 'block w-full text-left text-xs hover:text-brand py-1']">History</button>
        </div>
    </nav>

    <div class="p-4 border-t border-slate-200">
        <NuxtLink to="/settings" :class="['w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="My Account">
            <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User class="w-4 h-4" />
            </div>
            <span v-if="!sidebarCollapsed">My Account</span>
        </NuxtLink>
        <NuxtLink to="/login" :class="['w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2', sidebarCollapsed ? 'justify-center' : 'gap-3']" title="Log Out">
            <div class="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                <LogOut class="w-4 h-4" />
            </div>
            <span v-if="!sidebarCollapsed">Log Out</span>
        </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
import { Tv, ChevronLeft, ChevronRight, Compass, Search, BarChart2, FileText, Bookmark, User, LogOut } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

const { sidebarCollapsed, toggleSidebar, libraryTab } = useAppState()
const route = useRoute()
const router = useRouter()

const navigateLibrary = (tab) => {
    libraryTab.value = tab
    if (route.path !== '/library') {
        router.push('/library')
    }
}
</script>
