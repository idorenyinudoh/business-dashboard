<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button
    class="w-full h-10 rounded-md px-4 py-2 text-sm font-medium bg-primary text-secondary outline-none focus-visible:ring disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-primary/80 transition-colors"
  >
    {{ text }}
  </button>
</template>