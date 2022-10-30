import type * as  JsonAnimal from './animal'

export interface JsonRegistration {
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
}

export interface JsonUser {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  animals: JsonAnimal.JsonAnimal[],
  address: JsonAddress
}

export interface JsonAddress {
  country: string,
  city: string,
  street: string,
  cap: number
}

export interface JsonAuthInfo {
  username: string,
  id: string
}
