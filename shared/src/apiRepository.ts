import { Api } from './api'
import type { IGameValues } from './json/Community';
import type { IProductMarked } from './json/ProductMarked';

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _AUTH = '/user/login'
const _ANIMAL_CODES = '/animals/'
const _REGISTER_CODES = '/register/'
const _SCORE_CODES = '/user/:id/score/' 
const _LEADERBOARD_CODES = '/community/game/scoreboard' 
const _MARKET_PRODUCT_CODES = '/market/product/' 
// http://localhost:8080/v1/user/register 

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _AUTH, { username: username, password: password })

export const getAnimalCode = async () => Api.get<{ code: number; name: String }[]>(_BASE_URL + _ANIMAL_CODES)
export const postUserRegister = async () => Api.post<{ code: number;  name: String }[]>(_BASE_URL + _REGISTER_CODES,  "")
export const putUserScore = async () => Api.post<{ code: number;  name: String }[]>(_BASE_URL + _SCORE_CODES,  "")
export const getUserScore = async () => Api.get<IGameValues[]>(_BASE_URL + _LEADERBOARD_CODES)
export const getMarketProduct = async () => Api.get<IProductMarked[]>(_BASE_URL + _MARKET_PRODUCT_CODES)

// TODO insert here other calls!!!!
