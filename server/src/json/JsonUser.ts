import * as JsonAnimal from "./JsonAnimal"

export interface JsonUserCreation {
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
  country: string
  city: string
  street: string
  zip: number
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
  zip: number
}

export interface JsonLogin {
  username: string
  password: string
}

export interface JsonUser {
  _id: string
  username: string
  email: string
  firstName: string
  lastName: string
  animals: JsonAnimal.JsonAnimal[]
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
  zip: number
}
