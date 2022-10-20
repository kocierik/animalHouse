import JsonError from '@/json/JsonError'
import { Types } from 'mongoose'
import Cart, { ICart, IProductInstance } from '../entities/Cart'

export const createCartIfNotExists = async (userId: string): Promise<ICart> => {
  try {
    const response = await Cart.exists({ userId: userId })
    if (!response) {
      // We have to create an empty cart
      let cart = new Cart()
      cart.userId = userId
      cart.productInstances = []
      await cart.save()
      return cart
    } else {
      return (await findCartOfUser(userId)) as ICart
    }
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const addToCart = async (cart: ICart, products: IProductInstance[]) => {
  try {
    const pis = cart.productInstances.concat(products)
    await Cart.updateOne({ _id: cart.userId }, { productInstances: pis })
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const findCartOfUser = (id: string) => Cart.findOne({ userId: id })

export const deleteFromCart = async (cartId: string, productInstancesIds: string[]): Promise<ICart> => {
  try {
    const cart = await Cart.findOne({ _id: cartId })

    if (!cart)
      throw new JsonError('Cart is empty')

    const piids = productInstancesIds.map(x => new Types.ObjectId(x))

    // Get all product instance ids that are passed into the body of the call
    // but are not present into the cart
    const invalids = piids.filter(
      (piId: Types.ObjectId) =>
        !includesId(
          piId,
          cart.productInstances.map((pii) => pii._id)
        )
    )

    if (invalids.length !== 0)
      throw new JsonError(`${invalids} are not product instances of this cart`)

    cart.productInstances = cart.productInstances.filter((pi) => !includesId(pi._id, piids))
    await cart.save()
    return cart as ICart
  } catch (err) {
    if (err instanceof JsonError)
      throw err
    throw new JsonError(err.message)
  }
}

const includesId = (id: Types.ObjectId, collection: any[]): boolean =>
  collection.reduce((old: boolean, x: any) => x._id.toString() === id.toString() || old, false)
