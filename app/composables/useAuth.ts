import { API_ROUTES } from '~/constants/api-routes'
import { jwtDecode } from 'jwt-decode'
import { AUTH_ACCESS_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '~/constants/config'
import { FetchError } from 'ofetch'
import { refresh } from '~/services/user'

export function useAuthorize(dataLogin: UserLoginResponse) {
  let accessTokenCookie, refreshTokenCookie
  const accessTokenDecode = jwtDecode(dataLogin.access_token)
  const refreshTokenDecode = jwtDecode(dataLogin.refresh_token)
  if (accessTokenDecode?.exp) {
    accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY, {
      expires: new Date(accessTokenDecode.exp * 1000),
    })
    accessTokenCookie.value = dataLogin.access_token
  }
  if (refreshTokenDecode?.exp) {
    refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY, {
      expires: new Date(refreshTokenDecode.exp * 1000),
    })
    refreshTokenCookie.value = dataLogin.refresh_token
  }
  const authStore = useAuthStore()
  authStore.setUserAuth(dataLogin.user)
  authStore.setAuthenticate(true)
}

export async function useCheckAndRefreshToken(fromRequest = false, checkedOnlyAliveRefreshToken = false) {
  let accessTokenCookie = {
    value: '',
  }
  let refreshTokenCookie = {
    value: '',
  }
  accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
  refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
  if (fromRequest || checkedOnlyAliveRefreshToken || (!isAliveJWT(accessTokenCookie.value) && isAliveJWT(refreshTokenCookie.value))) {
    try {
      const res = await refresh(refreshTokenCookie.value as string)
      const accessTokenDecode = jwtDecode(res.access_token)
      const refreshTokenDecode = jwtDecode(res.refresh_token)
      accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY, {
        // @ts-ignore
        expires: new Date(accessTokenDecode.exp * 1000),
      })
      accessTokenCookie.value = res.access_token
      refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY, {
        // @ts-ignore
        expires: new Date(refreshTokenDecode.exp * 1000),
      })
      refreshTokenCookie.value = res.refresh_token
      return res
    } catch (error) {
      if (error instanceof FetchError) {
        if (error?.statusCode === 401) {
          const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
          accessTokenCookie.value = undefined
          const refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
          refreshTokenCookie.value = undefined
        }
        throw error
      }
    }
  } else if (isAliveJWT(accessTokenCookie.value) && isAliveJWT(refreshTokenCookie.value)) {
    return {
      access_token: accessTokenCookie.value as string,
      refresh_token: refreshTokenCookie.value as string,
    }
  } else if (refreshTokenCookie.value && !isAliveJWT(refreshTokenCookie.value)) {
    const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
    accessTokenCookie.value = undefined
    const refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
    refreshTokenCookie.value = undefined
    const { t } = useI18n()
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: t('server.token_invalid'),
    })
  }
}

export async function usePutInQueueAndRefresh({
  requestUrl,
  keepAwaitIn = 200,
  maxLoopCounter = 1000,
}: {
  requestUrl: string
  keepAwaitIn?: number
  maxLoopCounter?: number
}) {
  const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
  const refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
  if (
    !isAliveJWT(accessTokenCookie.value) &&
    isAliveJWT(refreshTokenCookie.value) &&
    (!requestUrl.includes(API_ROUTES.AUTH_REFRESH) && !requestUrl.includes(API_ROUTES.AUTH_LOGIN))
  ) {
    const authStore = useAuthStore()
    // is any other requesting API is refreshing token?
    if (!authStore.isRefreshingToken) {
      // set the other requesting is waiting
      authStore.setRefreshingToken(true)
      try {
        // check and refresh token if necessary
        const res = await useCheckAndRefreshToken(!!requestUrl, true)
        // clear waiting
        authStore.setRefreshingToken(false)
        return res
      } catch (error) {
        // clear waiting
        authStore.setRefreshingToken(false)
        throw error
      }
    }

    // return immediately if keepAwaitIn = 0
    if (!keepAwaitIn) {
      return
    }

    // the other requesting API is refreshing token, just waiting here.
    const isLoopChecking = async (ms: number, count: number): Promise<void> => {
      if (count > maxLoopCounter) {
        return
      }

      // check refreshing token and waiting
      if (authStore.isRefreshingToken) {
        await new Promise(resolve => setTimeout(resolve, ms))
        return isLoopChecking(ms, count + 1)
      }
    }
    await isLoopChecking(keepAwaitIn, 0)
  }
}

export function useLogout() {
  const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
  const refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
  accessTokenCookie.value = undefined
  refreshTokenCookie.value = undefined
  const authStore = useAuthStore()
  authStore.setAuthenticate(false)
  authStore.setUserAuth(null)
}
