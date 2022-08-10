import User from '../entities/User'
import Score from '../entities/Score'
import { Game } from '../entities/Community'
import { Request, Response } from 'express'
import { JsonUserCreation, JsonLogin} from '../json/JsonUser'
import { JsonError } from '../json/JsonError'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

const SECRET = 'bigSecret'

interface AuthData {
  username: string,
  id: string
}

export const verifyToken = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization']
  if (authHeader !== undefined) {
    jwt.verify(authHeader, SECRET, (err, authData) => {
      if (err)
        res.sendStatus(403)
      else {
        req.authData = authData.authData
        next()
      }
    })
  } else
    res.sendStatus(403)
}

export const registerPost = async (req: Request, res: Response) => {
  const userCreation = req.body as JsonUserCreation
  
  // Password checks
  if (userCreation.password.length < 8)
    return res.status(400).send('password must be at least 8 characters long')

  // Look if username is already taken
  if ((await User.find({'username' : userCreation.username})).length != 0)
    return res.status(400).send(`username ${userCreation.username} already taken`)

  // Look if email is well formed
  /*const regExp = new RegExp('')
  if (!regExp.test(userCreation.password))
    return res.status(400).send(`email ${userCreation.email} is malformed`)*/

  // Look if email is already taken
  if ((await User.find({'email' : userCreation.email})).length != 0)
    return res.status(400).send(`email ${userCreation.email} already taken`)

  const user = new User()
  user.username = userCreation.username
  user.email = userCreation.email
  user.password =  userCreation.password//bcrypt.hashSync(userCreation.password, 5)
  user.firstName = userCreation.firstName
  user.lastName = userCreation.lastName
  user.phone = "todo"

  await user.save()
  return res.status(200).send('user created successfully') 
}

export const loginPost = async (req: Request, res: Response) => {
  const login = req.body as JsonLogin 

  const hashed = login.password//bcrypt.hashSync(login.password, 5)
  const result = await User.find({'username' : login.username, 'password' : hashed})
  if (result.length === 1) {
    const authData: AuthData = {
      username: result[0].username,
      id: result[0]._id.toString()
    }
    const token = await jwt.sign({authData: authData}, SECRET);
    return res.json({token})
  }
  else return res.status(403).json(new JsonError("invalid username or password"))
}


export const getUser = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  // Check user 
  if (pathId !== authId)
    res.status(403).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    const result = await User.find({'username' : req.authData.username, 'id': pathId})
    if (result.length !== 1) {
      res.status(400).json(new JsonError('Invalid id ' + pathId))
    }
    const jsonUser = {
      id: result[0]._id,
      username: result[0].username,
      firstName: result[0].firstName,
      lastName: result[0].lastName,
      email: result[0].email,
      phone: result[0].phone
      // TODO more fields
    }
    res.json(jsonUser)
  }
}

export const putScore = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  // Check user 
  if (pathId !== authId)
    res.status(403).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    // Check game id 
    const gameId = req.body.gameId

    if (gameId === null || gameId === undefined || (await Game.find({_id: gameId})).length != 1)
      return res.status(400).json(new JsonError("invalid game id " + gameId))

    console.log((await Game.find({id: gameId}))[0])
    const score = new Score()
    score.userId = pathId 
    score.gameId = req.body.gameId
    score.value = req.body.score
    await score.save()
    return res.status(200).json(score)
  }
}

export const getScore = async (req: Request, res: Response) => {
  const authId = req.authData.id
  const pathId = req.params.id
  // Check user 
  if (pathId !== authId)
    res.status(403).json(new JsonError( 'Can\'t access user with id ' + pathId + ' (logged is ' + authId + ')'))
  else {
    return res.status(200).json(await Score.find({userId: pathId}))
  }
}


export const test = async (req: Request, res: Response) => {
    res.json(req.authData)
}

