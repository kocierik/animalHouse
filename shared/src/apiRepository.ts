import { Api } from './api'
import type * as user from './json/user'
import type * as animal from './json/animal'
import type * as score from './json/Games'
import type * as product from './json/ProductMarked'
import type * as community from './json/Community'
import type * as review from './json/Review'
import type * as cart from "./json/Cart"
import type * as order from './json/Orders'
import type * as reservation from "./json/Reservation"
import type * as location from "./json/Location"
import { stringFormat } from './helpers'

// Server api urls
const _BASE_URL = 'http://localhost:8080/v1'
const _USERS_LOGIN = '/users/login'
const _USER_INFO = '/users/{0}'
const _USER_CURRENT = '/users/current'
const _USER_REGISTER = '/users/register'
const _USER_UPDATE_DESCRIPTION = '/users/{0}/description'
const _USERS_SCORES = '/users/{0}/scores/' 
const _USERS_ANIMALS = '/users/{0}/animals'
const _USERS_ANIMALS_DELETE = '/users/{0}/animals/{1}'
const _USERS_ANIMALS_EDIT = '/users/{0}/animals/{1}'
const _USER_PICTURE = '/users/{0}/picture'
const _USER_ANIMAL_PICTURE = '/users/{0}/animals/{1}/picture'
const _USER_CART = '/users/{0}/cart'
const _USER_ORDERS = '/users/{0}/orders'

const _RESERVATIONS = '/users/{0}/reservations'
const _RESERVATIONS_DELETE = '/reservations/{0}'
const _LOCATION = '/locations'
const _PICTURES = '/pictures/{0}'

const _ANIMAL_CODES = '/animals/codes'

const _COMMUNITY_GAME = '/community/game'
const _COMMUNITY_GAME_SCOREBOARD = '/community/game/scoreboard'

const _PRODUCTS = '/products/'
const _PRODUCTS_CATEGORY = '/products/category/{0}'
const _PRODUCTS_CATEGORIES_NAME = '/products/categories'
const _PRODUCTS_REVIEW = '/products/{0}/reviews/'
const _PRODUCTS_REVIEWS_SUM_UP = '/products/{0}/reviews/sum-up'

export const login = async (username: string, password: string) =>
  Api.post<any>(_BASE_URL + _USERS_LOGIN, { username: username, password: password })

export const getCurrentUser = async () =>
  Api.get<user.JsonAuthInfo>(_BASE_URL + _USER_CURRENT, true)

export const getUserInfoById = async (id: string) =>
  Api.get<user.JsonUser>(stringFormat(_BASE_URL + _USER_INFO, id))

export const getPicture = async (id: string) =>
  Api.getImage(stringFormat(_BASE_URL + _PICTURES, id))

export const register = async (registration: user.JsonRegistration) =>
  Api.post<user.JsonUser>(_BASE_URL + _USER_REGISTER, registration)

export const getAnimalCode = async () =>
  Api.get<{ code: number; value: String }[]>(_BASE_URL + _ANIMAL_CODES)

export const registerAnimal = async (registration: animal.JsonAnimal, userId: string) =>
  Api.put<animal.JsonAnimal>(stringFormat(_BASE_URL + _USERS_ANIMALS, userId), registration, true)

export const deleteAnimal = async (userId: string, animalId: string) =>
  Api.delete<animal.JsonAnimal>(stringFormat(_BASE_URL + _USERS_ANIMALS_DELETE, userId, animalId), true)

export const editAnimal = async (userId: string, animalId: string, animal: animal.JsonAnimal) =>
  Api.put<animal.JsonAnimal>(stringFormat(_BASE_URL + _USERS_ANIMALS_EDIT, userId, animalId), animal, true)


export const putUserScore = async (gameScore: score.IGameResult, userId: string) =>
  Api.put<score.IGameScore>(stringFormat(_BASE_URL + _USERS_SCORES, userId), gameScore, true)

export const getUserScore = async () => Api.get<community.IGameValues[]>(_BASE_URL + _COMMUNITY_GAME_SCOREBOARD)
export const getGames = async () => Api.get<community.IGame[]>(_BASE_URL + _COMMUNITY_GAME)

export const getMarketProducts = async () => Api.get<product.IProductMarked[]>(_BASE_URL + _PRODUCTS)

export const getMarketProduct = async (productId: string) =>
  Api.get<product.IProductMarked>(_BASE_URL + _PRODUCTS + productId)

export const getProductCategory = async (categoryId: string) =>
  Api.get<string>(stringFormat(_BASE_URL + _PRODUCTS_CATEGORY, categoryId))

export const getProductCategoriesName = async () =>
  Api.get<product.IProductCategory[]>(_BASE_URL + _PRODUCTS_CATEGORIES_NAME)


export const getProductReviews = async (productId: string) =>
  Api.get<review.IReview[]>(stringFormat(_BASE_URL + _PRODUCTS_REVIEW, productId))

export const postProductReview = async (productId: string, review: review.IReview) =>
  Api.post<review.IReview>(stringFormat(_BASE_URL + _PRODUCTS_REVIEW, productId), review)

export const putUserPicture = (userId: string, image: string | Blob) => {
  const formdata = new FormData()
  formdata.append("profile", image, 'image.jpg')
  return Api.put<user.JsonUser>(stringFormat(_BASE_URL + _USER_PICTURE, userId), formdata, true, false)
}

export const putAnimalPicture = (userId: string, animalId: string, image: string | Blob) => {
  const formdata = new FormData()
  formdata.append("profileAnimal", image, 'profileAnimal.jpg')
  return Api.put<animal.JsonPicture>(stringFormat(_BASE_URL + _USER_ANIMAL_PICTURE, userId, animalId), formdata, true, false)
}

export const updateUserDescription = async (userId: string, updateUser: user.JsonUser) => {
  return Api.put<user.JsonUser>(stringFormat(_BASE_URL + _USER_UPDATE_DESCRIPTION, userId), updateUser, true)
}

export const getMarketProductsReviewsSumUp = async (productId: string) =>
  Api.get<review.JsonProductSumUp>(stringFormat(_BASE_URL + _PRODUCTS_REVIEWS_SUM_UP, productId))

export const putCart = async (userId: string, product : cart.ICartItemCreation) =>
  Api.put<cart.ICartItem[]>(stringFormat(_BASE_URL + _USER_CART, userId),[product], true)

export const getCart = async (userId: string) =>
  Api.get<cart.ICartItem[]>(stringFormat(_BASE_URL + _USER_CART, userId), true)

export const deleteCart = async (userId: string, cartItems: string[]) =>
  Api.delete<cart.ICartItem[]>(stringFormat(_BASE_URL + _USER_CART, userId), cartItems, true)

export const postUserOrder = async (userId: string, paymentDetails: order.JsonPaymentDetails) => 
  Api.post<order.JsonOrder>(stringFormat(_BASE_URL + _USER_ORDERS, userId), paymentDetails, true)

export const getReservations = async (userId: string) =>
  Api.get<reservation.IReservation[]>(stringFormat(_BASE_URL + _RESERVATIONS, userId),true)

export const postReservation = async (userId: string, reservation: reservation.IReservation) =>
  Api.post<reservation.IReservation>(stringFormat(_BASE_URL + _RESERVATIONS, userId),reservation,true)

export const deleteReservation = async (reservationId: string) =>
  Api.delete<reservation.IReservation>(stringFormat(_BASE_URL + _RESERVATIONS_DELETE, reservationId),true)

export const getLocation = async () =>
  Api.get<location.ILocation[]>(stringFormat(_BASE_URL + _LOCATION),false)

// TODO insert here other calls!!!!
