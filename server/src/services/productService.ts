import JsonError from '@/json/JsonError'
import Product, { IProduct } from '../entities/Product'
import { IProductInstance } from '../entities/Cart'

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
