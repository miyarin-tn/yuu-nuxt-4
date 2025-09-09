import * as argon2 from 'argon2'
import { getDb } from '../../utils/mongodb'
import { generateToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  if (!email || !password) {
    setResponseStatus(event, 400)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.BAD_REQUEST'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.USER_PARAMS_REQUIRED'),
    }
  }

  const db = await getDb()
  const usersCollection = db.collection('users')

  const user = await usersCollection.findOne({ email })
  if (!user) {
    setResponseStatus(event, 404)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.NOT_FOUND'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.USER_NOT_FOUND'),
    }
  }

  const isPasswordValid = await argon2.verify(user.password, password)
  if (!isPasswordValid) {
    setResponseStatus(event, 401)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.UNAUTHORIZED'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.USER_WRONG_EMAIL_PASSWORD'),
    }
  }

  const token = generateToken({ id: user._id, email: user.email })
  const { _id, password: _password, ...rest } = user

  return {
    ...token,
    user: { id: _id, ...rest },
  }
})

