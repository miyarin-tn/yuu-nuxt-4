import { verifyToken } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // only apply for api with prefix path /api
  if (!path.startsWith('/api') || path.includes('_nuxt')) {
    return
  }

  // apply auth middleware except auth and public path
  if (path.startsWith('/api/auth') || path.startsWith('/api/public')) {
    return
  }

  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader) {
    setResponseStatus(event, 401)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.UNAUTHORIZED'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.INVALID_ACCESS_TOKEN'),
    }
  }

  const token = authHeader.replace('Bearer ', '')
  const decoded = verifyToken(token)

  if (!decoded) {
    setResponseStatus(event, 401)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.UNAUTHORIZED'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.INVALID_ACCESS_TOKEN'),
    }
  }

  event.context.user = decoded
})
