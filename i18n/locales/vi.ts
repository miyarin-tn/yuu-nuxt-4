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
  email: 'Email',
  enter_email: 'Nhập email của bạn',
  enter_password: 'Nhập mật khẩu của bạn',
  password: 'Mật khẩu',
  login: 'Đăng nhập',
  invalid_email: 'Email không hợp lệ',
  password_length: 'Mật khẩu phải phải ít nhất {length} kí tự',
  success: 'Thành công',
  login_success: 'Đăng nhập thành công',

  server: {
    token_invalid: 'Token không hợp lệ',
  },
}
