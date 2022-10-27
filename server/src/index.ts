import { connect } from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { resolve } from 'path'
import * as parser from 'body-parser'
import * as animalRoutes from './routes/animal-routes'
import * as middlewares from './routes/middlewares'
import * as userRoutes from './routes/user-routes'
import * as communityRoutes from './routes/community-routes'
import * as marketRoutes from './routes/market-routes'
import * as adminRoutes from './routes/admin-routes'
import * as migrations from './initial-migrations'
import * as Const from './const'

// Constants
const app = express()
const port = Const.SERVER_PORT
const version = Const.CURR_API_VERSION

// App initialization
app.use(parser.json())
app.use(cors())

// Db initialization
async function db() {
  const uri = `mongodb://${Const.DB_USER}:${Const.DB_SECRET}@${Const.DB_ADDR}:${Const.DB_PORT}/${Const.DB_NAME}`
  await connect(uri)
  await migrations.initGames()
  await migrations.initProductCategories()
  await migrations.initAnimalCodes()
  await migrations.initAnimalCodes()
  await migrations.initAdmin()
  // TODO remove
  await migrations.test()
}

db().catch((err) => console.log(err))

// Backoffice
const pubDir = resolve(__dirname + Const.BACKOFFICE_DIR)
console.log("[INFO] Pub dir is at " + pubDir)
app.use(express.static(pubDir));

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
app.get(version + '/users/current', log, middlewares.verifyToken, userRoutes.getCurrentUser)
app.get(version + '/users/:id', log, userRoutes.getUser)
app.put(version + '/users/:id/score', log, middlewares.verifyToken, middlewares.verifyUser, userRoutes.putScore)
app.get(version + '/users/:id/score/', log, middlewares.verifyToken, middlewares.verifyUser, userRoutes.getScore)
app.get(version + '/users/:id/cart', log, middlewares.verifyToken, middlewares.verifyUser, userRoutes.getCart)
app.put(version + '/users/:id/cart', log, middlewares.verifyToken, middlewares.verifyUser, userRoutes.putCart)
app.delete(version + '/users/:id/cart', log, middlewares.verifyToken, middlewares.verifyUser, userRoutes.deleteCart)
app.put(version + '/users/:id/animals', log, middlewares.verifyToken, middlewares.verifyUser, userRoutes.putAnimal)

// Admin
app.post(version + '/admins/login', log, adminRoutes.postLogin)

// Animal
app.get(version + '/animals/codes', log, animalRoutes.getAnimalCodes)
app.get(version + '/animals/:id', log, middlewares.verifyToken, animalRoutes.getAnimalCodes)

// Community
app.get(version + '/community/game/', log, communityRoutes.getGames)
app.get(version + '/community/game/scoreboard', log, communityRoutes.getScoreboard)

// Market
app.get(version + '/products/', log, marketRoutes.getProducts) //retrieve all products
app.get(version + '/products/:id', log, marketRoutes.getProduct) //search
app.delete(version + '/products/:id', log, marketRoutes.deleteProduct) //remove
app.post(version + '/products', log, marketRoutes.postProduct) //insert
app.get(version + '/products/:id/reviews', log, marketRoutes.getReviews)
app.post(version + '/products/:id/reviews', log, marketRoutes.postReview)
app.get(version + '/market/products/:id/sum-up', log, marketRoutes.getProductSumUp)


app.listen(port, () => {
  console.log('[INFO] Server started at port ' + port)
})
