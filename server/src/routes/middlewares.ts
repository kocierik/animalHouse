import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { STATUS_UNAUTHORIZED, SECRET } from '../const'
import JsonError, { JsonVisibilityError } from '../json/JsonError'
import * as AdminService from '../services/admin-service'

export interface AuthData {
  username: string
  id: string
}

export const log = (req: Request, _: Response, next: Function) => {
  console.log(`[INFO] ${req.method} to ${req.originalUrl}`)
  next()
}


export const verifyToken = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization']
  if (authHeader !== undefined) {
    jwt.verify(authHeader, SECRET, (err, authData) => {
      if (err) res.sendStatus(STATUS_UNAUTHORIZED).json(new JsonVisibilityError(`error validating token: ${err}`))
      else {
        req.authData = authData.authData
        next()
      }
    })
  } else res.sendStatus(STATUS_UNAUTHORIZED).json(new JsonVisibilityError("Authentication header not found"))
}

export const verifyUser = (req: Request, res: Response, next: Function) => {
  const authId = req.authData.id
  const pathId = req.params.id

  if (pathId === authId || AdminService.isAdmin(authId)) next()
  else return res.status(STATUS_UNAUTHORIZED).json(new JsonVisibilityError("Can't access user with id " + pathId))
}
