import * as Const from '../const'
import { Request, Response } from 'express'
import JsonError from '../json/JsonError'
import * as AnimalService from '../services/animal-service'
import { AnimalPatch } from '@/json/patch/AnimalPatch'

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
 *
 *  /animals/{id}:
 *    patch:
 *      tags:
 *      - animals
 *      summary: patch
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id of the animal
 *        - in: body
 *          schema:
 *            $ref: "#/components/schemas/AnimalPatch"
 *      responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              $ref: "#/components/schemas/Animal"
 * */
export const patchAnimal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body as AnimalPatch
    return res.status(Const.STATUS_OK).json(AnimalService.patchAnimal(id, body))
  } catch (err) {
    if (err instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(err)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}
