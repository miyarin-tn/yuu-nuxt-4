export default defineI18nLocale(locale => {
  // fetch locale from API server
  // return $fetch(`/api/translations/${locale}`)
  // or
  // load locale from local file
  return Promise.resolve(en)
})

const en = {
  english: 'English',
  vietnamese: 'Vietnamese',
  go_back_home: 'Go back home',
}
