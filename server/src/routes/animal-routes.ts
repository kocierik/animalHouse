import * as Const from '../const'
import { Request, Response } from 'express'
import JsonError from '../json/JsonError'
import * as AnimalService from '../services/animal-service'
import { JsonAnimal } from '@/json/JsonAnimal'
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
 *          description: animal code
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
 *              $ref: "#/definitions/Animal"
 * */
export const getAnimal = async (req: Request, res: Response) => {
  const animal = await AnimalService.findById(req.params.id)

  if (!animal)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Can\'t find animal with id ${req.params.id} `))
    
  return res.status(Const.STATUS_OK).json(animal)
}

/**
 * @swagger
 * /animals/{id}:
 *   post:
 *     tags:
 *     - animals
 *     summary: Add an animal
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Animal"
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Animal"
 * */
export const postAnimal = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const animal = req.body as JsonAnimal
    return res.status(Const.STATUS_OK).json(await AnimalService.addAnimalsToUser(pathId, animal))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{uid}/animals/{aid}: {
 *  put: {
 *    tags: [ users ],
 *    summary: edit a animal,
 *    parameters: [
 *      {
 *        in: path,
 *         name: uid,
 *         type: string,
 *         required: true,
 *         description: user id
 *      },
 *       {
 *         in: path,
 *         name: aid,
 *         type: string,
 *         required: true,
 *         description: animal id
 *      },
 *      {
 *         in: body,
 *         name: Animal,
 *         description: Animal info,
 *         schema: {
 *           type: object,
 *           schema: {
 *            $ref: "#/definitions/Animal"
 *          }
 *         }
 *        }
 *      ],
 *       security: [
 *          {JWT: []}
 *       ],
 *       responses: {
 *         200: {
 *           description: Success,
 *           schema: {
 *             $ref: "#/definitions/Animal"
 *    }
 *  }
 * }
 * }
 * }
 *
 * */
export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.aid
    let animal = req.body as JsonAnimal
    return res.status(Const.STATUS_OK).json(await AnimalService.updateFromAnimal(animalId, animal))
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error)
  }
}

/**
 * @swagger
 * /users/{uid}/animals/{aid}: {
 *  delete: {
 *      tags: [users ],
 *      summary: Retrive reviews about a product,
 *      parameters: [
 *       {
 *         in: path,
 *         name: uid,
 *         type: string,
 *         required: true,
 *         description: Id of the user to be searched
 *      },
 *       {
 *          in: path,
 *         name: aid,
 *         type: string,
 *         required: true,
 *         description: Id of the animal to be deleted
 *      }
 *      ],
 *       security: [  {JWT: []} ],
 *       responses: {
 *         200: {
 *           description: successful operation
 *      }
 *     }
 *   }
 * }
 * */
export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.aid
    return res.status(Const.STATUS_OK).json(await AnimalService.deleteFromAnimal(animalId))
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error)
  }
}

/**
 * @swagger
 *  /users/{id}/animals:
 *    get:
 *      tags:
 *      - animals
 *      summary: Finds all animals of an user
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              $ref: "#/definitions/Animal"
 * */
export const findAnimalsUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    return res.status(Const.STATUS_OK).json(await AnimalService.findAnimalsUser(userId))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
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
 *            $ref: "#/definitions/AnimalPatch"
 *      responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              $ref: "#/definitions/Animal"
 */

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
