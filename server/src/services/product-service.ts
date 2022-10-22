import JsonError from '../json/JsonError'
import Product, { IProduct } from '../entities/Product'
import { IProductInstance } from '../entities/Cart'
import { JsonProduct } from '../json/JsonProduct'

export const findAllProduct = async (): Promise<IProduct[]> => Product.find({})

export const findProductByid = async (id: string): Promise<IProduct> => {
  try {
    const prod = (await Product.findOne({ _id: id })) as IProduct
    return prod
  } catch (err) {
    throw new JsonError(`Cannot find product with id ${id} (${err.message})`)
  }
}

const isValidOption = (x: any, y: any[]): boolean => x || y.includes(x)

export const evalProductInstance = async (pq: IProductInstance): Promise<boolean> => {
  const doc = await findProductByid(pq.productId)
  if (!isValidOption(pq.color, doc.colors))
    throw new JsonError(`Color ${pq.color} isn't available for this product`)
  if (!isValidOption(pq.size, doc.sizes))
    throw new JsonError(`Size ${pq.size} isn't available for this product`)
  if (!isValidOption(pq.type, doc.types))
    throw new JsonError(`Type ${pq.type} isn't available for this product`)
  return true
}

export const evalProductInstances = (productInstances: IProductInstance[]): Promise<boolean> =>
  Promise.all(productInstances.map(x => evalProductInstance(x))).then(x => x.reduce((old, cur) => old && cur))

export const deleteProduct = (id: string) => Product.deleteOne({ _id: id })

export const createProduct = async (productCreation: JsonProduct): Promise<IProduct> => {
  const product = new Product();

  product.name = productCreation.name;
  product.price = productCreation.price;
  product.categoryId = productCreation.categoryId;
  product.description = productCreation.description;
  product.animalTargets = productCreation.animalTargets;
  product.image = productCreation.image;
  product.colors = productCreation.colors;
  product.sizes = productCreation.sizes;
  product.types = productCreation.types;
  product.details = productCreation.details;
  await product.save();
  return product as IProduct
}
