export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:setup', () => {
    const { t } = useI18n()
    const route = useRoute()

    useHead(() => {
      if (route.name && route.name !== 'error') {
        return {
          titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} | ${t('welcome')}` : t('welcome')
          },
          meta: [
            { name: 'description', content: t('welcome') },
          ],
        }
      }
    })
  })
})
