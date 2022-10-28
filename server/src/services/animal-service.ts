import { JsonAnimal } from '../json/JsonAnimal'
import Animal, { IAnimal } from '../entities/Animal'
import AnimalCode from '../entities/AnimalCode'

export const createAnimals = async (animals: JsonAnimal[]): Promise<IAnimal[]> =>
  (await Animal.insertMany(animals.map(jsonAnimalToAnimal))) as IAnimal[]

/**
 * I know this can seems useless but it isn't (maybe)
 */
export const jsonAnimalToAnimal = (ja: JsonAnimal): IAnimal => ja as IAnimal

/**
 * I know this can seems useless but it isn't (maybe)
 */
export const animalToJsonAnimal = (animal: IAnimal) => animal as JsonAnimal

export const getAnimalCodes = async () =>
  (await AnimalCode.find({})).map((x) => ({ code: x.code, value: x.value }))

export const findById = async (id: string): Promise<IAnimal> => {
  const res = await Animal.findOne({ _id: id })
  return res ? res as IAnimal : null
}
