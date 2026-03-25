<template>
    <div class="flex h-screen bg-background text-slate-800 font-sans antialiased overflow-hidden">
        <Sidebar />
        <main :class="['flex-1 overflow-y-auto p-8 relative transition-all duration-300 h-full w-full', sidebarCollapsed ? 'ml-20' : 'ml-64']">
            <slot />
        </main>
        <Modal />
    </div>
</template>

<script setup>
const { sidebarCollapsed } = useAppState()
</script>
