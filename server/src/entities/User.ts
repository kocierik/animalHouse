import { Schema, model } from 'mongoose'
import { IAnimal, animalSchema } from './Animal'

export interface IUser {
  _id: string,
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  animals: IAnimal[]
  address: IAddress
}

export interface IAddress {
  country: string
  city: string
  street: string
  zip: number
}

const addressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zip: { type: Number, required: true },
})

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  animals: { type: [animalSchema], required: true, default: [] },
  address: { type: addressSchema }
})

const User = model<IUser>('User', userSchema)
export const Address = model<IAddress>('Address', addressSchema)

export default User
