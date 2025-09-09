import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  const { id, email } = event.context.user
  const db = await getDb()
  const usersCollection = db.collection('users')
  const user = await usersCollection.findOne({ _id: new ObjectId(id), email })

  if (!user) {
    setResponseStatus(event, 404)
    return {
      // @ts-ignore
      error: event.context.i18n.global.t('CODE.NOT_FOUND'),
      // @ts-ignore
      message: event.context.i18n.global.t('MESSAGE.USER_NOT_FOUND'),
    }
  }

  return {
    id: user._id,
    email: user.email,
  }
})
