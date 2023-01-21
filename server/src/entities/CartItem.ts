import { Schema, model } from 'mongoose'

export interface ICartItem {
  _id: string
  productId: string
  price: number
  color?: string
  type?: string
  size?: string
}

export const cartItemSchema = new Schema<ICartItem>({
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: false },
  type: { type: String, required: false },
  size: { type: String, required: false }
})

export const CartItem = model<ICartItem>('CartItem', cartItemSchema)
