import { Schema, model } from 'mongoose'

interface IProductCount {
  productId: string,
  count: number
}

interface ICart {
  userId: string,
  products: IProductCount[]
}

const productCountSchema = new Schema<IProductCount>({
  productId: {type: String, required: true },
  count: {type: Number, required: true }
})

const cartSchema = new Schema<ICart>({
  userId: {type: String, required: true},
  products: {type: [productCountSchema], required: true}
})

const Cart = model<ICart>('Cart', cartSchema)

export default Cart
