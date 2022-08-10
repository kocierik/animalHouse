import { Game } from './entities/Community'
import { Types } from 'mongoose'
import ProductCategory from './entities/ProductCategory';

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

export const initProductCategories = async () => {
  await ProductCategory.deleteMany()
  await ProductCategory.insertMany([
    {
      name: 'wearing',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da7')
    },
    {
      name: 'food',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da8')
    },
    {
      name: 'healt',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da9')
    },
    {
      name: 'accessories',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764daa')
    },
    {
      name: 'puppies',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dab')
    },
    {
      name: 'entertainment',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dac')
    },
    {
      name: 'beauty',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dad')
    },
  ])
}
