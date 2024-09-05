<script setup lang="ts">
import type { InputField } from '~/utils/types'

const props = defineProps<InputField>()

const passwordInputType = ref(props.type)
const togglePasswordInputType = () => {
  passwordInputType.value = passwordInputType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <label
      :for="name"
      class="w-max text-sm text-primary font-medium leading-none capitalize"
    >
      {{ name }}
    </label>
    <div v-if="type === 'password'" class="relative">
      <input
        :type="passwordInputType"
        :id="name"
        class="h-10 w-full rounded-md border px-3 pr-9 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        :placeholder="placeholder"
      />
      <img v-if="passwordInputType === 'password'" src="~/assets/icons/eye.svg" alt="show password" class="absolute right-3 top-3 w-4 h-4 cursor-pointer" @click="togglePasswordInputType">
      <img v-else src="~/assets/icons/eye-slash.svg" alt="hide password" class="absolute right-3 top-3 w-4 h-4 cursor-pointer" @click="togglePasswordInputType">
    </div>
    <input
      v-else
      :type="type"
      :id="name"
      class="h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
      :placeholder="placeholder"
    />
  </div>
</template>