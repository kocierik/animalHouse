import { Schema, model } from 'mongoose'

interface IService {
  _id: string
  title: string
  description: string
  color: string
}

const ServiceCodeSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true }
})

const Service = model<IService>('Service', ServiceCodeSchema)

export default Service
