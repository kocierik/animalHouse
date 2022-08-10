import { connect } from 'mongoose'
import express, { Request, Response} from 'express'
import cors from 'cors'
import * as parser from 'body-parser'
import * as animalRoutes from './routes/animal' 
import * as userRoutes from './routes/user'
import * as communityRoutes from './routes/community'
import { initGames } from './initial-migrations'

// Constants
const port = 8080;
const app = express()
const version = "/V1"

// App initialization
app.use(parser.json())
app.use(cors())
	
// Db initialization
async function db() {
  await connect('mongodb://AnimalHouse:animal@127.0.0.1:27017/animal-house-db');
  await initGames()
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
app.get(version + "/user/test", log, userRoutes.verifyToken, userRoutes.test)
app.get(version + "/user/:guid", log, userRoutes.verifyToken, userRoutes.getUser)
app.put(version + "/user/:guid/score", log, userRoutes.verifyToken, userRoutes.putScore)
app.get(version + "/user/:guid/score/", log, userRoutes.verifyToken, userRoutes.getScore)

// Animal
app.get(version + "/animals/", log, animalRoutes.getAnimalCodes)

// Community
app.get(version + "/community/game/", log, communityRoutes.getGames)


app.listen(port, () => { console.log("[INFO] Server started at port " + port)})
