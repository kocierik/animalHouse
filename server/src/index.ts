import { connect } from 'mongoose'
import express, { Request, Response} from 'express'
import cors from 'cors'
import * as parser from 'body-parser'
import * as animalRoutes from './routes/animal' 
import * as userRoutes from './routes/user'
import * as communityRoutes from './routes/community'
import * as marketRoutes from './routes/market'
import * as migrations from './initial-migrations'
import { SERVER_PORT, CURR_API_VERSION, DB_SECRET, DB_ADDR, DB_NAME, DB_PORT, DB_USER} from './const'

// Constants
const app = express()
const port = SERVER_PORT;
const version = CURR_API_VERSION

// App initialization
app.use(parser.json())
app.use(cors())
	
// Db initialization
async function db() {
  await connect(`mongodb://${DB_USER}:${DB_SECRET}@${DB_ADDR}:${DB_PORT}/${DB_NAME}`);
  await migrations.initGames()
  await migrations.initProductCategories()
  await migrations.test()
}

db().catch(err => console.log(err));

// Log
const log = (req: Request, _: Response, next: Function) => {
  console.log(`[INFO] ${req.method} to ${req.originalUrl}`)
  next()
}

// Routes
// User
app.get("/", (_: Request, res:Response) => {res.send("anemal houz") })
app.post(version + "/user/register", log, userRoutes.registerPost )
app.post(version + "/user/login", log, userRoutes.loginPost)
app.get(version + "/user/current", log, userRoutes.verifyToken, userRoutes.getCurrentUser)
app.get(version + "/user/:id", log, userRoutes.verifyToken, userRoutes.getUser)
app.put(version + "/user/:id/score", log, userRoutes.verifyToken, userRoutes.putScore)
app.get(version + "/user/:id/score/", log, userRoutes.verifyToken, userRoutes.getScore)
app.put(version + "/user/:id/cart", log, userRoutes.verifyToken, userRoutes.putCart)

// Animal
app.get(version + "/animals/", log, animalRoutes.getAnimalCodes)

// Community
app.get(version + "/community/game/", log, communityRoutes.getGames)

// Market
app.get(version + "/market/product/", log, marketRoutes.getProducts)


app.listen(port, () => { console.log("[INFO] Server started at port " + port)})
