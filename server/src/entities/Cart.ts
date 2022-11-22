import { Schema, model } from 'mongoose'
import { ICartItem, cartItemSchema} from './CartItem'

export interface ICart {
  _id: string,
  userId: string
  cartItems: ICartItem[]
}

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  cartItems: { type: [cartItemSchema], required: true },
})

const Cart = model<ICart>('Cart', cartSchema)

export default Cart