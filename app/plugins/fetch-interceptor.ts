export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // create instance fetch with interceptor
  const customFetch = $fetch.create({
    onRequest({ request, options }) {
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
    },
    // onRequestError({ request, options, error }) {},
    // onResponse({ request, response, options }) {},
    // onResponseError({ request, response, options }) {},
  })

  // overwrite global $fetch
  globalThis.$fetch = customFetch
})
