import { JsonUser, JsonUserCreation, JsonPicture } from '../json/JsonUser'
import JsonError, { JsonVisibilityError } from '../json/JsonError'
import User, { IUser } from '../entities/User'
import * as ProductService from './product-service'
import * as CartService from './cart-service'
import * as AnimalService from './animal-service'
import { IProductInstance } from '../entities/Cart'
import { JsonAnimal } from '../json/JsonAnimal'
import { JsonLogin } from '../json/JsonUser'
import { AuthData } from '../routes/middlewares'
import { IPicture } from '../entities/User'
import Animal from '../entities/Animal'
import { IAnimal } from '../entities/Animal'
import { Address, IAddress } from '../entities/Address'

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
    id: result[0]._id.toString(),
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

export const userToJsonUser = (user: IUser): JsonUser => ({
  _id: user._id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  description: user.description,
  animals: user.animals.map(AnimalService.animalToJsonAnimal),
  profilePicture: user.profilePicture,
  address: user.address as IAddress,
})

export const pictureToJsonPicture = (pic: IPicture) => ({
  size: pic.size,
  filename: pic.filename,
  mimetype: pic.mimetype,
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

export const addAnimalsToUser = async (userId: string, animal: JsonAnimal) => {
  const user = await User.findById(userId)
  if (user) {
    user.animals.push(animal)
    await user.save()
    return user.animals
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}

export const deleteFromAnimal = async (userId: string, animalId: string): Promise<IAnimal[]> => {
  const user = await User.findById(userId)
  if (user) {
    const animal = await Animal.findById(animalId)
    console.log(animal)
    console.log('animalId -> ', animalId)
    const newAnimals = user.animals.filter((x) => x._id.toString() !== animalId)
    user.animals = newAnimals
    console.log(newAnimals)
    await user.save()
    return user.animals
  } else {
    throw new JsonError(`Can\'t find user with id ${userId}`)
  }
}

export const updateFromAnimal = async (
  userId: string,
  animalId: string,
  updateAnimal: JsonAnimal
): Promise<IAnimal[]> => {
  const user = await User.findById(userId)
  if (user) {
    const animal = await Animal.findById(animalId)
    console.log(animal)
    user.animals.map((x) => {
      if (x._id.toString() === animalId) {
        x.age = updateAnimal.age
        x.name = updateAnimal.name
        x.type = updateAnimal.type
      }
    })
    await user.save()
    return user.animals
  } else {
    throw new JsonError(`Can\'t find user with id ${userId}`)
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

export const addPictureToAnimal = async (userId: string, animalId: string, picture: JsonPicture) => {
  console.log('picture --> ', picture)
  const user = await User.findById(userId)
  if (user) {
    try {
      let index = 0
      user.animals.map((x, i) => {
        index = i
        if (x._id.toString() === animalId) {
          x.picture = picture
        }
      })
      console.log('utente con animale cambiato ', user)
      await user.save()
      return user.animals[index]
    } catch (err) {
      throw new JsonError(err.message)
    }
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}

export const getAllJsonUser = (): Promise<JsonUser[]> => User.find({}).then((x) => x.map(userToJsonUser))

export const updateUserDescription = async (userId: string, updateUser: JsonUser) => {
  const user = await User.findById(userId)
  if (user) {
    try {
      await User.findByIdAndUpdate({ _id: userId }, updateUser)
      return user
    } catch (error) {
      throw new JsonError(error.message)
    }
  } else throw new JsonError(`Can\'t find user with id ${userId}`)
}
