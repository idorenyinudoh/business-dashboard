<script setup lang="ts">
import type { InputField } from '~/utils/types'

definePageMeta({
  middleware: 'auth'
})

const inputFields = reactive<InputField[]>([
  {
    id: 'business-name',
    type: 'text',
    label: 'Business name',
    placeholder: 'Enter your business name'
  },
  {
    id: 'business-address',
    type: 'text',
    label: 'Business address',
    placeholder: 'Enter your business address'
  },
  {
    id: 'website',
    type: 'url',
    label: 'Business website',
    placeholder: 'https://www.example.com'
  },
  {
    id: 'business-license',
    type: 'file',
    label: 'Business license'
  },
  {
    id: 'tin',
    type: 'text',
    label: 'Tax Identification Number',
    placeholder: 'Enter your TIN'
  },
  {
    id: 'utility-bill',
    type: 'file',
    label: 'Utility bill'
  },
  {
    id: 'proof-of-address',
    type: 'file',
    label: 'Proof of address'
  }
])

const form = reactive({
  'business-name': '',
  'business-address': '',
  'website': '',
  'business-license': '',
  'tin': '',
  'utility-bill': '',
  'proof-of-address': ''
})

const formIsInvalid = computed(() => {
  return form['business-name'] === '' || form['business-address'] === '' || form.website === '' || form['business-license'] === '' || form.tin === '' || form['utility-bill'] === '' || form['proof-of-address'] === ''
})

const { $toast } = useNuxtApp()
const router = useRouter()

const submit = () => {
  const user = localStorage.getItem('user')!
  const userObj = JSON.parse(user)

  const completeUserObj = {...userObj, ...form}
  console.log(userObj, completeUserObj)

  localStorage.setItem('user', JSON.stringify(completeUserObj))
  $toast.addToast('Details uploaded successfully', 'success')
  router.push('/')
}
</script>

<template>
  <div>
    <div class="w-full max-w-3xl rounded-lg sm:border sm:shadow-sm p-6">
      <main class="flex flex-col gap-y-7">
        <div class="flex flex-col gap-y-1">
          <h1 class="text-2xl text-primary font-semibold tracking-tight">Business Onboarding</h1>
          <p class="text-sm">Please provide your business information and upload the required documents.</p>
        </div>
        <form class="flex flex-col gap-y-4" @submit.prevent="submit">
          <FormInput v-for="(field, index) in inputFields" :key="index" :="field" v-model="form[field.id as keyof typeof form]" />
          <FormButton text="Submit" class="mt-4" :disabled="formIsInvalid" />
          <p class="px-8 text-center text-sm">Sorry the form is a little long — we just need to be sure you're not a fraudster 🫵🏽</p>
        </form>
      </main>
    </div>
  </div>
</template>