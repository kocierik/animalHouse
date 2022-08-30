import { Api } from './api'
import * as user from './json/user'
import * as animal from './json/animal'
import * as community from './json/Community'
import { IProductMarked } from './json/ProductMarked'
import { stringFormat } from './helpers'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _AUTH = '/users/login'
const _ANIMAL_CODES = '/animals/codes'
const _USER_CURRENT = '/users/current'
const _USER_REGISTER = '/users/register'
const _ANIMAL_REGISTER = '/users/{0}/animals'
const _REGISTER_CODES = '/register/'
const _SCORE_CODES = '/user/:id/score/' 
const _LEADERBOARD_CODES = '/community/game/scoreboard' 
const _MARKET_PRODUCT_CODES = '/market/product/' 

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
export const postUserRegister = async () => Api.post<{ code: number;  name: String }[]>(_BASE_URL + _REGISTER_CODES,  "")
export const putUserScore = async () => Api.post<{ code: number;  name: String }[]>(_BASE_URL + _SCORE_CODES,  "")
export const getUserScore = async () => Api.get<community.IGameValues[]>(_BASE_URL + _LEADERBOARD_CODES)
export const getMarketProduct = async () => Api.get<IProductMarked[]>(_BASE_URL + _MARKET_PRODUCT_CODES)

// TODO insert here other calls!!!!
