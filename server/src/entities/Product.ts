import { Schema, model } from 'mongoose'
import { IPicture, picturesSchema } from './Picture'

export interface IProduct {
  name: string
  price: number
  categoryId: string
  description: string
  animalTargets: string[]
  image?: IPicture
  alt?: string[]
  colors?: string[]
  sizes?: string[]
  types?: string[]
  highlights?: string[]
  details?: string
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  image: { type: picturesSchema, required: false },
  alt: { type: [String], required: false },
  animalTargets: { type: [String], required: true },
  colors: { type: [String], required: false },
  sizes: { type: [String], required: false },
  types: { type: [String], required: false },
  highlights: { type: [String], required: false },
  details: { type: String, required: false }
})

const Product = model<IProduct>('Product', productSchema)

export default Product
