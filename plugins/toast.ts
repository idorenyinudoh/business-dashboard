export default defineNuxtPlugin((nuxtApp) => {
  const toasts = ref<{ message: string; type: string; id: number }[]>([])

  const addToast = (message: string, type = 'info') => {
    const id = Date.now()
    toasts.value.push({ message, type, id })

    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  nuxtApp.provide('toast', {
    addToast,
    toasts,
  })
})
