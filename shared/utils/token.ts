import { jwtDecode } from 'jwt-decode'

export const decodeJWT = (token: string): any => {
  if (!token) {
    return false
  }

  const decode = jwtDecode(token)
  if (import.meta.server) {
    return decode
  }

  try {
    const tokenDecode = decode && JSON.parse(JSON.stringify(decode))
    return tokenDecode
  } catch (e) {
    console.error(e)
    return false
  }
}
export const isAliveJWT = (token: string | null | undefined): boolean => {
  if (!token) {
    return false
  }

  try {
    const tokenDecode = decodeJWT(token)
    if (tokenDecode && tokenDecode.exp * 1000 > new Date().getTime()) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}