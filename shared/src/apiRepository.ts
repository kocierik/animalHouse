import { Api } from './api'
import type * as user from './json/user'
import * as animal from './json/animal'
import type * as score from './json/Games'
import type * as product from './json/ProductMarked'
import type * as community from './json/Community'
import type * as review from './json/Review'
import { stringFormat } from './helpers'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _USERS_LOGIN = '/users/login'
const _USER_INFO = '/users/{0}'
const _USER_CURRENT = '/users/current'
const _USER_REGISTER = '/users/register'
const _USERS_SCORES = '/users/{0}/scores/'
const _USERS_ANIMALS = '/users/{0}/animals'
const _USERS_ANIMALS_DELETE = '/users/{0}/animals/{1}'
const _USER_PICTURE = '/users/{0}/picture'

const _ANIMAL_CODES = '/animals/codes'

const _COMMUNITY_GAME_SCOREBOARD = '/community/game/scoreboard'

const _PRODUCTS = '/products/'
const _PRODUCTS_REVIEW = '/products/{0}/reviews/'

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _USERS_LOGIN, { username: username, password: password })

export const getCurrentUser = async () =>
  Api.get<user.JsonAuthInfo>(_BASE_URL + _USER_CURRENT, true)

export const getUserInfoById = async (id: string) =>
  Api.get<user.JsonUser>(stringFormat(_BASE_URL + _USER_INFO, id))

export const register = async (registration: user.JsonRegistration) =>
  Api.post<user.JsonUser>(_BASE_URL + _USER_REGISTER, registration)

export const getAnimalCode = async () =>
  Api.get<{ code: number; value: String }[]>(_BASE_URL + _ANIMAL_CODES)

export const registerAnimal = async (registration: animal.JsonAnimal[], userId: string) =>
  Api.put<animal.JsonAnimal>(stringFormat(_BASE_URL + _USERS_ANIMALS, userId), registration, true)

export const deleteAnimal = async (userId: string, animalId: string) =>
  Api.delete<animal.JsonAnimal>(stringFormat(_BASE_URL + _USERS_ANIMALS_DELETE, userId, animalId), true)


export const putUserScore = async (gameScore: score.IGameResult, userId: string) =>
  Api.put<score.IGameScore>(stringFormat(_BASE_URL + _USERS_SCORES, userId), gameScore, true)

export const getUserScore = async () => Api.get<community.IGameValues[]>(_BASE_URL + _COMMUNITY_GAME_SCOREBOARD)

export const getMarketProducts = async () => Api.get<product.IProductMarked[]>(_BASE_URL + _PRODUCTS)

export const getMarketProduct = async (productId: string) =>
  Api.get<product.IProductMarked>(_BASE_URL + _PRODUCTS + productId)

export const getProductReviews = async (productId: string) =>
  Api.get<review.IReview[]>(stringFormat(_BASE_URL + _PRODUCTS_REVIEW, productId))

export const postProductReview = async (productId: string, review: review.IReview) =>
  Api.post<review.IReview>(stringFormat(_BASE_URL + _PRODUCTS_REVIEW, productId), review)

export const putUserPicture = (userId: string, image: string|Blob) => {
  const formdata = new FormData()
  formdata.append("profile", image, 'image.jpg')
  return Api.put<user.JsonPicture>(stringFormat(_BASE_URL + _USER_PICTURE, userId), formdata, true, false)
} 

// TODO insert here other calls!!!!
