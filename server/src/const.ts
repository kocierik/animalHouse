import { Types } from 'mongoose'

export const SECRET = 'secret'

export const STATUS_OK = 200
export const STATUS_BAD_REQUEST = 400
export const STATUS_UNAUTHORIZED = 403
export const STATUS_NOT_FOUND = 404
export const STATUS_INTERNAL_ERROR = 500

export const PUBLIC_DIR = '/../../public/'
export const BACKOFFICE_DIR = '/../../backoffice'
export const FRONTOFFICE_DIR = PUBLIC_DIR + 'frontoffice'
export const GAME_DIR = PUBLIC_DIR + '/game'
export const PICTURE_DIR = '/../../pictures'
export const USER_DEFAULT_IMAGE = '../../pictures/userdefault.png'
export const MULTER_DIR = `./pictures`

export const SERVER_PORT = 8000
export const API_PREFIX = '/api'
export const CURR_API_VERSION = '/v2'

export const DB_NAME = 'animal-house-db'
export const DB_ADDR = '127.0.0.1'
export const DB_PORT = '27017'
export const DB_USER = 'root'
export const DB_SECRET = 'secret'
export const DB_URI = `mongodb://${DB_USER}:${DB_SECRET}@${DB_ADDR}:${DB_PORT}`

export const GAMES = [
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
]
