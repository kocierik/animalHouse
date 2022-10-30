import { connect } from 'mongoose'
import express from 'express'
import { appRouter } from './routes/router'
import swaggerJsdoc from 'swagger-jsdoc'
import cors from 'cors'
import { resolve } from 'path'
import * as swagger from 'swagger-ui-express'
import * as parser from 'body-parser'
import * as migrations from './initial-migrations'
import * as Const from './const'

// Constants
export const app = express()
const port = Const.SERVER_PORT

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

// Swagger
const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Animal House',
      version: '2.0.0',
      description: 'Animal houz back& api'
    },
    servers: [
      {
        url: '/',
        description: 'V1'
      }
    ],
    components: {
      tags: [
        { name: "users" }
      ],
      schemas: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              username: {
                type: 'string',
              },
            },
          },
        }
      }
    }
  },
  apis: ['src/routes/*.ts'],
};
app.use('/api/docs', swagger.serve, swagger.setup(swaggerJsdoc(options)))

app.listen(port, () => {
  console.log('[INFO] Server started at port ' + port)
})
