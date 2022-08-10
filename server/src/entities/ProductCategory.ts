import { Schema, model } from 'mongoose'

interface IProductCategory {
  name: string
}

const productCategorySchema = new Schema<IProductCategory>({
  name: {type: String, required: true}
})

const ProductCategory = model<IProductCategory>('ProductCategory', productCategorySchema)

export default ProductCategory
