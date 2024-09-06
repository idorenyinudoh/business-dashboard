<script setup lang="ts">
import type { InputField } from '~/utils/types'

definePageMeta({
  layout: 'auth'
})

const inputFields = reactive<InputField[]>([
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email address'
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  }
])

const form = reactive({
  email: '',
  password: ''
})

const formIsInvalid = computed(() => {
  return form.email === '' || form.password === '' || form.password.length < 10
})

const { $toast } = useNuxtApp()
const router = useRouter()

const submit = () => {
  const users = localStorage.getItem('users')

  if (users === null) {
    $toast.addToast('Account does not exist.', 'error')
  } else {
    const usersObj: NewUser[] = JSON.parse(users)
    const indexOfUser = usersObj.findIndex(({ email }) => email === form.email)

    if (indexOfUser < 0) {
      $toast.addToast('Account does not exist', 'error')
    } else if (usersObj[indexOfUser].password !== form.password) {
      $toast.addToast('Incorrect password', 'error')
    } else {
      $toast.addToast('Signed in successfully.', 'success')
      localStorage.setItem('user', JSON.stringify(usersObj[indexOfUser]))
      router.push('/')
    }
  }
}
</script>

<template>
  <main class="flex flex-col gap-y-7">
    <div class="flex flex-col gap-y-1">
      <h1 class="text-2xl text-primary font-semibold tracking-tight">Login</h1>
      <p class="text-sm">Enter your email and password to login to your account.</p>
    </div>
    <form class="flex flex-col gap-y-4" @submit.prevent="submit">
      <FormInput v-for="(field, index) in inputFields" :key="index" :="field" v-model="form[field.id as keyof typeof form]" />
      <FormButton text="Sign in" class="mt-4" :disabled="formIsInvalid" />
      <p class="px-8 text-center text-sm">Don't have an account? <NuxtLink to="/sign-up" class="underline">Sign up</NuxtLink></p>
    </form>
  </main>
</template>