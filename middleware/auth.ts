export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return

  const user = localStorage.getItem('user')

  if (to.path.startsWith('/') && user === null) {
    return navigateTo('/sign-in')
  }
})