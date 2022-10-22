import { JsonLogin } from '../json/JsonUser'
import { Request, Response } from 'express'
import JsonError, { JsonVisibilityError } from '../json/JsonError'
import * as jwt from 'jsonwebtoken'
import * as AdminService from '../services/admin-service'
import * as Const from '../const'

export const postLogin = async (req: Request, res: Response) => {
  try {
    const authData = await AdminService.verifyLogin(req.body as JsonLogin)
    const token = await jwt.sign({ authData: authData }, Const.SECRET)
    return res.status(Const.STATUS_OK).json({ token })
  } catch (err) {
    if (err instanceof JsonVisibilityError)
      return res.status(Const.STATUS_UNAUTHORIZED).json(err)
    else if (err instanceof JsonError)
      return res.status(Const.STATUS_BAD_REQUEST).json(err)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Invalid login body: ${err.message}`))
  }
}

