import { Schema, model } from 'mongoose'
import { addressSchema, IAddress } from './Address'
import { IAnimal, animalSchema } from './Animal'
import { IPicture, picturesSchema } from './Picture'

export interface IUser {
  _id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  animals: string[]
  description: string
  address: IAddress
  valid: boolean
  profilePicture?: IPicture
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: false },
  valid: { type: Boolean, required: false, default: true },
  animals: { type: [String], required: true, default: [] },
  address: { type: addressSchema },
  profilePicture: { type: picturesSchema, required: false }
})

const User = model<IUser>('User', userSchema)

export default User
