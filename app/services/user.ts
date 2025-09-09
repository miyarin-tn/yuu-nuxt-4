import { API_ROUTES } from '~/constants/api-routes'

export function login(data: UserLoginPayload): Promise<UserLoginResponse> {
  return $fetch(API_ROUTES.AUTH_LOGIN, {
    method: 'post',
    body: data,
  })
}

export async function refresh(token: string): Promise<CredentialResponse> {
  return $fetch(API_ROUTES.AUTH_REFRESH, {
    method: 'post',
    body: { refresh_token: token },
  })
}

export async function getMe(): Promise<User> {
  return $fetch(API_ROUTES.USER_ME)
}
