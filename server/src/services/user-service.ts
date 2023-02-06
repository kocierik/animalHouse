import { Address, IAddress } from '../entities/Address'
import { JsonCartItemCreation } from '../json/JsonCartItemCreation'
import Animal, { IAnimal } from '../entities/Animal'
import { ICartItem } from '../entities/CartItem'
import { Order } from '../entities/Order'
import User, { IUser } from '../entities/User'
import { JsonAnimal } from '../json/JsonAnimal'
import { JsonLogin } from '../json/JsonUser'
import { AuthData } from '../routes/middlewares'
import JsonError, { JsonBadReqError, JsonNotFoundError, JsonVisibilityError } from '../json/JsonError'
import Admin from '../entities/Admin'

import { JsonOrder } from '../json/JsonOrder'
import { JsonPaymentDetails } from '../json/JsonPaymentDetails'
import { JsonPicture, JsonUser, JsonUserCreation } from '../json/JsonUser'
import { JsonUserPatch } from '../json/patch/UserPatch'
import * as AnimalService from './animal-service'
import * as CartService from './cart-service'
import * as OrderService from './order-service'
import * as ProductService from './product-service'
import { IPicture } from '../entities/Picture'
import { AnimalPatch } from '../json/patch/AnimalPatch'

export const createUser = async (userCreation: JsonUserCreation): Promise<IUser> =>
  validateUserCreation(userCreation)
    .then(userCreationToUser)
    .then((x) => x.save())
    .then((x) => x as IUser)

const validateUserCreation = async (userCreation: JsonUserCreation): Promise<JsonUserCreation> => {
  // Password checks
  if (userCreation.password.length < 8) throw new JsonError('password must be at least 8 characters long')

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

  return userCreation
}

export const getAllUSers = async () => {
  const users = await User.find({})
  let ret = []
  for (const u of users) {
    ret.push(userToJsonUser(u))
  }
  return ret
}

const userCreationToUser = (userCreation: JsonUserCreation) => {
  const user = new User()
  user.username = userCreation.username
  user.email = userCreation.email
  user.password = userCreation.password //bcrypt.hashSync(userCreation.password, 5)
  user.firstName = userCreation.firstName
  user.lastName = userCreation.lastName

  const address = new Address()
  address.country = userCreation.country
  address.city = userCreation.city
  address.street = userCreation.street
  address.zip = userCreation.zip

  user.address = address
  return user
}

export const verifyLogin = (login: JsonLogin): Promise<AuthData> => {
  const hashed = login.password //bcrypt.hashSync(login.password, 5)
  return constructAuthDataForUser(login.username, login.password)
}

const constructAuthDataForUser = async (username: string, password: string): Promise<AuthData> => {
  const result = await User.find({ username: username, password: password })
  if (result.length !== 1) {
    throw new JsonVisibilityError('invalid username or password')
  }
  return {
    username: result[0].username,
    id: result[0]._id.toString()
  } as AuthData
}

export const findUserById = async (id: string): Promise<IUser> => {
  try {
    const result = await User.findById(id)
    return result as IUser
  } catch (err) {
    return null
  }
}

export const disableUserById = async (id: string): Promise<IUser> => {
  try {
    const result = await User.findById(id)

    if (!result) {
      throw new JsonNotFoundError(`Can't find user with id ${id}`)
    }
    result.valid = false
    await result.save()
    return result as IUser
  } catch (err) {
    return null
  }
}

export const userToJsonUser = (user: IUser): JsonUser => ({
  _id: user._id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  valid: user.valid,
  description: user.description,
  animals: user.animals,
  profilePicture: user.profilePicture,
  address: user.address as IAddress
})

export const pictureToJsonPicture = (pic: IPicture) => ({
  size: pic.size,
  filename: pic.filename,
  mimetype: pic.mimetype
})

export const addProductToUserCart = async (userId: string, cic: JsonCartItemCreation[]): Promise<ICartItem[]> => {
  /* TODO backend should also check wheter all fields of a product are correct.
    e.g. if you buy a tshirt you can't only specify the color, you need also the
    size. */

  if (cic.length === 0) {
    throw new JsonBadReqError('You must add at least one cart item!')
  }

  if (!(await ProductService.evalCartItemCreations(cic))) {
    throw new JsonBadReqError('Invalid cart item creation')
  }
  const cart = await CartService.createActiveCartIfNotExists(userId)
  return (await CartService.addToCart(cart._id, cic)).cartItems
}

export const getUserCartItems = async (userId: string) => {
  const cartItems = (await CartService.findActiveCartOfUser(userId))?.cartItems
  return cartItems || [] // The empty cart
}

export const deleteFromUserCart = async (userId: string, cartItemsIds: string[]): Promise<ICartItem[]> => {
  const cart = await CartService.findActiveCartOfUser(userId)
  return (await CartService.deleteFromCart(cart.id, cartItemsIds)).cartItems
}

export const deleteOrderById = async (orderId: string) => await Order.deleteOne({ _id: orderId })


export const deleteAllFromCart = async (userId: string): Promise<ICartItem[]> => {
  const cart = await CartService.findActiveCartOfUser(userId)
  return (await CartService.deleteAllFromCart(cart.id)).cartItems
}
export const addAnimalsToUser = async (userId: string, animal: JsonAnimal) => {
  const user = await User.findById(userId)
  if (user) {
    user.animals.push(animal._id)
    await user.save()
    return user.animals
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}

export const deleteFromAnimal = async (animalId: string): Promise<IAnimal> => {
  const animal = await Animal.findById(animalId)
  if (animal) {
    console.log(animal)
    console.log('animalId -> ', animalId)
    Animal.deleteOne({ _id: animalId })
    await animal.save()
    return animal
  } else {
    throw new JsonError(`Can\'t find animal with id ${animalId}`)
  }
}

export const updateFromAnimal = async (
  animalId: string,
  updateAnimal: JsonAnimal
): Promise<IAnimal> => {
  const animal = await Animal.findById(animalId)
  if (animal) {
    console.log(animal)
    await AnimalService.patchAnimal(animalId, updateAnimal)
    return animal
  } else {
    throw new JsonError(`Can\'t find animal with id ${animal}`)
  }
}

export const addPictureToUser = async (userId: string, picture: JsonPicture) => {
  const user = await User.findById(userId)
  if (user) {
    try {
      await User.findByIdAndUpdate({ _id: userId }, { profilePicture: picture })
      return user
    } catch (err) {
      throw new JsonError(err.message)
    }
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}

export const addPictureToAnimal = async (animalId: string, picture: JsonPicture) => {
  const animal = await Animal.findById(animalId)
  if (animal) {
    await animal.updateOne({ picture: picture })
    await animal.save()
    return animal
  } else throw new JsonError(`Can\'t find animal with id ${animalId}`)
}

export const getAllJsonUser = (): Promise<JsonUser[]> => User.find({}).then((x) => x.map(userToJsonUser))


export const getUserOrders = async (userId: string): Promise<JsonOrder[]> =>
  (await Order.find({ userId: userId })).map(OrderService.orderToJsonOrder)

export const getAllOrders = async (): Promise<JsonOrder[]> =>
  (await Order.find({})).map(OrderService.orderToJsonOrder)

export const createUserOrder = async (userId: string, paymentDetails: JsonPaymentDetails) => {
  const oldCart = await CartService.findActiveCartOfUser(userId)

  await CartService.generateNewCartForUser(userId)

  return await OrderService.createOrderForUser(oldCart, paymentDetails, userId)
}

export const patchUser = async (id: string, patch: JsonUserPatch): Promise<JsonUser> => {
  const user = await User.findById(id)
  if (user.address == undefined) {
    user.address = { country: ' ', city: ' ', street: ' ', zip: ' ' }
  }
  if (patch.zip) {
    user.address.zip = patch.zip
  }
  if (patch.city) {
    user.address.city = patch.city
  }
  if (patch.street) {
    user.address.street = patch.street
  }
  if (patch.country) {
    user.address.country = patch.country
  }
  if (patch.lastName) {
    user.lastName = patch.lastName
  }
  if (patch.firstName) {
    user.firstName = patch.firstName
  }
  if (patch.username) {
    user.username = patch.username
  }
  if (patch.password) {
    user.password = patch.password
  }
  if (patch.email) {
    user.email = patch.email
  }
  if (patch.description) {
    user.description = patch.description
  }

  await user.save()
  return userToJsonUser(user)
}
