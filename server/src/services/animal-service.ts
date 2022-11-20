import { JsonAnimal } from '../json/JsonAnimal'
import Animal, { IAnimal } from '../entities/Animal'
import AnimalCode from '../entities/AnimalCode'
import User from '../entities/User'
import JsonError from '../json/JsonError'

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

export const addAnimalsToUser = async (userId: string, animal: JsonAnimal) => {
  const user = await User.findById(userId)
  if (user) { 
    const newAnimal = new Animal()
    newAnimal.name = animal.name
    newAnimal.age = animal.age
    newAnimal.picture = animal.picture
    newAnimal.type = animal.type
    newAnimal.userId = animal.userId
    user.animals.push(animal)
    await newAnimal.save()
    await user.save()
    return user.animals
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}