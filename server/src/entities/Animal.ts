import { Schema, model } from 'mongoose'
import { JsonPicture } from '../json/JsonUser'
import { IPicture } from './User'

export interface IAnimal {
  _id: string
  name: string
  type: string
  userId: string
  age: number
  picture?: JsonPicture
}

const picturesSchema = new Schema<IPicture>({
  size: { type: Number, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
})

export const animalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  age: { type: Number, required: true },
  picture: { type: picturesSchema, required: false },
})

const Animal = model<IAnimal>('Animal', animalSchema)

export default Animal
