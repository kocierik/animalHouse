import type * as  JsonAnimal from './animal'
import { IReservation } from './Reservation';

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
  description: string
  animals: JsonAnimal.JsonAnimal[],
  address: JsonAddress,
  profilePicture?: JsonPicture
}

export interface JsonPicture {
  size: number,
  filename: string
  mimetype: string
}


export interface JsonAddress {
  country: string,
  city: string,
  street: string,
  zip: number
}

export interface JsonAuthInfo {
  username: string,
  id: string
}
