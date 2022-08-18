const AuthToken = "token"

export const doLogin = (token: string) => {
  localStorage.setItem(AuthToken, token)
}

export const isLogged = () => {
  return localStorage.getItem(AuthToken) !== null
}

export const doLogout = () => {
  localStorage.removeItem(AuthToken)
}
