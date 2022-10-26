import { Schema, model } from 'mongoose'

interface IAdmin {
  username: string,
  password: string
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, require: true },
  password: { type: String, require: true }
})

const Admin = model<IAdmin>('Admin', adminSchema)

export default Admin
