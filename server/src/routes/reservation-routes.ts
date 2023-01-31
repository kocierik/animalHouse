import * as Const from '../const'
import { Request, Response } from 'express'
import User from '../entities/User'
import * as ReservationService from '../services/reservation-service'
import { IReservation } from '../entities/Reservation'
import JsonError from '../json/JsonError'

/**
 * @swagger
 * /users/{id}/reservations:
 *   get:
 *     tags:
 *     - reservations
 *     summary: get all reservations for the specified user
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
 *         description: got reservations
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
export const getReservations = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      return res.status(Const.STATUS_OK).json(await ReservationService.findReservationsByUserId(req.params.id))
    }
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{id}/reservations:
 *   post:
 *     tags:
 *     - reservations
 *     summary: Add a reservations for the specified user
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the user
 *       - in: body
 *         name: body
 *         description: Reservation
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             animalId:
 *               type: string
 *             serviceName:
 *               type: string
 *             userId:
 *               type: string
 *             date:
 *               type: string
 *             information:
 *               type: string
 *             locationId:
 *               type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: sent reservation
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
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

/**
 * @swagger
 * /animals/{id}/reservations:
 *   get:
 *     tags:
 *     - reservations
 *     summary: get all reservations from an animal
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the animal
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: got reservations
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
export const getAnimalReservations = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.id
    return res.status(Const.STATUS_OK).json(await ReservationService.findReservationsByAnimalId(animalId))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     tags:
 *     - reservations
 *     summary: delete a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the reservation
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: deleted
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    return res.status(Const.STATUS_OK).json(await ReservationService.deleteReservation(pathId))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     tags:
 *     - reservations
 *     summary: get a single reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the reservation
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: got reservations
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
export const getSingleReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id
    return res.status(Const.STATUS_OK).json(await ReservationService.getSingleReservation(reservationId))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /reservations:
 *   get:
 *     tags:
 *     - reservations
 *     summary: '[ONLY FOR ADMINS] get all reservations'
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: got reservations
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await ReservationService.getAllReservations())
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}


// header error
/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     tags:
 *     - reservations
 *     summary: edit a reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the reservation
 *       - in: body
 *         name: body
 *         description: Reservation
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             date:
 *               type: string
 *             information:
 *               type: string
 *             locationId:
 *               type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: modify reservation
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/definitions/Reservation"
 * */
export const putReservation = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const reservation = req.body as IReservation
    return res.status(Const.STATUS_OK).json(await ReservationService.putReservation(pathId, reservation))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}
