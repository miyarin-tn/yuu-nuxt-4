import { APP_ROUTES } from '~/constants/app-routes'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && to.path !== APP_ROUTES.LOGIN) {
    return navigateTo(APP_ROUTES.LOGIN)
  }
})
