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
  admin?: boolean
}

export interface JsonUser {
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  pet: JsonPet[]
  address: JsonAddress
}

export interface JsonAddress {
  country: string
  city: string
  street: string
  cap: number
}
