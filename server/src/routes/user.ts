import User from '../entities/User'
import { Request, Response } from 'express'
import { JsonUserCreation, JsonLogin, JsonUser} from '../json/JsonUser'
import {v4 as uuidv4} from 'uuid'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

const SECRET = 'bigSecret'

interface AuthData {
  username: string,
  guid: string
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
  user.guid = uuidv4()
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
      guid: result[0].guid
    }
    const token = await jwt.sign({authData: authData}, SECRET);
    return res.json({token})
  }
  else return res.status(403).send("invalid username or password")
}


export const getUser = async (req, res) => {
  const authGuid = req.authData.guid
  const pathGuid = req.params.guid
  if (pathGuid !== authGuid)
    res.status(403).send( 'Can\'t access user with guid ' + pathGuid + ' (logged is ' + authGuid + ')')
  else {
    const result = await User.find({'username' : req.authData.username, 'guid': pathGuid})
    if (result.length !== 1) {
      res.status(400).send('Invalid guid ' + pathGuid)
    }
    const jsonUser = {
      guid: result[0].guid,
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

export const test = async (req, res) => {
    res.json(req.authData)
}

