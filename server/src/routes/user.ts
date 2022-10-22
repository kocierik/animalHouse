import { Request, Response } from 'express'
import { IProductInstance } from '../entities/Cart'
import { JsonUserCreation, JsonLogin } from '../json/JsonUser'
import { JsonAnimal } from '../json/JsonAnimal'
import Score from '../entities/Score'
import JsonError from '../json/JsonError'
import * as jwt from 'jsonwebtoken'
import * as Const from '../const'
import * as UserService from '../services/userService'
import * as GameService from '../services/gameService'

export const registerPost = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await UserService.createUser(req.body as JsonUserCreation))
  } catch (err) {
    if (err instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(err)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}

export const loginPost = async (req: Request, res: Response) => {
  try {
    const authData = await UserService.verifyLogin(req.body as JsonLogin)
    const token = await jwt.sign({ authData: authData }, Const.SECRET)
    return res.status(Const.STATUS_OK).json({ token })
  } catch (err) {
    if (err instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(err)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Invalid login body: ${err.message}`))
  }
}

export const getCurrentUser = async (req: Request, res: Response) =>
  res.status(Const.STATUS_OK).json(req.authData)

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
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError('invalid game id ' + gameId))
  const score = new Score()
  /* TODO fai un interfaccia*/
  score.userId = pathId
  score.gameId = req.body.gameId
  score.value = req.body.score
  await score.save()
  return res.status(Const.STATUS_OK).json(score)
}

export const getScore = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (req.query.id) {
    // Check if a game with that id exists
    if (await GameService.isValidGame(req.query.id))
      return res.status(Const.STATUS_OK).json(await GameService.findScore(pathId, req.query.id))
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Invalid game id ${req.query.id}`))
  }
  return res.status(Const.STATUS_OK).json(await GameService.findScore(pathId))
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
    return res.status(Const.STATUS_OK).json(await UserService.getUserProducts(req.param.id))
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
    return res.status(Const.STATUS_OK).json(await UserService.deleteFromUserCart(pathId, piIds))
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
    return res.status(Const.STATUS_OK).json(UserService.addAnimalsToUser(pathId, animals))
  } catch (ex) {
    if (ex instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}
