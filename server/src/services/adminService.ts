import JsonError from '../json/JsonError'
import { JsonLogin } from '../json/JsonUser'
import { AuthData } from '../routes/middlewares'
import Admin from '../entities/Admin'

export const isAdmin = async (id: string): Promise<boolean> => {
  const x = await Admin.exists({ _id: id })
  return x ? true : false
}

export const verifyLogin = (login: JsonLogin): Promise<AuthData> => {
  const hashed = login.password //bcrypt.hashSync(login.password, 5)
  return constructAuthDataForAdmin(login.username, login.password)
}

const constructAuthDataForAdmin = async (username: string, password: string): Promise<AuthData> => {
  const result = await Admin.find({ username: username, password: password })
  if (result.length !== 1) {
    throw new JsonError('invalid admin username or password')
  }
  return {
    username: result[0].username,
    id: result[0]._id.toString(),
  } as AuthData
}

