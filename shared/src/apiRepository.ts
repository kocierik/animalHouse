import { Api } from './api'
import * as user from './json/user'
import * as animal from './json/animal'
import { stringFormat } from './helpers'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _AUTH = '/users/login'
const _ANIMAL_CODES = '/animals/codes'
const _USER_CURRENT = '/users/current'
const _USER_REGISTER = '/users/register'
const _ANIMAL_REGISTER = '/users/{0}/animals'

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _AUTH, { username: username, password: password })

export const getCurrentUser = async () => 
  Api.get<user.JsonAuthInfo>(_BASE_URL + _USER_CURRENT, true)

export const register = async (registration: user.JsonRegistration) =>
  Api.post<user.JsonUser>(_BASE_URL + _USER_REGISTER, registration)

export const getAnimalCode = async () =>
  Api.get<{ code: number; value: String }[]>(_BASE_URL + _ANIMAL_CODES)

export const registerAnimal = async (registration: animal.JsonAnimal[], userId: string) => 
  Api.put<animal.JsonAnimal>(stringFormat(_BASE_URL + _ANIMAL_REGISTER, userId), registration, true)

// TODO insert here other calls!!!!
