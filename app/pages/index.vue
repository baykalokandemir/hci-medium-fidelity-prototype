<template>
  <div>Redirecting...</div>
</template>

<script setup>
import { navigateTo } from 'nuxt/app'

definePageMeta({
  middleware: [
    () => {
      return navigateTo('/explore')
    }
  ]
})
</script>
