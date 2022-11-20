import * as Const from '../const'
import { Request, Response } from 'express'
import JsonError from '../json/JsonError'
import * as AnimalService from '../services/animal-service'
import { JsonAnimal } from '@/json/JsonAnimal'

/**
 * @swagger
 *  /animals/codes:
 *    get:
 *      tags:
 *      - animals
 *      summary: Finds all animal tags
 *      responses:
 *        200:
 *          description: Ok
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *              value:
 *                type: string
 * */
export const getAnimalCodes = async (_: Request, res: Response) =>
  res.status(Const.STATUS_OK).json(await AnimalService.getAnimalCodes())

/**
 * @swagger
 *
 *  /animals/{id}:
 *    get:
 *      tags:
 *      - animals
 *      summary: Finds detail of an animal
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id of the animal
 *      responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              $ref: "#/components/schemas/Animal"
 * */
export const getAnimal = async (req: Request, res: Response) => {
  const animal = await AnimalService.findById(req.params.id)

  if (!animal)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Can\'t find animal with id ${req.params.id} `))

  // Check user
  if (animal.userId !== req.authData.id)
    return res
      .status(Const.STATUS_UNAUTHORIZED)
      .json(new JsonError("Can't access animal with id " + animal._id + ' with this user'))
  else {
    return res.status(Const.STATUS_OK).json(animal)
  }
}


/**
 * @swagger
 * /users/{id}/animals:
 *   put:
 *     tags:
 *     - animals
 *     summary: Add an animal for the specified user
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the user
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Animal"
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Animal"
 * */
export const putAnimal = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const animal = req.body as JsonAnimal
    return res.status(Const.STATUS_OK).json(await AnimalService.addAnimalsToUser(pathId, animal))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}