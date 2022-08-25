import { Api } from './api'
import * as user from './json/user'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _AUTH = '/users/login'
const _ANIMAL_CODES = '/animals/codes'
const _USER_REGISTER = '/users/register'

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _AUTH, { username: username, password: password })

export const getAnimalCode = async () => Api.get<{ code: number; name: String }[]>(_BASE_URL + _ANIMAL_CODES)

export const register = async (registration: user.IJsonRegistration) => Api.post<string>(_BASE_URL + _USER_REGISTER, registration)

// TODO insert here other calls!!!!
