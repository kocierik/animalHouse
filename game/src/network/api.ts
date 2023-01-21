import { AnimalType, Api, ApiResponse } from 'shared'
import type { CatFact, CatImg } from './models/CatFact'
import type { IHoroscope } from './models/Horoscope'
import { Helpers } from 'shared'
// Various api urls
const _CAT_FACT_URL = ' https://meowfacts.herokuapp.com/'
const _CAT_IMG_URL = 'https://api.thecatapi.com/v1/images/search'
const HOROSCOPE_URL = 'http://sandipbgt.com/theastrologer/api/horoscope/{0}/today/'

export const fetchCatFacts = async (): Promise<ApiResponse<CatFact>> => Api.get<CatFact>(_CAT_FACT_URL)

export const fetchCatImg = async (): Promise<ApiResponse<CatImg>> => Api.get<CatImg>(_CAT_IMG_URL)

export const fetchHoroscope = async (sign: string): Promise<ApiResponse<IHoroscope>> =>
  Api.get<IHoroscope>(Helpers.stringFormat(HOROSCOPE_URL, sign))

export const fetchFakeFact = async (animal: AnimalType) => {
  const response = await fetchCatFacts()
  if (response.data) {
    response.data.data[0] = response.data!.data[0].replace(/cat/gi, animal)
  }
  return response
}
