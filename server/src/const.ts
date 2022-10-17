import { Types } from 'mongoose'

export const STATUS_OK = 200
export const STATUS_BAD_REQUEST = 400
export const STATUS_UNAUTHORIZED = 403
export const STATUS_NOT_FOUND = 404
export const STATUS_INTERNAL_ERROR = 500

export const BACKOFFICE_DIR = "/../../back-office/public"

export const SERVER_PORT = 8080
export const CURR_API_VERSION = '/v1'

export const DB_NAME = 'animal-house-db'
export const DB_ADDR = '127.0.0.1'
export const DB_PORT = '27017'
export const DB_USER = 'AnimalHouse'
export const DB_SECRET = 'animal'

export const GAMES = [
  {
    name: 'minesweeper',
    _id: new Types.ObjectId('62f3c0540ac73a2bc4764da1'),
  },
  {
    name: '2048',
    _id: new Types.ObjectId('62f3c0540ac73a2bc4764da2'),
  },
  {
    name: 'hangMan',
    _id: new Types.ObjectId('62f3c0540ac73a2bc4764da3'),
  },
  {
    name: 'memoryGame',
    _id: new Types.ObjectId('62f3c0540ac73a2bc4764da4'),
  },
  {
    name: 'quizGame',
    _id: new Types.ObjectId('62f3c0540ac73a2bc4764da5'),
  },
  {
    name: 'ticTacToe',
    _id: new Types.ObjectId('62f3c0540ac73a2bc4764da6'),
  },
]
