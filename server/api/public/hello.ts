export default defineEventHandler((event) => {
  return {
    // @ts-ignore
    message: event.context.i18n.global.t('welcome')
  }
})
