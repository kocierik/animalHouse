import * as Const from '../const'
import { Request, Response } from 'express'
import User from '../entities/User'
import * as ReservationService from '../services/reservation-service'
import Reservation, { IReservation } from '../entities/Reservation'
import JsonError from '../json/JsonError'

/**
 * @swagger
 * /users/{id}/reservations:
 *   get:
 *     tags:
 *     - users
 *     summary: Add an reservations for the specified user
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the user
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/User"
 * */
export const getUserReservations = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if (user){
    return res.status(Const.STATUS_OK).json(await ReservationService.findReservationsByUserId(req.params.id))
  } else {
    return res.status(Const.STATUS_OK).json(user)
  }
}


export const postReservation = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const reservation = req.body as IReservation
    return res.status(Const.STATUS_OK).json(await ReservationService.postReservation(pathId, reservation))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

