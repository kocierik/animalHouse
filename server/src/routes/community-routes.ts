import { Request, Response } from 'express'
import { Game } from '../entities/Community'
import * as Const from '../const'
import * as GameService from '../services/game-service'
import * as ForumService from '../services/forum-service'
import JsonError from '../json/JsonError'

/**
 * @swagger
 *
 *  /community/games/:
 *    get:
 *        tags:
 *        - community
 *        summary: Finds all games
 *        responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  _id:
 *                    type: string
 * */
export const getGames = async (_: Request, res: Response) => res.json(await Game.find({}).select('name').select('_id'))

/**
 * @swagger
 *
 *
 *  /community/games/scoreboard:
 *    get:
 *        tags:
 *        - community
 *        summary: Fids the results for the scoreboard
 *        parameters:
 *          - in: query
 *            name: gameId
 *            type: string
 *            required: false
 *            description: Optional id of the game you want the results
 *        responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  gameId:
 *                    type: string
 *                  gameName:
 *                    type: string
 *                  scores:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        username:
 *                          type: string
 *                        userId:
 *                          type: string
 *                        score:
 *                          type: array
 *                          items:
 *                            type: number
 *
 * */
export const getScoreboard = async (req: Request, res: Response) => {
  if (req.query.gameId) {
    try {
      return res.status(Const.STATUS_OK).json([await GameService.getScoreboardForGame(req.query.gameId)])
    } catch (ex) {
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex))
    }
  }

  let result = []
  try {
    result = await Promise.all(
      Const.GAMES.map((g) => g._id.toString()).map((id) => GameService.getScoreboardForGame(id))
    )
  } catch (ex) {
    console.log(`[ERR] ${ex}`)
    return res.status(Const.STATUS_INTERNAL_ERROR)
  }
  return res.status(Const.STATUS_OK).json(result)
}


/**
 * @swagger
 *   /community/forums: {
 *    get: {
 *      tags: [community],
 *      summary: get all forums,
 *      responses: {
 *        200: {
 *          description: successful operation,
 *          schema: {
 *            type: array,
 *            items: {
 *              $ref: '#/definitions/Forum'
 *            }
 *          }
 *         }
 *        }
 *     }
 *   }
 * */
export const getForums = async (_: Request, res: Response) =>
   res
    .status(Const.STATUS_OK)
    .json(await ForumService.getForums())

/**
 * @swagger
 *   /community/forums/{id}/posts: {
 *    get: {
 *      tags: [community],
 *      summary: get the post of the forum,
 *      parameters: [
 *        {
 *          in: path,
 *          name: id,
 *          type: string,
 *          required: true,
 *          description: Id of the forum
 *        }
 *      ],
 *      responses: {
 *        200: {
 *          description: successful operation,
 *          schema: {
 *            type: array,
 *            items: {
 *              $ref: '#/definitions/Post'
 *            }
 *          }
 *         }
 *        }
 *     }
 *   }
 * */
export const getForumPosts = async (req: Request, res:Response) => 
  res
    .status(Const.STATUS_OK)
    .json(await ForumService.getPostOfForum(req.params.id))