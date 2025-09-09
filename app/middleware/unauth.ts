import { APP_ROUTES } from '~/constants/app-routes'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return navigateTo(APP_ROUTES.HOME)
  }
})
