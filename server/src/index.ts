import { connect } from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { appRouter } from './routes/router'
import * as parser from 'body-parser'
import swaggerOptions from './swagger-config'
import * as swagger from 'swagger-ui-express'
import * as migrations from './initial-migrations'
import * as Const from './const'
import swaggerJsdoc from 'swagger-jsdoc'

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
  console.log(uri)
  await connect(uri)
  await migrations.initGames()
  await migrations.initProductCategories()
  await migrations.initAnimalCodes()
  await migrations.initAnimalCodes()
  await migrations.initAdmin()
  await migrations.initReservationCodes()
  await migrations.initLocationCodes()
  // TODO remove
  await migrations.test()
}

db().catch((err) => console.log(err))

// Log
const log = (req: Request, _: Response, next: Function) => {
  console.log(`[INFO] ${req.method} to ${req.originalUrl}`)
  next()
}


// Swagger
app.use('/api/docs', swagger.serve, swagger.setup(swaggerJsdoc(swaggerOptions)))

app.listen(port, () => {
  console.log('[INFO] Server started at port ' + port)
})
