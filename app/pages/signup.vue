<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative">
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
                    <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input type="password" placeholder="Create a password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input type="password" placeholder="Repeat your password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all" required>
                </div>

                <div class="flex items-start gap-3 mt-4">
                    <input type="checkbox" id="tos" v-model="agreedToTos" class="mt-1 w-4 h-4 text-brand rounded border-slate-300 focus:ring-brand cursor-pointer">
                    <label for="tos" class="text-sm text-slate-600 cursor-pointer leading-tight">
                        I have read and agree to the <span @click.prevent="showTosModal = true" class="text-brand font-bold hover:underline">Terms and Services</span> before signing up.
                    </label>
                </div>

                <button type="submit" :disabled="!agreedToTos" class="w-full bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors mt-4">
                    Create Account
                </button>
            </form>

            <div class="mt-6 text-center border-t border-slate-100 pt-6">
                <p class="text-sm text-slate-500">Already have an account?
                    <NuxtLink to="/login" class="text-brand font-medium hover:underline ml-1">Log in</NuxtLink>
                </p>
            </div>
        </div>

        <!-- ToS Modal -->
        <div v-if="showTosModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showTosModal = false"></div>
            
            <!-- Modal Window -->
            <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
                <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 class="text-xl font-bold text-slate-800">Terms and Services</h3>
                    <button @click="showTosModal = false" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                        <X class="w-5 h-5" />
                    </button>
                </div>
                
                <div class="p-6 overflow-y-auto flex-1 text-slate-600 text-sm leading-relaxed space-y-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                    <p>Pellentesque id nibh tortor id aliquet lectus proin. Nunc scelerisque viverra mauris in aliquam sem. Feugiat nisl pretium fusce id velit. Vulputate odio ut enim blandit volutpat. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus.</p>
                </div>
                
                <div class="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
                    <button @click="showTosModal = false" class="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                    <button @click="agreeAndClose" class="px-6 py-2.5 bg-brand text-white font-medium rounded-xl hover:bg-brand-dark transition-colors shadow-sm">I Agree</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Tv, X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const agreedToTos = ref(false)
const showTosModal = ref(false)

const agreeAndClose = () => {
    agreedToTos.value = true
    showTosModal.value = false
}

const handleSignup = () => {
    if (agreedToTos.value) {
        router.push('/preferences')
    }
}
</script>
