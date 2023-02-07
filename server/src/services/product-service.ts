import JsonError from '../json/JsonError'
import Product, { IProduct } from '../entities/Product'
import { JsonPicture } from '../json/JsonProduct'
import { IPicture } from '../entities/Picture'
import { ICartItem } from '../entities/CartItem'
import { JsonProduct } from '../json/JsonProduct'
import Review from '../entities/Review'
import { JsonReview } from '../json/JsonReview'
import JsonProductSumUp from '../json/JsonProductSumUp'
import { ProductPatch } from '../json/patch/ProductPatch'
import ProductCategory, { IProductCategory } from '../entities/ProductCategory'
import { JsonCartItemCreation } from '../json/JsonCartItemCreation'

export const findAllProduct = async (): Promise<IProduct[]> => Product.find({})

export const findProductByid = async (id: string): Promise<IProduct> => {
  try {
    const prod = (await Product.findOne({ _id: id })) as IProduct
    return prod
  } catch (err) {
    throw new JsonError(`Cannot find product with id ${id} (${err.message})`)
  }
}

export const getProductCategory = async (id: string): Promise<string> => {
  try {
    const category = await ProductCategory.findById(id)
    return category.name
  } catch (err) {
    throw new JsonError(`Cannot find category with id ${id} (${err.message})`)
  }
}

export const getProductCategoriesName = async (): Promise<IProductCategory[]> => {
  try {
    const categories = await ProductCategory.find({})
    return categories
  } catch (err) {
    throw new JsonError(`Cannot find categories (${err.message})`)
  }
}

const isValidOption = (x: any, y: any[]): boolean => !x || y.includes(x)

export const evalCartItemCreation = async (pq: JsonCartItemCreation): Promise<boolean> => {
  const doc = await findProductByid(pq.productId)
  if (!isValidOption(pq.color, doc.colors)) throw new JsonError(`Color ${pq.color} isn't available for this product`)
  if (!isValidOption(pq.size, doc.sizes)) throw new JsonError(`Size ${pq.size} isn't available for this product`)
  if (!isValidOption(pq.type, doc.types)) throw new JsonError(`Type ${pq.type} isn't available for this product`)
  return true
}

export const evalCartItemCreations = (cartItems: JsonCartItemCreation[]): Promise<boolean> =>
  Promise.all(cartItems.map((x) => evalCartItemCreation(x))).then((x) => x.reduce((old, cur) => old && cur))

export const deleteProduct = (id: string) => Product.deleteOne({ _id: id })

export const reviewById = (productId: string) => {
  return Review.find({ productId: productId })
}

export const pictureToJsonPicture = (pic: IPicture) => ({
  size: pic.size,
  filename: pic.filename,
  mimetype: pic.mimetype
})

export const addPictureToProduct = async (productId: string, picture: JsonPicture) => {
  const product = await Product.findById(productId)
  if (product) {
    try {
      await Product.findByIdAndUpdate({ _id: productId }, { image: picture })
      return product
    } catch (err) {
      throw new JsonError(err.message)
    }
  } else throw new JsonError(`Can\'t find product with id ${productId}`)
}

export const createReview = async (reviewCreation: JsonReview) => {
  const review = new Review()
  review.username = reviewCreation.username
  review.productId = reviewCreation.productId
  review.comment = reviewCreation.comment
  review.star = reviewCreation.star
  review.date = reviewCreation.date
  await review.save()
  return review
}

export const createProduct = async (productCreation: JsonProduct): Promise<IProduct> => {
  const product = new Product()

  product.name = productCreation.name
  product.price = productCreation.price
  product.categoryId = productCreation.categoryId
  product.description = productCreation.description
  product.animalTargets = productCreation.animalTargets
  product.image = productCreation.image
  product.colors = productCreation.colors
  product.sizes = productCreation.sizes
  product.types = productCreation.types
  product.details = productCreation.details
  await product.save()
  return product as IProduct
}

export const getProductReviewSumUp = async (prodId: string) => {
  const reviews = await Review.find({ productId: prodId })
  console.log(prodId)
  if (reviews.length === 0) {
    return { average: 0, total: 0, percentage: [1, 2, 3, 4, 5].map((_) => '0%') }
  }
  const avg = reviews.map((x) => x.star).reduce((old, curr) => old + curr, 0) / reviews.length
  const percentages = [1, 2, 3, 4, 5].map((y) => (reviews.filter((x) => x.star === y).length / reviews.length) * 100)

  const result: JsonProductSumUp = {
    average: avg,
    total: reviews.length,
    percentage: percentages.map((x) => `${Math.round(x)}%`)
  }
  return result
}

export const patchProduct = async (id: string, patch: ProductPatch): Promise<IProduct> => {
  const prod = await Product.findById(id)

  if (patch.description) prod.description = patch.description
  if (patch.name) prod.name = patch.name
  if (patch.price) prod.price = patch.price
  if (patch.sizes) prod.sizes = patch.sizes
  if (patch.colors) prod.colors = patch.colors
  if (patch.types) prod.types = patch.types
  if (patch.categoryId) prod.categoryId = patch.categoryId
  if (patch.details) prod.details = patch.details
  if (patch.animalTargets) prod.animalTargets = patch.animalTargets

  await prod.save()
  return prod as IProduct
}
