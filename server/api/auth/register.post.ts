import * as argon2 from 'argon2'
import { getDb } from '../../utils/mongodb'

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
  if (user) {
    setResponseStatus(event, 409)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.CONFLICT'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.USER_EMAIL_EXISTS'),
    }
  }

  const hashedPassword = await argon2.hash(password)
  const newUser = {
    email,
    password: hashedPassword,
  }
  const result = await usersCollection.insertOne(newUser)
  if (!result.acknowledged) {
    setResponseStatus(event, 500)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.INTERNAL_SERVER_ERROR'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.USER_CREATED_FAILED'),
    }
  }

  return {
    // @ts-ignore
    message: event.context.i18n.global.t('MESSAGE.USER_CREATED_SUCCESS'),
  }
})
