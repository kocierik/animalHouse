import { JsonPet } from './JsonPet'
import { IProduct } from '../entities/Product'

export interface JsonUserCreation {
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
}

export interface JsonLogin {
  username: string,
  password: string
}

export interface JsonUser {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  pet: JsonPet[],
  address: JsonAddress 
}

export interface JsonAddress {
  country: string,
  city: string,
  street: string,
  cap: number
}

export interface JsonBuyingProduct {
  productInstanceId: string,
  product: IProduct,
  selectedColor?: string,
  selectedType?: string,
  selectedSize?: string
}
