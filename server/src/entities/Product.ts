import { Schema, model } from 'mongoose'

interface IProduct {
  name: string,
  price: number,
  categoryId: string,
  description: string,
  animalTargets: string[],
  color?: string[],
  size?: string[],
  details?: string,
}

const productSchema = new Schema<IProduct>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  categoryId: {type: String, required: true},
  animalTargets: {type: [String], required: true},
  color: {type: [String], required: false},
  size: {type: [String], required: false},
  details: {type: String, required: false}
})

const Product = model<IProduct>('Product', productSchema)

export default Product
