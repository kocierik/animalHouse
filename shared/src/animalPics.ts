import { Api, ApiResponse } from './api'

const getRequest = async (endpoint: string) => {
  const response: ApiResponse<any> = await Api.get(endpoint)
  if (response.esit) {
    return response.data
  } else throw new Error(`Failed to fetch ${endpoint}`)
}

export enum AnimalType {
  Cat = 'Cat',
  Dog = 'Dog',
  Fox = 'Fox',
  Bunny = 'Bunny',
  Duck = 'Duck',
  Lizard = 'Lizard',
  Shiba = 'Shiba',
  Koala = 'Koala',
  Panda = 'Panda'
}

export const getAnimalPicture = async (type: AnimalType): Promise<string> => {
  if (type == AnimalType.Cat) return (await getRequest('https://aws.random.cat/meow')).file
  if (type == AnimalType.Dog) return (await getRequest('https://dog.ceo/api/breeds/image/random')).message
  if (type == AnimalType.Bunny)
    return (await getRequest('https://api.bunnies.io/v2/loop/random/?media=gif,png')).media.poster
  if (type == AnimalType.Duck) return (await getRequest('https://random-d.uk/api/v1/random?type=png')).url
  if (type == AnimalType.Fox) return (await getRequest('https://randomfox.ca/floof/')).image
  if (type == AnimalType.Lizard) return (await getRequest('https://nekos.life/api/v2/img/lizard')).url
  if (type == AnimalType.Shiba) return (await getRequest('http://shibe.online/api/shibes'))[0]
  if (type == AnimalType.Koala) return (await getRequest('https://some-random-api.ml/img/koala')).link
  if (type == AnimalType.Panda) return (await getRequest('https://some-random-api.ml/img/panda')).link
  else throw new Error(`Animal ${type} not found!`)
}
