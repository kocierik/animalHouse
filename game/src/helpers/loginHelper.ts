import { AuthToken } from '@/helpers/localStoreHelper'

export const doLogin = (token: string) => {
  localStorage.setItem(AuthToken, token)
}

export const isLogged = () => {
  return localStorage.getItem(AuthToken)
}

export const logout = () => {
  localStorage.removeItem(AuthToken)
}
