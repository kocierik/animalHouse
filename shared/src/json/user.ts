import type * as JsonAnimal from './animal'

export interface JsonRegistration {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  country: string
  city: string
  street: string
  zip: string
}

export interface JsonUser {
  _id: string
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  description: string
  animals: JsonAnimal.JsonAnimal[]
  address: JsonAddress
  profilePicture?: JsonPicture
}

export interface JsonPicture {
  size: number
  filename: string
  mimetype: string
}

export interface JsonAddress {
  country: string
  city: string
  street: string
  zip: string
}

export interface JsonAuthInfo {
  username: string
  id: string
}
