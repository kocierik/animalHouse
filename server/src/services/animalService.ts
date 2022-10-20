import { JsonAnimal } from '../json/JsonAnimal'
import Animal, { IAnimal } from '../entities/Animal'

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

