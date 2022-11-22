import JsonError from '../json/JsonError'
import Cart, { ICart } from '../entities/Cart'
import { CartItem, ICartItem } from '../entities/CartItem'
import { JsonCart } from '../json/JsonCart'
import { JsonCartItemCreation } from '@/json/JsonCartItemCreation'
import * as ProductService from './product-service'

export const cartToJsonCart = (cart: ICart) => cart as JsonCart

export const createCartIfNotExists = async (userId: string): Promise<ICart> => {
  try {
    const response = await Cart.exists({ userId: userId })
    if (!response) {
      // We have to create an empty cart
      const cart = new Cart()
      cart.userId = userId
      cart.cartItems = []
      await cart.save()
      return cart
    } else {
      return (await findCartOfUser(userId)) 
    }
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const addToCart = async (cartId: string, products: JsonCartItemCreation[]): Promise<ICart> => {
  try {
    const cart = await Cart.findById(cartId)
    const cartItems = await Promise.all(products.map(constructCartItem))
    cart.cartItems.push(...cartItems)
    return await cart.save()
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const findCartOfUser = async (id: string) => {
  return await Cart.findOne({ userId: id })
}

export const deleteFromCart = async (cartId: string, cartItemsIdToRemove: string[]): Promise<ICart> => {
  try {
    const cart = await Cart.findOne({ _id: cartId })
    cart.cartItems = cart.cartItems.filter(x => !cartItemsIdToRemove.includes(x._id.toString()))
    await cart.save()
    return cart 
  } catch (err) {
    if (err instanceof JsonError) throw err
    throw new JsonError(err.message)
  }
}

export const deleteAllFromCart = async (cartId: string): Promise<ICart> => {
  try {
    const cart = await Cart.findOne({ _id: cartId })
    cart.cartItems = []
    await cart.save()
    return cart
  } catch (err) {
    if (err instanceof JsonError) throw err
    throw new JsonError(err.message)
  }
}

const constructCartItem = async (creation: JsonCartItemCreation): Promise<ICartItem> => {
  const cartItem = new CartItem()
  cartItem.color = creation.color
  cartItem.size = creation.size
  cartItem.type = creation.type
  cartItem.productId = creation.productId
  const product = await ProductService.findProductByid(creation.productId)
  cartItem.price = product.price
  return cartItem
}