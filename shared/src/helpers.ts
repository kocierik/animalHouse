import { SERVER_URL } from "./apiRepository"

export const stringFormat = (str: string, ...args: string[]) =>
  str.replace(/{(\d+)}/g, (match, number) => (typeof args[number] != 'undefined' ? args[number] : match))

export enum Project {
  GAME,
  FRONTOFFICE
}

// LOCAL STORAGE
export const LS_PersonalAnimals = 'PersonalAnimals'
export const LS_AuthToken = 'token'
export const LS_UserId = 'userId'

export const doLogin = (token: string) => localStorage.setItem(LS_AuthToken, token)

export const isLogged = (): boolean => localStorage.getItem(LS_AuthToken) !== null

export const doLogout = () => localStorage.removeItem(LS_AuthToken)

export const setUserId = (userId: string) => localStorage.setItem(LS_UserId, userId)

export const getUserId = (): string | null => localStorage.getItem(LS_UserId)

export const getImagePath = (fileName: string) => SERVER_URL + '/pictures/' + fileName
