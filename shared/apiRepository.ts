import { Api, ApiResponse } from './api'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _AUTH = '/user/login'
const _ANIMAL_CODES = '/animals/'
const _REGISTER_CODES = '/register/'
const _SCORE_CODES = '/user/:id/score/'
// http://localhost:8080/v1/user/register

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _AUTH, { username: username, password: password })

export const getAnimalCode = async () => Api.get<{ code: number; name: String }[]>(_BASE_URL + _ANIMAL_CODES)
export const postUserRegister = async () => Api.post<{ code: number;  name: String }[]>(_BASE_URL + _REGISTER_CODES,  "")
export const putUserScore = async () => Api.post<{ code: number;  name: String }[]>(_BASE_URL + _SCORE_CODES,  "")

// TODO insert here other calls!!!!
