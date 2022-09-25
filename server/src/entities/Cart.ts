import { Schema, model } from 'mongoose'
import { Types } from 'mongoose'

export interface IProductInstance {
  _id: Types.ObjectId
  productId: string
  color?: string
  type?: string
  size?: string
}

export interface ICart {
  userId: string
  productInstances: IProductInstance[]
}

const productCountSchema = new Schema<IProductInstance>({
  productId: { type: String, required: true },
  color: { type: String, required: false },
  type: { type: String, required: false },
  size: { type: String, required: false },
})

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  productInstances: { type: [productCountSchema], required: true },
})

const Cart = model<ICart>('Cart', cartSchema)
export const ProductInstance = model<IProductInstance>('ProductInstance', productCountSchema)

export default Cart
