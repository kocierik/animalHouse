import * as Const from '../const'
import { Request, Response } from 'express'
import User from '../entities/User'
import * as ReservationService from '../services/reservation-service'

/**
 * @swagger
 *  /users/:id/reservation:
 *
 * */
export const getUserReservations = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if (user){
    console.log(user)
    return res.status(Const.STATUS_OK).json(await ReservationService.findReservationsByUserId(req.path.id))
  } else {
    return res.status(Const.STATUS_OK).json(user)
  }
}
