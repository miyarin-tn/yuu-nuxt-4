import { verifyToken, generateToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const { refresh_token } = await readBody(event)

  if (!refresh_token) {
    setResponseStatus(event, 401)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.BAD_REQUEST'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.REFRESH_TOKEN_REQUIRED'),
    }
  }

  const payload = verifyToken(refresh_token, 'refresh')

  if (!payload) {
    setResponseStatus(event, 401)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.UNAUTHORIZED'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.INVALID_REFRESH_TOKEN'),
    }
  }

  // @ts-ignore
  const { id, email } = payload
  const token = generateToken({ id, email })

  return {
    ...token,
  }
})
