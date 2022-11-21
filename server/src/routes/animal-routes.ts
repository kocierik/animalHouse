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

// /**
//  * @swagger
//  * /animals/{aid}/edit:
//  *  put:
//  *      tags:
//  *      - animals
//  *      summary: edit a animal
//  *       parameters:
//  *       - in: path
//  *         name: aid
//  *         type: string
//  *         required: true
//  *         description: animal id
//  *       - in: body
//  *         name: Animal
//  *         description: Animal info
//  *         schema:
//  *           type: object
//  *           properties:
//  *             _id:
//  *               type: string
//  *             type:
//  *               type: string
//  *             name:
//  *               type: string
//  *             userId:
//  *               type: string
//  *             age:
//  *               type: number
//  *             picture:
//  *               type: object
//  *               properties:
//  *                 filename:
//  *                   type: string
//  *                 mimetype:
//  *                   type: string
//  *                 size:
//  *                   type: number
//  *       security:
//  *         - JWT: []
//  *       responses:
//  *         200:
//  *           description: Success
//  *           schema:
//  *             $ref: "#/definitions/Animal"
//  *     
// * */
export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.aid
    let animal = req.body as JsonAnimal
    return res.status(Const.STATUS_OK).json(await AnimalService.updateFromAnimal(animalId, animal))
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error)
  }
}


// /**
//  * @swagger
//  * /animals/{aid}/delete:
//  *  delete:
//  *      tags:
//  *      - users
//  *       summary: Retrive reviews about a product
//  *       parameters:
//  *       - in: path
//  *         name: aid
//  *         type: string
//  *         required: true
//  *         description: Id of the animal to be deleted
//  *       security:
//  *         - JWT: []
//  *       responses:
//  *         200:
//  *           description: successful operation
//  * */
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
 *              $ref: "#/components/schemas/Animal"
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

