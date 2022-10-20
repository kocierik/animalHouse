import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import User from '../entities/User'
import Score from '../entities/Score'
import Admin from '../entities/Admin'
import { IProductInstance } from '../entities/Cart'
import { AuthData } from './middlewares'
import { JsonUserCreation, JsonLogin } from '../json/JsonUser'
import { JsonAnimal } from '../json/JsonAnimal'
import JsonError from '../json/JsonError'
import { SECRET, STATUS_OK, STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../const'
import * as Const from '../const'
import * as UserService from '../services/userService'
import * as GameService from '@/services/gameService'

export const registerPost = async (req: Request, res: Response) => {
  try {
    const userCreation = req.body as JsonUserCreation
    UserService.validateUserCreation(userCreation)
    const user = UserService.userCreationToUser(userCreation)
    await user.save()
    return res.status(STATUS_OK).json(user)
  } catch (err) {
    if (err instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(err)
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}

export const loginPost = async (req: Request, res: Response) => {
  let login = null
  try {
    login = req.body as JsonLogin
  } catch (err) {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError("Invalid login body"))
  }

  const hashed = login.password //bcrypt.hashSync(login.password, 5)

  let authData: AuthData

  if (login.admin) {
    const result = await Admin.find({ username: login.username, password: hashed })
    if (result.length !== 1) {
      return res.status(STATUS_UNAUTHORIZED).json(new JsonError('invalid admin username or password'))
    }
    authData = {
      username: result[0].username,
      id: result[0]._id.toString(),
    }
  } else {
    const result = await User.find({ username: login.username, password: hashed })
    if (result.length !== 1) {
      return res.status(STATUS_UNAUTHORIZED).json(new JsonError('invalid username or password'))
    }
    authData = {
      username: result[0].username,
      id: result[0]._id.toString(),
    }
  }

  const token = await jwt.sign({ authData: authData }, SECRET)
  return res.json({ token })
}

export const getCurrentUser = async (req: Request, res: Response) => res.json(req.authData)

export const getUser = async (req: Request, res: Response) => {
  const pathId = req.params.id
  const user = await UserService.findUserById(pathId)
  if (user)
    return res.status(Const.STATUS_OK).json(UserService.userToJsonUser(user))
  else
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Cannot find user with id ${pathId}`))
}

export const putScore = async (req: Request, res: Response) => {
  const pathId = req.params.id
  const gameId = req.body.gameId

  if (!gameId || !await GameService.isValidGame(gameId))
    return res.status(STATUS_BAD_REQUEST).json(new JsonError('invalid game id ' + gameId))
  const score = new Score()
  /* TODO fai un interfaccia*/
  score.userId = pathId
  score.gameId = req.body.gameId
  score.value = req.body.score
  await score.save()
  return res.status(STATUS_OK).json(score)
}

export const getScore = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (req.query.id) {
    // Check if a game with that id exists
    if (await GameService.isValidGame(req.query.id))
      return res.status(STATUS_OK).json(await GameService.findScore(pathId, req.query.id))
    else return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid game id ${req.query.id}`))
  }
  return res.status(STATUS_OK).json(await GameService.findScore(pathId))
}

export const putCart = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const pqs = req.body as IProductInstance[]
    return res.status(Const.STATUS_OK).json(await UserService.addProductToUserCart(pathId, pqs))
  } catch (ex) {
    if (ex instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

export const getCart = async (req: Request, res: Response) => {
  try {
    return res.status(STATUS_OK).json(await UserService.getUserProducts(req.param.id))
  } catch (ex) {
    if (ex instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const piIds = (req.body as string[])
    return res.status(STATUS_OK).json(await UserService.deleteFromUserCart(pathId, piIds))
  } catch (ex) {
    if (ex instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

export const putAnimal = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const animals = req.body as JsonAnimal[]
    return res.status(STATUS_OK).json(UserService.addAnimalsToUser(pathId, animals))
  } catch (ex) {
    if (ex instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}
