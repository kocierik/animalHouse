import JsonError from '../json/JsonError'
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
    cart.productInstances.push(products[0])
    const cartUser = await Cart.find({userId: cart.userId.toString()})
    cartUser[0].productInstances.push(products[0])
    await Cart.updateMany({ userId: cart.userId.toString() }, { productInstances: cartUser[0].productInstances })
    return cartUser[0].productInstances
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const findCartOfUser = async (id: string) => {
  return await Cart.findOne({ userId: id })
}

export const deleteFromCart = async (cartId: string, productInstancesIds: string): Promise<ICart> => {
  try {
    const cart = await Cart.findOne({ _id: cartId }),
    result = cart.productInstances.filter((i => v => v.productId !== productInstancesIds || --i)(1));
    cart.productInstances = result
    await cart.save()
    return cart as ICart
  } catch (err) {
    if (err instanceof JsonError) throw err
    throw new JsonError(err.message)
  }
}

export const resetCart = async (cartId: string): Promise<ICart> => {
  try {
    const cart = await Cart.findOne({ _id: cartId })
    cart.productInstances = []
    await cart.save()
    return cart as ICart
  } catch (err) {
    if (err instanceof JsonError) throw err
    throw new JsonError(err.message)
  }
}


const includesId = (id: Types.ObjectId, collection: any[]): boolean =>
  collection.reduce((old: boolean, x: any) => x._id.toString() === id.toString() || old, false)
