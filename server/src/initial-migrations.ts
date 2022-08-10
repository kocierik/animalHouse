import { Game } from './entities/Community'
import { Types } from 'mongoose'

export const initGames = async () => {
  await Game.deleteMany();
  await Game.insertMany([
    {
      name: 'minesweeper',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da1')
    },
    {
      name: '2048',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da2')
    },
    {
      name: 'hangMan',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da3')
    },
    {
      name: 'memoryGame',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da4')
    },
    {
      name: 'quizGame',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da5')
    },
    {
      name: 'ticTacToe',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da6')
    }
  ])
}
