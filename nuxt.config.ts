// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Import css: https://nuxt.com/docs/4.x/api/nuxt-config#css
  css: ['~/assets/css/bases.css', '~/assets/scss/styles.scss'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  // i18n config: https://i18n.nuxtjs.org/docs/getting-started/usage
  i18n: {
    strategy: 'no_prefix', // routing strategies: https://i18n.nuxtjs.org/docs/guide#no_prefix
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.ts' },
      { code: 'vi', name: 'Vietnamese', file: 'vi.ts' },
    ],
  },
  // add collection iconify to server bundler: https://github.com/nuxt/icon?tab=readme-ov-file#iconify-dataset
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },
  // Dev server config: https://nuxt.com/docs/4.x/api/nuxt-config#devserver
  devServer: {
    // https://nuxt.com/docs/4.x/api/nuxt-config#port
    port: Number(process.env.APP_PORT || 3000),
  },
})
