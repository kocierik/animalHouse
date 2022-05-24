import { Api, ApiResponse } from 'shared'
import type { CatFact, CatImg } from './models/CatFact'
import { AuthToken } from '@/helpers/localStoreHelper'

// Various api urls
const _CAT_FACT_URL = ' https://meowfacts.herokuapp.com/'
const _CAT_IMG_URL = 'https://api.thecatapi.com/v1/images/search'

// Server api urls
const _BASE_URL = "http://localhost:8080/v1"
const _AUTH = "/user/login"

export const fetchCatFacts = async (): Promise<ApiResponse<CatFact>> => Api.get<CatFact>(_CAT_FACT_URL)

export const fetchCatImg = async (): Promise<ApiResponse<CatImg>> => Api.get<CatImg>(_CAT_IMG_URL)

export const login = async (username: string, password: string) => GameApi.post<any>(_BASE_URL + _AUTH, { username: username, password: password})

class GameApi extends Api {
  
  protected static getToken() : string {
    const token = localStorage.getItem(AuthToken)
    return token ?? "not logged"
  }
}
