import { Schema, model } from 'mongoose'
import { IAnimal, animalSchema } from './Animal'
import { IPicture, picturesSchema } from './Picture'

export interface IUser {
  _id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  animals: IAnimal[]
  description: string
  address: IAddress
  profilePicture?: IPicture
}

export interface IAddress {
  country: string
  city: string
  street: string
  zip: string
}

const addressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zip: { type: String, required: true },
})

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: false },
  animals: { type: [animalSchema], required: true, default: [] },
  address: { type: addressSchema },
  profilePicture: { type: picturesSchema, required: false },
})

const User = model<IUser>('User', userSchema)
export const Address = model<IAddress>('Address', addressSchema)

export default User
