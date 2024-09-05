<script setup lang="ts">
import type { InputField } from '~/utils/types'

const inputFields: InputField[] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email address'
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password'
  }
]
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <main class="w-full max-w-md rounded-lg sm:border sm:shadow-sm p-6 flex flex-col gap-y-7">
      <div class="flex flex-col gap-y-1">
        <h1 class="text-2xl text-primary font-semibold tracking-tight">Login</h1>
        <p class="text-sm">Enter your email and password to login to your account.</p>
      </div>
      <form class="flex flex-col gap-y-4" @submit.prevent="">
        <FormInput v-for="(field, index) in inputFields" :key="index" :="field" />
        <FormButton text="Sign in" class="mt-4" />
        <p class="px-8 text-center text-sm">Don't have an account? <NuxtLink to="/sign-up" class="underline">Sign up</NuxtLink></p>
      </form>
    </main>
  </div>
</template>