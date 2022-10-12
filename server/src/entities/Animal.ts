import { Schema, model } from 'mongoose'

export interface IAnimal {
  _id: string
  name: string
  type: string
  userId: string
  age: number
}

const animalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  age: { type: Number, required: true },
})

const Animal = model<IAnimal>('Animal', animalSchema)

export default Animal
