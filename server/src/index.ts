import { connect } from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { resolve } from 'path'
import { appRouter } from './routes/router'
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
app.use(appRouter)

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

console.log("[INFO] Pictures dir is at " + Const.picDir)
app.use(`${version}/pictures/`, log, express.static(Const.picDir));

// Swagger
app.use('/api/docs', swagger.serve, swagger.setup(swaggerJsdoc(swaggerOptions)))


app.listen(port, () => {
  console.log('[INFO] Server started at port ' + port)
})
