<script setup lang="ts">
import type { InputField, NewUser } from '~/utils/types'

definePageMeta({
  layout: 'auth'
})

const inputFields: InputField[] = reactive([
  {
    id: 'first-name',
    type: 'text',
    label: 'First name',
    placeholder: 'Enter your first name'
  },
  {
    id: 'last-name',
    type: 'text',
    label: 'Last name',
    placeholder: 'Enter your last name'
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email address'
  },
  {
    id: 'cac',
    type: 'radio',
    label: 'Is your business registered with the CAC?',
    options: ['Yes', 'No']
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  }
])

const businessTypeField: InputField = {
  id: 'business-type',
  type: 'select',
  label: 'Business type',
  options: ['Sole proprietorship', 'Limited company']
}

const form = reactive<NewUser>({
  'first-name': '',
  'last-name': '',
  'email': '',
  'cac': '',
  'business-type': '',
  'password': ''
})

watch(form, () => {
  const indexOfBusinessTypeField = inputFields.findIndex(({ id }) => id === 'business-type')

  if (form.cac.toLowerCase() === 'yes') {
    if (indexOfBusinessTypeField < 0) {
      inputFields.splice(4, 0, businessTypeField)
    }
  } else {
    if (indexOfBusinessTypeField > 0) {
      inputFields.splice(indexOfBusinessTypeField, 1)
    }
  }
})

const formIsInvalid = computed(() => {
  let invalid = false

  if (form['first-name'] === '') invalid = true
  if (form['last-name'] === '') invalid = true
  if (form['email'] === '') invalid = true
  if (form.cac === '') invalid = true
  if (form.cac.toLowerCase() === 'yes') {
    if (form['business-type'] === '') invalid = true
  }
  if (form.password === '') invalid = true
  if (form.password.length < 10) invalid = true

  return invalid
})

const { $toast } = useNuxtApp()
const router = useRouter()

const submit = () => {
  const user: NewUser = {
    'first-name': form['first-name'],
    'last-name': form['last-name'],
    'email': form.email,
    'cac': form.cac,
    'business-type': form['business-type'],
    'password': form.password
  }

  const users = localStorage.getItem('users')

  if (users !== null) {
    const usersObj: NewUser[] = JSON.parse(users)
    const indexOfUser = usersObj.findIndex(({ email }) => email === user.email)

    if (indexOfUser < 0) {
      localStorage.setItem('users', JSON.stringify([...usersObj, user]))
      $toast.addToast('Account created successfully', 'success')
      router.push('/sign-in')
    } else {
      $toast.addToast('This user already exists', 'error')
    }
  }
}
</script>

<template>
  <main class="flex flex-col gap-y-7">
    <div class="flex flex-col gap-y-1">
      <h1 class="text-2xl text-primary font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm">Fill your details below to create your account.</p>
    </div>
    <form class="flex flex-col gap-y-4" @submit.prevent="submit">
      <FormInput v-for="(field, index) in inputFields" :key="index" :="field" v-model="form[field.id as keyof typeof form]"  />
      <FormButton text="Sign up" class="mt-4" :disabled="formIsInvalid" />
      <p class="px-8 text-center text-sm">Already have an account? <NuxtLink to="/sign-in" class="underline">Sign in</NuxtLink></p>
    </form>
  </main>
</template>
