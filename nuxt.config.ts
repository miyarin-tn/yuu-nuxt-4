// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Import css: https://nuxt.com/docs/4.x/api/nuxt-config#css
  css: ['~/assets/scss/styles.scss'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  // Dev server config: https://nuxt.com/docs/4.x/api/nuxt-config#devserver
  devServer: {
    // https://nuxt.com/docs/4.x/api/nuxt-config#port
    port: Number(process.env.APP_PORT || 3000),
  },
})
