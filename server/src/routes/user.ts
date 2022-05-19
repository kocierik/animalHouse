import User from '../entities/User'
import { Request, Response } from 'express'
import { JsonUserCreation, JsonLogin } from '../json/UserJson'
import * as bcrypt from 'bcrypt'

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
  if (result.length === 1) return res.send("login")
  else return res.send("nope")
}

