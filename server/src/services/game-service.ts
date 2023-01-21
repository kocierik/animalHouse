import Score from '../entities/Score'
import { JsonScoreboardItem, JsonScoreboardScore } from '../json/JsonScoreboard'
import { Game } from '../entities/Community'
import * as UserService from './user-service'

export const isValidGame = async (id: string): Promise<boolean> => {
  return (await Game.find({ _id: id })).length === 1
}

export const findScore = async (userId: string, gameId?: string) => {
  if (gameId) return Score.find({ userId: userId, gameId: gameId })
  else return Score.find({ userId: userId })
}

export const getScoreboardForGame = async (id: string) => {
  // Check if the game exists
  const game = await Game.findOne({ _id: id })
  if (game) {
    const scores = await Score.find({ gameId: id })

    let result: JsonScoreboardItem = {
      gameId: game._id.toString(),
      gameName: game.name,
      scores: []
    }

    let userScoresMap = new Map<string, number[]>()

    for (let score of scores) {
      if (!userScoresMap.has(score.userId)) {
        userScoresMap.set(score.userId, [])
      }
      userScoresMap.get(score.userId).push(score.value)
    }

    for (let [uId, scr] of userScoresMap) {
      let jss: JsonScoreboardScore = {
        userId: uId,
        score: scr.sort(),
        username: (await UserService.findUserById(uId)).username
      }

      result.scores.push(jss)
    }

    return result
  } else {
    throw `${id} is not a valid game id`
  }
}
