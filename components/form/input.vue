<script setup lang="ts">
import type { InputField } from '~/utils/types'

const props = defineProps<InputField>()

const model = defineModel()

const passwordInputType = ref(props.type)
const togglePasswordInputType = () => {
  passwordInputType.value = passwordInputType.value === 'password' ? 'text' : 'password'
}

const selectedRadioOptionIndex = ref()
watch(selectedRadioOptionIndex, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    model.value = props.options ? props.options[selectedRadioOptionIndex.value] : ''
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <label
      :for="id"
      class="w-fit text-sm text-primary font-medium leading-none"
    >
      {{ label }}
    </label>

    <div v-if="type === 'password'">
      <div
        class="relative"
      >
        <input
          :type="passwordInputType"
          :id="id"
          class="h-10 w-full rounded-md border px-3 pr-9 py-2 text-sm text-primary outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          :placeholder="placeholder"
          v-model="model"
        />
        <img
          v-if="passwordInputType === 'password'"
          src="~/assets/icons/eye.svg"
          alt="show password"
          class="absolute right-3 top-3 w-4 h-4 cursor-pointer"
          @click="togglePasswordInputType"
        >
        <img
          v-else src="~/assets/icons/eye-slash.svg"
          alt="hide password"
          class="absolute right-3 top-3 w-4 h-4 cursor-pointer"
          @click="togglePasswordInputType"
        >
      </div>
      <p class="text-xs mt-1">Password should have at least 10 characters.</p>
    </div>

    <div
      v-else-if="type === 'radio'"
      class="flex gap-x-2"
    >
      <button
        v-for="(option, index) in options"
        :key="index"
        :class="['w-full h-10 rounded-md px-4 py-2 text-sm font-medium transition-colors', index === selectedRadioOptionIndex ? 'text-secondary bg-text-primary/80' : 'text-primary/70 bg-text-primary/10 hover:bg-text-primary/20']"
        type="button"
        @click="selectedRadioOptionIndex = index"
      >
        {{ option }}
      </button>
    </div>

    <div
      v-else-if="type === 'select'"
      class="relative flex gap-x-2"
    >
      <select
        :id="id"
        class="appearance-none h-10 w-full rounded-md border px-3 pr-9 py-2 text-sm text-primary outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        v-model="model"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.toLowerCase().split(' ').join('-')"
        >
          {{ option }}
        </option>
      </select>
      <img
        src="~/assets/icons/chevron-down.svg"
        alt="select"
        class="absolute right-3 top-3 w-4 h-4 pointer-events-none"
      >
    </div>

    <input
      v-else
      :type="type"
      :id="id"
      class="h-10 w-full rounded-md border px-3 py-2 text-sm text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
      :placeholder="placeholder"
      v-model="model"
    />
  </div>
</template>