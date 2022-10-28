export const stringFormat = (str: string, ...args: string[]) =>
  str.replace(/{(\d+)}/g,
    (match, number) => typeof args[number] != 'undefined' ? args[number] : match
  )

// LOCAL STORAGE
export const LS_PersonalAnimals = 'PersonalAnimals'
export const LS_AuthToken = 'token'
export const LS_UserId = 'userId'

export const doLogin = (token: string) => localStorage.setItem(LS_AuthToken, token)

export const isLogged = (): boolean => localStorage.getItem(LS_AuthToken) !== null

export const doLogout = () => localStorage.removeItem(LS_AuthToken)

export const setUserId = (userId: string) => localStorage.setItem(LS_UserId, userId)

export const getUserId = (): string => localStorage.getItem(LS_UserId)
