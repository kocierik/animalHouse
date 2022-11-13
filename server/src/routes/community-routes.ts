import { Request, Response } from 'express'
import { Game } from '../entities/Community'
import * as Const from '../const'
import * as GameService from '../services/game-service'
import JsonError from '../json/JsonError'

/**
 * @swagger
 *
 *  /community/game/:
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
 *  /community/game/scoreboard:
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
