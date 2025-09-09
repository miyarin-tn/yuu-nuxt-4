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
  welcome: 'Welcome to Nuxt!',
  go_back_home: 'Go back home',
  email: 'Email',
  enter_email: 'Enter your email',
  password: 'Password',
  enter_password: 'Enter your password',
  login: 'Login',
  invalid_email: 'Invalid email',
  password_length: 'Must be at least {length} characters',
  success: 'Success',
  login_success: 'Login successful',

  server: {
    token_invalid: 'Invalid token',
  },
}
