import { Schema, model } from 'mongoose'
import { addressSchema, IAddress } from './Address'
import { IAnimal, animalSchema } from './Animal'

export interface IUser {
  _id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  animals: IAnimal[]
  description: string
  phone: string
  address: IAddress
  profilePicture?: IPicture
}
export interface IPicture {
  filename: string
  mimetype: string
  size: number
}

const picturesSchema = new Schema<IPicture>({
  size: { type: Number, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
})


const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: false },
  animals: { type: [animalSchema], required: true, default: [] },
  address: { type: addressSchema },
  profilePicture: { type: picturesSchema, required: false },
})

const User = model<IUser>('User', userSchema)

export default User
