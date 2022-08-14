import { Request, Response } from 'express'
import { Game } from '../entities/Community'
import Score from '../entities/Score'
import { JsonScoreboardItem, JsonScoreboardScore } from '../json/JsonScoreboard'
import User from '../entities/User'
import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_INTERNAL_ERROR, GAMES } from '../const'
import { JsonError } from '../json/JsonError'

export const getGames = async (_: Request, res: Response) => res.json(await Game.find({}).select("name").select("_id"))

export const getScoreboard = async (req: Request, res: Response) => {
  if (req.query.gameId) {
    try{ 
      return res.status(STATUS_OK).json([await getScoreboardForGame(req.query.gameId)])
    } catch(ex) {
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(ex))
    }
  }

  let result = []
  try {
      result = await Promise.all(GAMES.map(g => g._id.toString())
                    .map(id => getScoreboardForGame(id)))
  } catch (ex) {
    console.log(`[ERR] ${ex}`)
    return res.status(STATUS_INTERNAL_ERROR)
  }
  return res.status(STATUS_OK).json(result)
}


// Functions

const getScoreboardForGame = async (id: string) => {
  // Check if the game exists
  if (await Game.exists({_id: id})) {
    const scores = await Score.find({gameId: id})

    let result: JsonScoreboardItem = {
      gameId: id,
      scores: []
    }

    let userScoresMap = new Map<string, number>()

    for (let score of scores) {
      if (!userScoresMap.has(score.userId)) {
        userScoresMap.set(score.userId, 0)
      }
      userScoresMap.set(score.userId, userScoresMap.get(score.userId) + score.value)
    }

    // sort
    const sorted = new Map([...userScoresMap.entries()].sort((a, b) => a[1] - b[1]));

    for (let [uId, scr] of sorted) {
      let jss: JsonScoreboardScore = {
        userId : uId,
        score : scr,
        username : (await User.findOne({_id: uId})).username
      }
      
      result.scores.push(jss)
    }

    console.log(result)
    return result

  } else {
    throw `${id} is not a valid game id`
  }
}
