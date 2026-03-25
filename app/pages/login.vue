<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div class="text-center mb-8">
                <div class="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    <Tv class="w-6 h-6" />
                </div>
                <h2 class="text-2xl font-bold text-slate-800">Welcome to LinguaTV</h2>
                <p class="text-slate-500 mt-2 text-sm">Learn a new language through local culture and television.</p>
            </div>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" value="learner@example.com" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input type="password" value="password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <button type="submit" class="w-full bg-brand hover:bg-brand-dark text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
                    Log In
                </button>
            </form>
            <div class="mt-6 text-center border-t border-slate-100 pt-6">
                <p class="text-sm text-slate-500">Don't have an account?</p>
                <NuxtLink to="/signup" class="block mt-3 w-full border border-brand text-brand hover:bg-indigo-50 font-medium py-2.5 rounded-lg transition-colors text-center">
                    Sign Up
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Tv } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const handleLogin = () => {
    router.push('/explore')
}
</script>
