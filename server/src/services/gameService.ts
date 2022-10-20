import Score from '@/entities/Score'
import { Game } from '../entities/Community'

export const isValidGame = async (id: string): Promise<boolean> => {
  return (await Game.find({ _id: id })).length === 1
}

export const findScore = async (userId: string, gameId?: string) => {
  if (gameId)
    return Score.find({ userId: userId, gameId: gameId })
  else
    return Score.find({ userId: userId })
}
