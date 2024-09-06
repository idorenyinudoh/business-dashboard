<template>
  <div class="min-h-screen p-10 flex flex-col">
    <h1 class="text-2xl text-primary font-semibold tracking-tight">!Payaza</h1>
    <div class="h-full p-6 m-auto">
      <slot />
      <Toast />
    </div>
  </div>
</template>