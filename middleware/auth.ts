export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return

  const user = localStorage.getItem('user')
  const userObj = JSON.parse(user as string)

  if (to.path.startsWith('/') && user === null) {
    return navigateTo('/sign-in')
  }

  if (to.path === '/' && (userObj['business-address'] === undefined || userObj['business-address'] === '' || userObj['business-address'] === null)) {
    return navigateTo('/onboarding')
  }
})