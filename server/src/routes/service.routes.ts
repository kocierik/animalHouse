
import * as Const from '../const'
import { Request, Response } from 'express'
import * as ServiceService from '../services/service-service'
import JsonError from '../json/JsonError'


/**
 * @swagger
 *  /services:
 *    get:
 *      tags:
 *      - services
 *      summary: get all services
 *      responses:
 *        200:
 *          description: services
 * */
export const getAllServices = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await ServiceService.findAllService())
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}