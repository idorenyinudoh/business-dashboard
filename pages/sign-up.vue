<script setup lang="ts">
import type { InputField } from '~/utils/types'

definePageMeta({
  layout: 'auth'
})

const inputFields: InputField[] = [
  {
    type: 'text',
    name: 'First name',
    placeholder: 'Enter your first name'
  },
  {
    type: 'text',
    name: 'Last name',
    placeholder: 'Enter your last name'
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email address'
  },
  {
    type: 'radio',
    name: 'Is your business registered with the CAC?',
    options: ['Yes', 'No']
  },
  {
    type: 'select',
    name: 'Business type',
    options: ['Sole proprietorship', 'Limited company']
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password'
  }
]
</script>

<template>
  <main class="flex flex-col gap-y-7">
    <div class="flex flex-col gap-y-1">
      <h1 class="text-2xl text-primary font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm">Fill your details below to create your account.</p>
    </div>
    <form class="flex flex-col gap-y-4" @submit.prevent="">
      <FormInput v-for="(field, index) in inputFields" :key="index" :="field" />
      <FormButton text="Sign up" class="mt-4" />
      <p class="px-8 text-center text-sm">Already have an account? <NuxtLink to="/sign-in" class="underline">Sign in</NuxtLink></p>
    </form>
  </main>
</template>
