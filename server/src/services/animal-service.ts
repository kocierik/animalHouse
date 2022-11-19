import { JsonAnimal } from '../json/JsonAnimal'
import Animal, { IAnimal } from '../entities/Animal'
import AnimalCode from '../entities/AnimalCode'
import { AnimalPatch } from '@/json/patch/AnimalPatch'

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

export const getAnimalCodes = async () => (await AnimalCode.find({})).map((x) => ({ code: x.code, value: x.value }))

export const findById = async (id: string): Promise<IAnimal> => {
  const res = await Animal.findOne({ _id: id })
  return res ? (res as IAnimal) : null
}

export const patchAnimal = async (id: string, patch: AnimalPatch): Promise<JsonAnimal> => {
  const animal = await Animal.findById(id)
  if (patch.age) animal.age = patch.age
  if (patch.name) animal.name = patch.name
  if (patch.type) animal.type = patch.type

  await animal.save()
  return animalToJsonAnimal(animal)
}
