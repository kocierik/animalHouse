import { Request, Response } from 'express'
import { Game } from '../entities/Community'
import * as Const from '../const'
import * as GameService from '../services/gameService'
import JsonError from '../json/JsonError'

export const getGames = async (_: Request, res: Response) => res.json(await Game.find({}).select('name').select('_id'))

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
    result = await Promise.all(Const.GAMES.map((g) => g._id.toString()).map((id) => GameService.getScoreboardForGame(id)))
  } catch (ex) {
    console.log(`[ERR] ${ex}`)
    return res.status(Const.STATUS_INTERNAL_ERROR)
  }
  return res.status(Const.STATUS_OK).json(result)
}
