import { connect } from 'mongoose'
import express, { Request, Response} from 'express'
import cors from 'cors'
import * as parser from 'body-parser'
import { registerPost, loginPost, verifyToken, getUser, test} from './routes/user'
import { getAnimalCodes } from './routes/animal' 

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
}

db().catch(err => console.log(err));

// Log
const log = (req: Request, res: Response, next: Function) => {
  console.log(`[INFO] ${req.method} to ${req.originalUrl}`)
  next()
}

// Routes
app.get("/", (req : Request, res:Response) => {res.send("anemal houz") })
app.post(version + "/user/register", log, registerPost )
app.post(version + "/user/login", log, loginPost)
app.get(version + "/user/test", log, verifyToken, test)
app.get(version + "/user/:guid", log, verifyToken, getUser)

app.get(version + "/animals/", log, getAnimalCodes)


app.listen(port, () => { console.log("[INFO] Server started at port " + port)})
