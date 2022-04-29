import { Api, ApiResponse } from "shared"
import type CatFact from "./models/CatFact"

const _CAT_FACT_URL = ' https://meowfacts.herokuapp.com/'

const fetchCatFacts = async () : Promise<ApiResponse<CatFact>>  =>
  Api.get<CatFact>(_CAT_FACT_URL)


export default fetchCatFacts
