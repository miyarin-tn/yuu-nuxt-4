export default defineI18nLocale(locale => {
  // fetch locale from API server
  // return $fetch(`/api/translations/${locale}`)
  // or
  // load locale from local file
  return Promise.resolve(vi)
})

const vi = {
  english: 'Tiếng Anh',
  vietnamese: 'Tiếng Việt',
  welcome: 'Chào mừng đến với Nuxt!',
  go_back_home: 'Quay lại trang chủ',
}
