import JsonError, { JsonNotFoundError, JsonServerError, JsonVisibilityError } from '../json/JsonError'
import Cart, { ICart } from '../entities/Cart'
import { CartItem, ICartItem } from '../entities/CartItem'
import { JsonCart } from '../json/JsonCart'
import { JsonCartItemCreation } from '../json/JsonCartItemCreation'
import * as ProductService from './product-service'

export const cartToJsonCart = (cart: ICart) => cart as JsonCart

export const createActiveCartIfNotExists = async (userId: string): Promise<ICart> => {
  try {
    const response = await Cart.exists({ userId: userId, active: true })
    if (!response) {
      // We have to create an empty cart
      const cart = new Cart()
      cart.userId = userId
      cart.cartItems = []
      await cart.save()
      return cart
    } else {
      return await findActiveCartOfUser(userId)
    }
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const addToCart = async (cartId: string, products: JsonCartItemCreation[]): Promise<ICart> => {
  try {
    const cart = await Cart.findById(cartId)
    if (!cart.active) throw new JsonVisibilityError('Cannot add products to a inactive cart!')
    const cartItems = await Promise.all(products.map(constructCartItem))
    cart.cartItems.push(...cartItems)
    return await cart.save()
  } catch (err) {
    throw new JsonError(err.message)
  }
}

export const findActiveCartOfUser = async (id: string) => {
  return await Cart.findOne({ userId: id, active: true })
}

export const deleteFromCart = async (cartId: string, cartItemsIdToRemove: string[]): Promise<ICart> => {
  try {
    if (cartItemsIdToRemove.length === 0) throw new Error("You can't remove no cart items!")
    const cart = await Cart.findOne({ _id: cartId })
    cart.cartItems = cart.cartItems.filter((x) => !cartItemsIdToRemove.includes(x._id.toString()))
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
  let index = 0
  for (let i = 0; i < product.sizes.length; i++) {
    const size = product.sizes[i]
    if (size === creation.size) index = i
  }
  cartItem.price = product.price[index]
  return cartItem
}



const deactivateCart = async (cartId: string): Promise<ICart> => {
  const cart = await Cart.findById(cartId)
  if (cart) {
    cart.active = false
    await cart.save()
    return cart
  } else throw new JsonServerError('Cannot deactivate a cart if it does not exist')
}

export const generateNewCartForUser = async (userId: string): Promise<ICart> => {
  const oldCart = await findActiveCartOfUser(userId)

  // mark as not active
  await deactivateCart(oldCart._id)

  // create new one
  const newCart = await createActiveCartIfNotExists(userId)

  return newCart as ICart
}

export const isCartDeactivated = async (cartId: string): Promise<boolean> =>
  (await Cart.findById(cartId)).active === false
