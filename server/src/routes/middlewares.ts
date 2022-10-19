import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { STATUS_UNAUTHORIZED, SECRET } from '../const'
import JsonError from '../json/JsonError'
import Admin from '../entities/Admin'

export interface AuthData {
  username: string
  id: string
}

export const verifyToken = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization']
  if (authHeader !== undefined) {
    jwt.verify(authHeader, SECRET, (err, authData) => {
      if (err) res.sendStatus(STATUS_UNAUTHORIZED)
      else {
        req.authData = authData.authData
        next()
      }
    })
  } else res.sendStatus(STATUS_UNAUTHORIZED)
}

export const verifyUser = (req: Request, res: Response, next: Function) => {
  const authId = req.authData.id
  const pathId = req.params.id

  if (pathId === authId || isAdmin(authId)) next()
  else return res.status(STATUS_UNAUTHORIZED).json(new JsonError("Can't access user with id " + pathId))
}

/* Utils */
const isAdmin = async (id: string): Promise<boolean> => {
  const x = await Admin.exists({ _id: id })
  return x ? true : false
}
