<template>
  <div>
    <div class="min-h-screen flex justify-center items-center">
      <div class="w-full max-w-md rounded-lg sm:border sm:shadow-sm p-6">
        <slot />
        <Toast />
      </div>
    </div>
  </div>
</template>