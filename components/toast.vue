<script setup lang="ts">
const { $toast } = useNuxtApp()

const toasts = $toast.toasts
</script>

<template>
  <div class="fixed bottom-10 right-10 flex flex-col gap-y-3">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'w-full max-w-md rounded-lg shadow-sm px-6 py-5',
        toast.type === 'error'
        ? 'bg-red-100'
        : toast.type === 'success'
        ? 'bg-green-100'
        : 'bg-gray-100'
      ]"
    >
      <p
        :class="[
          'text-sm',
          toast.type === 'error'
          ? 'text-red-700'
          : toast.type === 'success'
          ? 'text-green-700'
          : 'text-gray-700'
        ]"
      >
        {{ toast.message }}
      </p>
    </div>
  </div>
</template>