import { Game } from './entities/Community'

export const initGames = async () => {
  Game.deleteMany({});
  ['minesweeper', '2048', 'hangMan', 'memoryGame', 'quizGame', 'ticTacToe'].forEach(
    async (g: string) => {
      let game = new Game()
      game.name = g 
      await game.save()
    }
  )
}
