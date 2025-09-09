import { getMe } from '~/services/user'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()
  try {
    const userToken = await useCheckAndRefreshToken()
    if (userToken) {
      authStore.setAuthenticate(true)
      const user = await getMe()
      authStore.setUserAuth(user)
    }
  } catch (error) {
    authStore.setAuthenticate(false)
    authStore.setUserAuth(null)
  }
})
