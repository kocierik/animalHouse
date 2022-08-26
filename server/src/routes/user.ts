import User from '../entities/User'
import Score from '../entities/Score'
import { Game } from '../entities/Community'
import { Request, Response } from 'express'
import { JsonUserCreation, JsonLogin} from '../json/JsonUser'
import { JsonError } from '../json/JsonError'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../const'
import Product, { IProduct } from '../entities/Product'
import Cart, { ICart, IProductInstance } from '../entities/Cart'
import { Types } from 'mongoose'

const SECRET = 'bigSecret'

interface AuthData {
  username: string,
  id: string
}

export const verifyToken = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization']
  if (authHeader !== undefined) {
    jwt.verify(authHeader, SECRET, (err, authData) => {
      if (err)
        res.sendStatus(STATUS_UNAUTHORIZED)
      else {
        req.authData = authData.authData
        next()
      }
    })
  } else
    res.sendStatus(STATUS_UNAUTHORIZED)
}

export const registerPost = async (req: Request, res: Response) => {
  const userCreation = req.body as JsonUserCreation
  
  // Password checks
  if (userCreation.password.length < 8)
    return res.status(STATUS_BAD_REQUEST).send('password must be at least 8 characters long')

  // Look if username is already taken
  if ((await User.find({'username' : userCreation.username})).length != 0)
    return res.status(STATUS_BAD_REQUEST).send(`username ${userCreation.username} already taken`)

  // Look if email is well formed
  /*const regExp = new RegExp('')
  if (!regExp.test(userCreation.password))
    return res.status(STATUS_BAD_REQUEST).send(`email ${userCreation.email} is malformed`)*/

  // Look if email is already taken
  if ((await User.find({'email' : userCreation.email})).length != 0)
    return res.status(STATUS_BAD_REQUEST).send(`email ${userCreation.email} already taken`)

  const user = new User()
  user.username = userCreation.username
  user.email = userCreation.email
  user.password =  userCreation.password//bcrypt.hashSync(userCreation.password, 5)
  user.firstName = userCreation.firstName
  user.lastName = userCreation.lastName
  user.phone = "todo"

  await user.save()
  return res.status(STATUS_OK).send('user created successfully') 
}

export const loginPost = async (req: Request, res: Response) => {
  const login = req.body as JsonLogin 

  const hashed = login.password//bcrypt.hashSync(login.password, 5)
  const result = await User.find({'username' : login.username, 'password' : hashed})
  if (result.length === 1) {
    const authData: AuthData = {
      username: result[0].username,
      id: result[0]._id.toString()
    }
    const token = await jwt.sign({authData: authData}, SECRET);
    return res.json({token})
  }
  else return res.status(STATUS_UNAUTHORIZED).json(new JsonError("invalid username or password"))
}

export const getCurrentUser = async (req: Request, res: Response) => res.json(req.authData)

export const getUser = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  // Check user 
  if (pathId !== authId)
    res.status(STATUS_UNAUTHORIZED).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    const result = await User.find({'username' : req.authData.username, 'id': pathId})
    if (result.length !== 1) {
      res.status(STATUS_BAD_REQUEST).json(new JsonError('Invalid id ' + pathId))
    }
    const jsonUser = {
      id: result[0]._id,
      username: result[0].username,
      firstName: result[0].firstName,
      lastName: result[0].lastName,
      email: result[0].email,
      phone: result[0].phone
      // TODO more fields
    }
    res.json(jsonUser)
  }
}

export const putScore = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  // Check user 
  if (pathId !== authId)
    res.status(STATUS_UNAUTHORIZED).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    // Check game id 
    const gameId = req.body.gameId

    if (gameId === null || gameId === undefined || (await Game.find({_id: gameId})).length != 1)
      return res.status(STATUS_BAD_REQUEST).json(new JsonError("invalid game id " + gameId))

    const score = new Score()
    score.userId = pathId 
    score.gameId = req.body.gameId
    score.value = req.body.score
    await score.save()
    return res.status(STATUS_OK).json(score)
  }
}

export const getScore = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  // Check user 
  if (pathId !== authId)
    res.status(STATUS_UNAUTHORIZED).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    if (req.query.id) {
      // Check if a game with that id exists
      if (await Game.exists({_id: req.query.id}))
        return res.status(STATUS_OK).json(await Score.find({userId: pathId, gameId: req.query.id}))
      else
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid game id ${req.query.id}`))
    }
    return res.status(STATUS_OK).json(await Score.find({userId: pathId}))
  }
}

export const putCart = async (req: Request, res: Response) => {
  /* TODO backend should also check wheter all fields of a product are correct.
    e.g. if you buy a tshirt you can't only specify the color, you need also the
    size. */

  // Check user 
  const authId = req.authData.id
  const pathId = req.params.id
  if (pathId !== authId)
    res.status(STATUS_UNAUTHORIZED).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    let pqs: IProductInstance[]
    try {
      pqs = req.body as IProductInstance[] 
    } catch(ex) {
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(ex.message))
    }

    // Check input data
    for (let pq of pqs) {
      let doc: IProduct
      try {
        doc = await Product.findOne({ _id : pq.productId})
      } catch(ex) {
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Cannot find product with id ${pq.productId}`))
      }
      if (doc === null)
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Product ${pq.productId} not found`))

      let evalOpt = (x: any, y: any[]) => x === null || x === undefined || y.includes(x) 

      if (!evalOpt(pq.color, doc.colors))
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Color ${pq.color} isn't available for this product`))
      if (!evalOpt(pq.size, doc.sizes))
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Size ${pq.size} isn't available for this product`))
      if (!evalOpt(pq.type, doc.types))
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Type ${pq.type} isn't available for this product`))
    }

    // Check if we have to create the cart for the current user
    try {
      const response = await Cart.exists({userId: pathId})
      if (!response) {
        // We have to create an empty cart
        let cart = new Cart()
        cart.userId = pathId
        cart.productInstances = []
        await cart.save()
      }
    } catch(ex) {
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(ex.message))
    }

    let cart: any
    try {
      cart = await Cart.findOne({userId: pathId})
    } catch(ex) {
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Can\'t find cart with user id ${pathId}`))
    }
    cart.productInstances = cart.productInstances.concat(pqs)

    try {
      await cart.save()
    } catch(ex) {
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(ex.message))
    }

    return res.status(STATUS_OK).json(cart.productInstances)
  }
}

export const getCart = async (req: Request, res: Response) => {
  // Check user 
  const authId = req.authData.id
  const pathId = req.params.id
  if (pathId !== authId)
    res.status(STATUS_UNAUTHORIZED).json(new JsonError('Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else 
    return res.status(STATUS_OK).json(await constructCartForUser(pathId))
}

export const deleteCart = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  if (pathId !== authId)
    res.status(STATUS_UNAUTHORIZED).json(new JsonError('Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    const piIds = (req.body as string[]).map(x => new Types.ObjectId(x))
    let userCart = await Cart.findOne({userId: pathId})

    if (!userCart)
      return res.status(STATUS_BAD_REQUEST).json(new JsonError('Cart is empty'))

    // Get all product instance ids that are passed into the body of the call but are not present into the cart
    const invalids = piIds.filter(piId => !includesId(piId, userCart.productInstances.map(pii => pii._id)))

    if (invalids.length !== 0)
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(`${invalids} are not product instances of this cart`))

    // Remove passed product instance ids from the cart
    userCart.productInstances = userCart.productInstances.filter(pi => !includesId(pi._id, piIds))

    await userCart.save()

    return res.status(STATUS_OK).json(await constructCartForUser(pathId))
  } 
}

// Common functions 
const constructCartForUser = async (userId: string) => {
        const promises = (await Cart.findOne({userId: userId}))?.productInstances
        return promises? await Promise.all(promises) : [] // The empty cart
}

const includesId = (id: Types.ObjectId, collection: any[]): boolean =>
  collection.reduce((old: boolean, x: any)=> x._id.toString() === id.toString() || old , false)
