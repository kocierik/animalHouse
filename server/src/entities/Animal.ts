import { Schema, model } from 'mongoose'
import { IPicture, picturesSchema } from './Picture'

export interface IAnimal {
  _id: string
  name: string
  type: string
  userId: string
  age: number
  picture?: IPicture
}

export const animalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  age: { type: Number, required: true },
  picture: { type: picturesSchema, required: false },
})

const Animal = model<IAnimal>('Animal', animalSchema)

export default Animal
