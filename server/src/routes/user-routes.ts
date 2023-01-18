import { Request, Response } from 'express'
import { ICartItem } from '../entities/CartItem'
import { JsonUserCreation, JsonLogin, JsonPicture, JsonUser } from '../json/JsonUser'
import { JsonAnimal } from '../json/JsonAnimal'
import Score from '../entities/Score'
import JsonError, { JsonVisibilityError } from '../json/JsonError'
import * as jwt from 'jsonwebtoken'
import * as Const from '../const'
import * as UserService from '../services/user-service'
import * as GameService from '../services/game-service'
import { JsonCartItemCreation } from '../json/JsonCartItemCreation'
import { JsonUserPatch } from '../json/patch/UserPatch'
import { JsonPaymentDetails } from '../json/JsonPaymentDetails'

/**
 * @swagger
 *
 * /users/register:
 *   post:
 *     tags:
 *     - users
 *     summary: Create new user
 *     parameters:
 *     - in: body
 *       name: body
 *       description: UserCreation
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             email:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: "#/components/schemas/User"
 * */
export const registerPost = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await UserService.createUser(req.body as JsonUserCreation))
  } catch (err) {
    if (err instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(err)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *     - users
 *     summary: Login as an user
 *     parameters:
 *     - in: body
 *       name: body
 *       description: login
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 * */
export const loginPost = async (req: Request, res: Response) => {
  try {
    const authData = await UserService.verifyLogin(req.body as JsonLogin)
    const token = await jwt.sign({ authData: authData }, Const.SECRET)
    return res.status(Const.STATUS_OK).json({ token })
  } catch (err) {
    if (err instanceof JsonVisibilityError) return res.status(Const.STATUS_UNAUTHORIZED).json(err)
    else if (err instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(err)
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Invalid login body: ${err.message}`))
  }
}

/**
 * @swagger
 *
 * /users/current:
 *   get:
 *     tags:
 *     - users
 *     summary: Retrieve information about the current user
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             _id:
 *               type: string
 *
 * */
export const getCurrentUser = (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(req.authData)
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error.message)
  }
}

/**
 *@swagger
 * /users:
 *   get:
 *    tags:
 *      - users
 *    summary: Gets all users
 *    responses:
 *      200:
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *            $ref: "#/components/schemas/User"
 */
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await UserService.getAllJsonUser())
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error.message)
  }
}

/**
 * @swagger
 * /users/{id}: {
 *   get: {
 *     tags: [ users ],
 *     summary: Get a user by ID,
 *     parameters: [
 *      {
 *         in: path,
 *       name: id,
 *       type: string,
 *       required: true,
 *       description: Numeric ID of the user to get
 *       }
 *      ],
 *     responses: {
 *       200: {
 *         description: ok,
 *         schema: {
 *           $ref: "#/components/schemas/User"
 *         }
 *        }
 *       }
 *      }
 *     }
 * */
export const getUser = async (req: Request, res: Response) => {
  const pathId = req.params.id
  const user = await UserService.findUserById(pathId)
  if (user) return res.status(Const.STATUS_OK).json(UserService.userToJsonUser(user))
  else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Cannot find user with id ${pathId}`))
}

/**
 * @swagger
 * /users/{id}: {
 *   patch: {
 *     tags: [users],
 *     summary: Patch the specified user,
 *     parameters: [
 *     {
 *      in: path,
 *       name: id,
 *       type: string,
 *       required: true,
 *       description: Numeric ID of the user to patch
 *     },
 *     {
 *       in: body,
 *        schema: {
 *          $ref: "#/components/schemas/UserPatch"
 *        }
 *      }
 *    ],
 *     responses: {
 *       200: {
 *         description: ok,
 *         schema: {
 *           $ref: "#/components/schemas/User"
 *         }
 *        }
 *      }
 *     }
 *   }
 * */
export const patchUser = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const patch = req.body as JsonUserPatch
    return res.status(Const.STATUS_OK).json(await UserService.patchUser(pathId, patch))
  } catch (err) {
    if (err instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(err)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}

/**
 * @swagger
 * /users/{id}/score : {
 *            "put": {
 *              "tags": [
 *                  "users"
 *              ],
 *              "summary": "Add a game score to the specified user",
 *              "parameters": [
 *                  {
 *                      "in": "path",
 *                      "name": "id",
 *                      "type": "string",
 *                      "required": true,
 *                      "description": "Guid of the user"
 *                  },
 *                  {
 *                      "in": "body",
 *                      "name": "body",
 *                      "required": true,
 *                      "schema": {
 *                          "type": "object",
 *                          "properties": {
 *                              "gameId": {
 *                                  "type": "string"
 *                              },
 *                              "score": {
 *                                  "type": "number"
 *                              }
 *                          }
 *                      }
 *                  }
 *              ],
 *              "security": [
 *                  {
 *                      "JWT": []
 *                  }
 *              ],
 *              "responses": {
 *                  "200": {
 *                      "description": "ok",
 *                      "schema": {
 *                          "type": "object",
 *                          "properties": {
 *                              "gameGuid": {
 *                                  "type": "string"
 *                              },
 *                              "score": {
 *                                  "type": "number"
 *                              }
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *        }
 * */
export const putScore = async (req: Request, res: Response) => {
  const pathId = req.params.id
  const gameId = req.body.gameId

  if (!gameId || !(await GameService.isValidGame(gameId)))
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError('invalid game id ' + gameId))
  const score = new Score()
  /* TODO fai un interfaccia*/
  score.userId = pathId
  score.gameId = req.body.gameId
  score.value = req.body.score
  await score.save()
  return res.status(Const.STATUS_OK).json(score)
}

/**
* @swagger
* /users/{id}/score:
*   get:
*     tags:
*     - users
*     summary: Get game scores of the specified user
*     parameters:
*       - in: path
*         name: id
*         type: string
*         required: true
*         description: Guid of the user
*       - in: query
*         name: gameId
*         type: string
*         required: false
*         description: Optional id of the game you want the result
*     security:
*     - JWT: []
*     responses:
*       200:
*         description: ok
*         schema:
*           type: array
*           items:
*             type: object
*             properties:
*                 gameGuid:
*                   type: string
*                 score:
                    type: number
* */
export const getScore = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (req.query.id) {
    // Check if a game with that id exists
    if (await GameService.isValidGame(req.query.id))
      return res.status(Const.STATUS_OK).json(await GameService.findScore(pathId, req.query.id))
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Invalid game id ${req.query.id}`))
  }
  return res.status(Const.STATUS_OK).json(await GameService.findScore(pathId))
}

/**
 * @swagger
 * /users/{id}/cart:
 *   put:
 *     tags:
 *     - users
 *     summary: Add a product to the cart of the specified user
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
 *             $ref: "#/components/schemas/ProductInstance"
 *     security:
 *     - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/ProductInstance"
 * */
export const putInCart = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const creations = req.body as JsonCartItemCreation[]
    return res.status(Const.STATUS_OK).json(await UserService.addProductToUserCart(pathId, creations))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(ex.code).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{id}/cart:
 *   get:
 *     tags:
 *     - users
 *     summary: Get the cart of the specified user
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the user
 *     security:
 *     - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/ProductInstance"
 * */
export const getCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    return res.status(Const.STATUS_OK).json(await UserService.getUserCartItems(id))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{id}/cart:
 *   delete:
 *     tags:
 *     - users
 *     summary: Delete a product from the cart of the specified user
 *     description: Takes in the body a list of string representing the product instance ids you want to delete
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
 *             type:
 *               string
 *     security:
 *     - JWT: []
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/ProductInstance"
 *
 * */
export const deleteCart = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const piIds = req.body as string[]
    const result = (piIds.length === 0)? UserService.deleteAllFromCart(pathId) : UserService.deleteFromUserCart(pathId, piIds)
    return res.status(Const.STATUS_OK).json(await result)
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{id}/animals : {
 *         "put": {
 *              "tags": [
 *                  "users"
 *              ],
 *              "summary": "Add an animal for the specified user",
 *              "parameters": [
 *                  {
 *                      "in": "path",
 *                      "name": "id",
 *                      "type": "string",
 *                      "required": true,
 *                      "description": "Id of the user"
 *                  },
 *                  {
 *                      "in": "body",
 *                      "name": "body",
 *                      "required": true,
 *                      "schema": {
 *                          "type": "array",
 *                          "items": {
 *                              "$ref": "#/definitions/Animal"
 *                          }
 *                      }
 *                  }
 *              ],
 *              "security": [
 *                  {
 *                      "JWT": []
 *                  }
 *              ],
 *              "responses": {
 *                  "200": {
 *                      "description": "ok",
 *                      "schema": {
 *                          "type": "array",
 *                          "items": {
 *                              "$ref": "#/definitions/Animal"
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 * */
export const putAnimal = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const animal = req.body as JsonAnimal
    return res.status(Const.STATUS_OK).json(await UserService.addAnimalsToUser(pathId, animal))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{uid}/animals/{aid}:
 *  delete:
 *      tags:
 *      - users
 *       summary: Retrive reviews about a product
 *       parameters:
 *       - in: path
 *         name: uid
 *         type: string
 *         required: true
 *         description: Id of the user to be searched
 *      },
 *       {
 *          in: path,
 *         name: aid,
 *         type: string,
 *         required: true,
 *         description: Id of the animal to be deleted
 *       security:
 *         - JWT: []
 *       responses:
 *         200:
 *           description: successful operation
 * */
export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.aid
    const userId = req.params.uid
    return res.status(Const.STATUS_OK).json(await UserService.deleteFromAnimal(userId, animalId))
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error)
  }
}

/**
 * @swagger
 * /users/{uid}/animals/{aid}:
 *  put:
 *      tags:
 *      - users
 *      summary: edit a animal
 *       parameters:
 *       - in: path
 *         name: uid
 *         type: string
 *         required: true
 *         description: user id
 *      },
 *       { 
 *         in: path,
 *         name: aid,
 *         type: string,
 *         required: true,
 *         description: animal id
 *       - in: body
 *         name: Animal
 *         description: Animal info
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             type:
 *               type: string
 *             name:
 *               type: string
 *             userId:
 *               type: string
 *             age:
 *               type: number
 *             picture:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 mimetype:
 *                   type: string
 *                 size:
 *                   type: number
 *       security:
 *         - JWT: []
 *       responses:
 *         200:
 *           description: Success
 *           schema:
 *             $ref: "#/definitions/Animal"
 *     
* */
export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.aid
    const userId = req.params.uid
    console.log(userId)
    let animal = req.body as JsonAnimal
    console.log(animal)
    return res.status(Const.STATUS_OK).json(await UserService.updateFromAnimal(userId, animalId, animal))
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(error)
  }
}

/**
 * @swagger
 * /users/{uid}/animals/{id}/picture:    
 *   put:
 *     tags:
 *     - users
 *     summary: Put a profile image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *     - in: path
 *       name: uid
 *       type: string
 *       required: true
 *       description: Id of user
 *     - in: path
 *       name: id
 *       type: string
 *       required: true
 *       description: Id of the animal
 *     - in: formData
 *       name: profile
 *       type: file
 *       description: The picture to upload.
 *     security:  
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: "#/components/schemas/User"
*/
export const putPicture = (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const file = req.file as JsonPicture
    const newData = UserService.pictureToJsonPicture(file)
    return res.status(Const.STATUS_OK).json(UserService.addPictureToUser(pathId, newData))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}



export const putAnimalPicture = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.uid
    const animalId = req.params.id
    const file = req.file as JsonPicture
    const newData = UserService.pictureToJsonPicture(file)
    return res.status(Const.STATUS_OK).json(await UserService.addPictureToAnimal(pathId, animalId, newData))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 *  /users/{id}/description:
 *    put:
 *      tags:
 *      - users
 *      summary: Put a profile description
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id of user
 *      - in: body
 *       name: body
 *       description: user description
 *       schema:
 *           $ref: "#/definitions/User"
 *
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: "#/definitions/User"
 * */
export const updateUserDescription = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    let updateUser = req.body as JsonUser
    console.log(updateUser)
    return res.status(Const.STATUS_OK).json(await UserService.updateUserDescription(pathId, updateUser))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /users/{id}/orders:
 *   get:
 *     tags:
 *     - users
 *     summary: get orders of an user
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of user
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *            type: array
 *            items:
 *              type: object
 *              schema:
 *                $ref: "#/components/schemas/Order"
 * */
 export const getUserOrders = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await UserService.getUserOrders(req.params.id))
  } catch (err) {
    if (err instanceof JsonError) return res.status(err.code).json(err)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}

/**
 * @swagger
 * /users/{id}/orders:
 *   post:
 *     tags:
 *     - users
 *     summary: create an order for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of user
 *       - in: body
 *         type: object
 *         schema:
 *          $ref: "#/components/schemas/PaymentDetails"
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *            type: array
 *            items:
 *              type: object
 *              schema:
 *                $ref: "#/components/schemas/Order"
 * */
export const postUserOrders = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await UserService.createUserOrder(req.params.id, req.body as JsonPaymentDetails))
  } catch (err) {
    if (err instanceof JsonError) return res.status(err.code).json(err)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}
