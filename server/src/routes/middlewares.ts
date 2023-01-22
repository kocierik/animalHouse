import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { STATUS_UNAUTHORIZED, SECRET } from '../const'
import JsonError, { JsonVisibilityError } from '../json/JsonError'
import * as AdminService from '../services/admin-service'
import multer from 'multer'
import * as Const from '../const'
import { pictureDir } from './router'

export interface AuthData {
  username: string
  id: string
}

export const verifyToken = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization']
  if (authHeader) {
    jwt.verify(authHeader, SECRET, (err, authData) => {
      if (err) {
        return res.status(STATUS_UNAUTHORIZED).json(new JsonVisibilityError(`error validating token: ${err}`))
      } else {
        req.authData = authData.authData
        return next()
      }
    })
  } else {
    return res.status(STATUS_UNAUTHORIZED).json(new JsonVisibilityError('Authentication header not found'))
  }
}

export const verifyUser = async (req: Request, res: Response, next: Function) => {
  const authId = req.authData.id
  const pathId = req.params.id

  if (pathId === authId || (await AdminService.isAdmin(authId))) {
    return next()
  } else {
    return res.status(STATUS_UNAUTHORIZED).json(new JsonVisibilityError("Can't access user with id " + pathId))
  }
}

export const verifyAdmin = async (req: Request, res: Response, next: Function) => {
  const authId = req.authData.id

  if (await AdminService.isAdmin(authId)) {
    return next()
  } else {
    return res.status(STATUS_UNAUTHORIZED).json(new JsonVisibilityError("You must log as an admin to do this operation"))
  }
}

export const log = (req: Request, _: Response, next: Function) => {
  console.log(`[INFO] ${req.method} to ${req.originalUrl}`)
  return next()
}

// Multer
const storage = multer.diskStorage({
  destination: pictureDir,
  filename: (req: Request, _: any, cb: Function) => {
    cb(null, req.params.id)
  }
})

const upload = multer({ storage: storage })

export const multerMiddleware = (s: string) => upload.single(s)
