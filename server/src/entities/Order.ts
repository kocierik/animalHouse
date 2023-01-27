import { model, Schema } from 'mongoose'
import { IAddress } from './Address'
import { cartItemSchema, ICartItem } from './CartItem'

export interface IOrder {
  _id: string
  cartId: string
  userId: string
  cartItems: ICartItem[]
  executionDate: Date
  cardName: string
  cardNumber: string
  address: IAddress
}

const orderSchema = new Schema<IOrder>({
  cartId: { type: String, required: true },
  userId: { type: String, required: true },
  cartItems: { type: [cartItemSchema], required: true },
  executionDate: { type: Date, required: true },
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true }
})

export const Order = model<IOrder>('Orders', orderSchema)
