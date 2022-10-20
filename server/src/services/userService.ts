import { JsonUser, JsonUserCreation } from '../json/JsonUser'
import JsonError from '../json/JsonError'
import User, { IUser } from '../entities/User'
import * as ProductService from './productService'
import * as CartService from './cartService'
import * as AnimalService from './animalService'
import { IProductInstance } from '../entities/Cart'
import { JsonAnimal } from '@/json/JsonAnimal'

export const validateUserCreation = async (userCreation: JsonUserCreation): Promise<Boolean> => {
  // Password checks
  if (userCreation.password.length < 8)
    throw new JsonError('password must be at least 8 characters long')

  // Look if username is already taken
  if ((await User.find({ username: userCreation.username })).length != 0)
    throw new JsonError(`username ${userCreation.username} already taken`)

  // Look if email is well formed TODO
  /*const regExp = new RegExp('')
  if (!regExp.test(userCreation.password))
    return res.status(STATUS_BAD_REQUEST).send(`email ${userCreation.email} is malformed`)*/

  // Look if email is already taken
  if ((await User.find({ email: userCreation.email })).length != 0)
    throw new JsonError(`email ${userCreation.email} already taken`)

  return true
}

export const userCreationToUser = (userCreation: JsonUserCreation) => {
  const user = new User()
  user.username = userCreation.username
  user.email = userCreation.email
  user.password = userCreation.password //bcrypt.hashSync(userCreation.password, 5)
  user.firstName = userCreation.firstName
  user.lastName = userCreation.lastName
  user.phone = 'todo'
  return user
}

export const findUserById = async (id: string): Promise<IUser> => {
  try {
    const result = await User.findOne({ id: id })
    return result as IUser
  } catch (err) { return null }
}

export const userToJsonUser = (user: IUser)/*TODO:JsonUser*/ => ({
  id: user._id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  // TODO more fields
})

export const addProductToUserCart = async (userId: string, pqs: IProductInstance[]): Promise<IProductInstance[]> => {
  /* TODO backend should also check wheter all fields of a product are correct.
    e.g. if you buy a tshirt you can't only specify the color, you need also the
    size. */
  ProductService.evalProductInstances(pqs)
  const cart = await CartService.createCartIfNotExists(userId)
  await CartService.addToCart(cart, pqs)
  return cart.productInstances
}

export const getUserProducts = async (userId: string) => {
  const promises = (await CartService.findCartOfUser(userId))?.productInstances
  return promises ? await Promise.all(promises) : [] // The empty cart
}

export const deleteFromUserCart = async (userId: string, piids: string[]) => {
  const cart = await CartService.findCartOfUser(userId)
  await CartService.deleteFromCart(cart.id, piids)
  return getUserProducts(userId)
}

export const addAnimalsToUser = async (userId: string, animals: JsonAnimal[]) => {
  const user = await User.findById(userId)
  if (user) {
    const inserted = await AnimalService.createAnimals(animals, userId)
    user.animals.push(...inserted.map(x => x._id))
    await user.save()
  } else
    throw new JsonError(`Can\'t find user with id ${userId}`)
}










