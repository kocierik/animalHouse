import { Game } from './entities/Community'
import {v4 as uuidv4} from 'uuid'

export const initGames = async () => {
  ['minesweeper', '2048', 'hangMan', 'memoryGame', 'quizGame', 'ticTacToe'].forEach(
    async g => {
      let game = new Game()
      game.name = g 
      game.guid = uuidv4()
      await game.save()
    }
  )
}
