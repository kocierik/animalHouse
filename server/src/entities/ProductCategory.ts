import { Schema, model } from 'mongoose'

export interface IProductCategory {
  name: string
}

const productCategorySchema = new Schema<IProductCategory>({
  name: { type: String, required: true }
})

const ProductCategory = model<IProductCategory>('ProductCategory', productCategorySchema)

export default ProductCategory
