import { ICartItem } from './Cart'
import type { JsonAddress } from './user'

export interface JsonPaymentDetails {
  cardName: string
  cardNumber: string
  address: JsonAddress
}

export interface JsonOrder {
  _id: string
  cartId: string
  executionDate: string
  cardName: string
  cardNumber: string
  address: JsonAddress
}

export interface JsonAllOrder {
  _id: string
  cartId: string
  userId: string
  cartItems: ICartItem[]
  executionDate: Date
  cardName: string
  cardNumber: string
  address: JsonAddress
}