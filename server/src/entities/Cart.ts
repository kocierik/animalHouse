import { Schema, model } from 'mongoose'

export interface IProductInstance {
  productId: string,
  color?: string,
  type?: string,
  size?: string
}

interface ICart {
  userId: string,
  products: IProductInstance[]
}

const productCountSchema = new Schema<IProductInstance>({
  productId: {type: String, required: true },
  color: {type: String, required: false},
  type: {type: String, required: false},
  size: {type: String, required: false}
})

const cartSchema = new Schema<ICart>({
  userId: {type: String, required: true},
  products: {type: [productCountSchema], required: true}
})

const Cart = model<ICart>('Cart', cartSchema)

export default Cart
