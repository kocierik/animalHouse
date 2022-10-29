import { JsonPet } from './JsonPet'

export interface JsonUserCreation {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
}

export interface JsonLogin {
  username: string
  password: string
}

export interface JsonUser {
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  pet: JsonPet[]
  address: JsonAddress
  profilePicture?: string
}

export interface JsonPicture{
  size: number,
  filename: string
  mimetype: string
}


export interface JsonAddress {
  country: string
  city: string
  street: string
  cap: number
}
