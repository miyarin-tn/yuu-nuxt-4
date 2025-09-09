import { createI18nInstance } from '../utils/i18n'

export default defineEventHandler((event) => {
  const lang = getHeader(event, 'Accept-Language')?.split(',')[0] || 'en'
  event.context.lang = lang
  // @ts-ignore
  event.context.i18n = createI18nInstance(lang)
})
