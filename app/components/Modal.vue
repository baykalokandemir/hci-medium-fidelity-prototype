<template>
  <div v-if="saveListModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" @click="closeSaveListModal">
    <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-sm mx-4" @click.stop>
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Bookmark class="w-5 h-5 text-brand" /> Save to Library
        </h3>
        <button @click="closeSaveListModal" class="text-slate-400 hover:text-slate-600 transition-colors">
            <X class="w-5 h-5" />
        </button>
      </div>
      <p class="text-sm text-slate-500 mb-4">Select the lists you want to add this to:</p>
      <div class="space-y-3 mb-6">
          <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-200">
              <input type="checkbox" checked class="w-4 h-4 accent-indigo-600 rounded">
              <div>
                  <div class="font-medium text-slate-800 text-sm">Watching</div>
                  <div class="text-xs text-slate-400">Currently watching this series</div>
              </div>
          </label>
          <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-200">
              <input type="checkbox" class="w-4 h-4 accent-indigo-600 rounded">
              <div>
                  <div class="font-medium text-slate-800 text-sm">Plan to Watch</div>
                  <div class="text-xs text-slate-400">Save for later</div>
              </div>
          </label>
          <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-200">
              <input type="checkbox" class="w-4 h-4 accent-indigo-600 rounded">
              <div>
                  <div class="font-medium text-slate-800 text-sm">Completed</div>
                  <div class="text-xs text-slate-400">Mark as finished</div>
              </div>
          </label>
      </div>
      <div class="flex gap-3">
          <button @click="closeSaveListModal" class="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
          <button @click="closeSaveListModal" class="flex-1 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bookmark, X } from 'lucide-vue-next'
const { saveListModal, closeSaveListModal } = useAppState()
</script>
