import { connect } from 'mongoose'
import express, { Request, Response} from 'express'
import * as parser from 'body-parser'
import { registerPost, loginPost } from './routes/user'

const port = 8080;
const app = express()
app.use(parser.json())
const version = "/V1"
	
async function db() {
  await connect('mongodb://AnimalHouse:animal@127.0.0.1:27017/animal-house-db');
}

db().catch(err => console.log(err));

app.get("/", (req : Request, res:Response) => {res.send("anemal houz") })
app.post(version + "/user/register", registerPost )
app.post(version + "/user/login", loginPost)


app.listen(port, () => { console.log("Server started at port " + port)})
