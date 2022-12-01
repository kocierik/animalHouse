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
    await newAnimal.save()
    const newAnim =  user.animals.push(newAnimal._id)
    console.log(newAnim)
    await user.save()
    return user.animals
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}


export const updateFromAnimal = async (
  animalId: string,
  updateAnimal: JsonAnimal
): Promise<IAnimal> => {
  const animal = await Animal.findById(animalId)
  if (animal) {
    animal.age = updateAnimal.age
    animal.name = updateAnimal.name
    animal.type = updateAnimal.type
    await animal.save()
    return animal
  } else {
    throw new JsonError(`Can\'t find animal with id ${animalId}`)
  }
}


export const deleteFromAnimal = async (animalId: string): Promise<IAnimal> => {
  const animal = await Animal.findById(animalId)
  if (animal) {
    const retAnimal = animal
    await User.updateMany({_id: animal.userId},{ $pull: { animals: { $in: [animal._id] } } })
    await animal.remove()
    return retAnimal
  } else {
    throw new JsonError(`Can\'t find animal with id ${animalId}`)
  }
}


export const findAnimalsUser = async (id: string) => {
  try {
    const result = await Animal.find({userId: id})
    return result
  } catch (err) {
    return null
  }
}