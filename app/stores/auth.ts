export const useAuthStore = defineStore('auth', () => {
  // state
  const isAuthenticated = ref(false)
  const userInfo: Ref<User | null> = ref(null)
  const isRefreshingToken = ref(false)

  // action
  function setAuthenticate (isAuth: boolean) {
    isAuthenticated.value = isAuth
  }

  function setUserAuth (user: User | null) {
    userInfo.value = user
  }

  function setRefreshingToken (isRefreshing: boolean) {
    isRefreshingToken.value = isRefreshing
  }

  return {
    // state
    isAuthenticated,
    userInfo,
    isRefreshingToken,
    // action
    setAuthenticate,
    setUserAuth,
    setRefreshingToken,
  }
})
