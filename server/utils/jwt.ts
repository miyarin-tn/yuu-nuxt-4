import jwt from 'jsonwebtoken'
import type ms from 'ms'

const { sign, verify } = jwt

const secret = process.env.JWT_SECRET || 'secret'
const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES || '1h') as ms.StringValue
const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES || '1d') as ms.StringValue

export function generateToken(payload: object) {
  return {
    access_token: sign({ ...payload, type: 'access' }, secret, {
      algorithm: 'HS256',
      expiresIn: accessExpiresIn,
    }),
    refresh_token: sign({ ...payload, type: 'refresh' }, secret, {
      algorithm: 'HS256',
      expiresIn: refreshExpiresIn,
    }),
  }
}

export function verifyToken(token: string, type: 'access' | 'refresh' = 'access') {
  try {
    const decoded = verify(token, secret, { algorithms: ['HS256'] }) as any
    if (decoded.type !== type) {
      return null
    }
    return decoded
  } catch (err) {
    return null
  }
}
