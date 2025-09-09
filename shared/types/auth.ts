import type { User } from './user.type'

export type Credential = {
  accessToken: string
  refreshToken: string
}

export type UserLoginPayload = {
  email: string
  password: string
}

export type CredentialResponse = {
  access_token: string
  refresh_token: string
}

export type UserLoginResponse = CredentialResponse & {
  user: User
}
