import { AUTH_ACCESS_TOKEN_KEY } from '~/constants/config'
import { FetchError } from 'ofetch'
import { APP_ROUTES } from '~/constants/app-routes'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // create instance fetch with interceptor
  const customFetch = $fetch.create({
    async onRequest({ request, options }) {
      if (typeof request === 'string' && request.startsWith('/_')) {
        return
      }
      if (
        typeof request === 'string' &&
        (request.startsWith('http') || request.startsWith('/api'))
      ) {
        options.baseURL = '/'
      } else {
        options.baseURL = config.public.apiBaseUrl
      }
      const languageCode = useCookie('i18n_redirected').value
      const headers = new Headers(options.headers)
      if (languageCode) {
        headers.set('Accept-Language', languageCode)
      }
      options.headers = headers

      const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)

      if (import.meta.client) {
         
        try {
          const res = await usePutInQueueAndRefresh({
            requestUrl: request.toString(),
          })
          // token was expired & refreshed token successfully.
          if (res) {
            // only set headers Authorization if request to API.
            headers.set('Authorization', `Bearer ${res.access_token}`)
          } else if (isAliveJWT(accessTokenCookie.value)) {
            headers.set('Authorization', `Bearer ${accessTokenCookie.value}`)
          }
        } catch (error) {
          if (error instanceof FetchError) {
            if (error?.statusCode === 401) {
              useLogout()
              navigateTo(APP_ROUTES.LOGIN)
            }
          }
          throw error
        }
         
      } else if (isAliveJWT(accessTokenCookie.value)) {
        // keep the same header if nothing changed
        headers.set('Authorization', `Bearer ${accessTokenCookie.value}`)
      }
    },
    // onRequestError({ request, options, error }) {},
    // onResponse({ request, response, options }) {},
    onResponseError({ request, response, options }) {
      if (response.status === 401) {
        useLogout()
        navigateTo(APP_ROUTES.LOGIN)
      }
    },
  })

  // overwrite global $fetch
  globalThis.$fetch = customFetch
})
