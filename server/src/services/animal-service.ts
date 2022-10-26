import { JsonAnimal } from '../json/JsonAnimal'
import Animal, { IAnimal } from '../entities/Animal'
import AnimalCode from '../entities/AnimalCode'

export const createAnimals = async (animals: JsonAnimal[], userId: string): Promise<IAnimal[]> => {
  const inserted = await Animal.insertMany(animals.map((a) => jsonAnimalToAnimal(a, userId)))
  return inserted as IAnimal[]
}

const jsonAnimalToAnimal = (ja: JsonAnimal, uId: string) => ({
  name: ja.name,
  type: ja.type,
  userId: uId,
  age: ja.age,
})

export const getAnimalCodes = async () =>
  (await AnimalCode.find({})).map((x) => ({ code: x.code, value: x.value }))

export const findById = async (id: string): Promise<IAnimal> => {
  const res = await Animal.findOne({ _id: id })
  return res ? res as IAnimal : null
}
