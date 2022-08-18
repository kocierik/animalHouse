import { Api } from './api'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _AUTH = '/user/login'
const _ANIMAL_CODES = '/animals/'

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _AUTH, { username: username, password: password })

export const getAnimalCode = async () => Api.get<{ code: number; name: String }[]>(_BASE_URL + _ANIMAL_CODES)

// TODO insert here other calls!!!!