<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div class="text-center mb-8">
                <div class="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    <Tv class="w-6 h-6" />
                </div>
                <h2 class="text-2xl font-bold text-slate-800">Create your account</h2>
                <p class="text-slate-500 mt-2 text-sm">Start learning a language through real TV today.</p>
            </div>
            <form @submit.prevent="handleSignup" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" placeholder="Jane Doe" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" placeholder="you@example.com" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Target Language</label>
                    <select class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all">
                        <option>Dutch</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                        <option>Portuguese</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input type="password" placeholder="Create a password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input type="password" placeholder="Repeat your password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <button type="submit" class="w-full bg-brand hover:bg-brand-dark text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
                    Create Account
                </button>
            </form>
            <div class="mt-6 text-center border-t border-slate-100 pt-6">
                <p class="text-sm text-slate-500">Already have an account?
                    <NuxtLink to="/login" class="text-brand font-medium hover:underline ml-1">Log in</NuxtLink>
                </p>
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

const handleSignup = () => {
    router.push('/explore')
}
</script>
