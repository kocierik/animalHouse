import * as Const from '../const'
import { Request, Response } from 'express'
import JsonError from '../json/JsonError'
import * as LocationService from '../services/location-service'

/**
 * @swagger
 * /location:
 *   get:
 *     tags:
 *     - locations
 *     summary: get all locations
 *     responses:
 *       200:
 *         description: get location
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/components/schemas/Location"
 * */
export const getLocation = async (_: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await LocationService.getAllLocation())
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }

}
