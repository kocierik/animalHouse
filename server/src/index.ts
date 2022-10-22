import { connect } from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { resolve } from 'path'
import * as parser from 'body-parser'
import * as animalRoutes from './routes/animal'
import * as userRoutes from './routes/user'
import * as communityRoutes from './routes/community'
import * as marketRoutes from './routes/market'
import * as reviewRoutes from "./routes/review"
import * as migrations from './initial-migrations'
import { SERVER_PORT, CURR_API_VERSION, DB_SECRET, DB_ADDR, DB_NAME, DB_PORT, DB_USER, BACKOFFICE_DIR } from './const'

// Constants
const app = express()
const port = SERVER_PORT
const version = CURR_API_VERSION

// App initialization
app.use(parser.json())
app.use(cors())

// Db initialization
async function db() {
  await connect(`mongodb://${DB_USER}:${DB_SECRET}@${DB_ADDR}:${DB_PORT}/${DB_NAME}`)
  await migrations.initGames()
  await migrations.initProductCategories()
  await migrations.initAnimalCodes()
  await migrations.initReviews()
  await migrations.test()
}

db().catch((err) => console.log(err))

// Backoffice
const pubDir = resolve(__dirname + BACKOFFICE_DIR)
console.log('[INFO] Pub dir is at ' + pubDir)
app.use(express.static(pubDir))

// Log
const log = (req: Request, _: Response, next: Function) => {
  console.log(`[INFO] ${req.method} to ${req.originalUrl}`)
  next()
}

// Routes
// User
app.get('/', (_: Request, res: Response) => {
  res.send('anemal houz')
})
app.post(version + '/users/register', log, userRoutes.registerPost)
app.post(version + '/users/login', log, userRoutes.loginPost)
app.get(version + '/users/current', log, userRoutes.verifyToken, userRoutes.getCurrentUser)
app.get(version + '/users/:id', log, userRoutes.verifyToken, userRoutes.getUser)
app.put(version + '/users/:id/score', log, userRoutes.verifyToken, userRoutes.putScore)
app.get(version + '/users/:id/score/', log, userRoutes.verifyToken, userRoutes.getScore)
app.get(version + '/users/:id/cart', log, userRoutes.verifyToken, userRoutes.getCart)
app.put(version + '/users/:id/cart', log, userRoutes.verifyToken, userRoutes.putCart)
app.delete(version + '/users/:id/cart', log, userRoutes.verifyToken, userRoutes.deleteCart)
app.put(version + '/users/:id/animals', log, userRoutes.verifyToken, userRoutes.putAnimal)

// Animal
app.get(version + '/animals/codes', log, animalRoutes.getAnimalCodes)
app.get(version + '/animals/:id', log, userRoutes.verifyToken, animalRoutes.getAnimalCodes)

// Community
app.get(version + '/community/game/', log, communityRoutes.getGames)
app.get(version + '/community/game/scoreboard', log, communityRoutes.getScoreboard)

// Market
app.get(version + '/market/products/', log, marketRoutes.getProducts) //retrieve all products
app.get(version + '/market/products/:id', log, marketRoutes.getProduct) //search
app.delete(version + '/market/products/:id', log, marketRoutes.deleteProduct) //remove
app.post(version + '/market/products', log, marketRoutes.postProduct) //insert
app.get(version + '/market/product/', log, marketRoutes.getProducts)
app.get(version + '/market/products/:id', log, marketRoutes.getProduct)

// Reviews
app.get(version + '/product/:id/reviews', log, reviewRoutes.getReviews)
app.post(version + '/product/:id/postreview', log, reviewRoutes.postReview)


app.listen(port, () => {
  console.log('[INFO] Server started at port ' + port)
})
