import { Api, ApiResponse } from 'shared'
import type { CatFact, CatImg } from './models/CatFact'

// Various api urls
const _CAT_FACT_URL = ' https://meowfacts.herokuapp.com/'
const _CAT_IMG_URL = 'https://api.thecatapi.com/v1/images/search'


export const fetchCatFacts = async (): Promise<ApiResponse<CatFact>> => Api.get<CatFact>(_CAT_FACT_URL)

export const fetchCatImg = async (): Promise<ApiResponse<CatImg>> => Api.get<CatImg>(_CAT_IMG_URL)

