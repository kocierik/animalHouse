import { Schema, model } from 'mongoose'

interface IServiceCode {
  code: number
  value: string
}

const ServiceCodeSchema = new Schema<IServiceCode>({
  code: { type: Number, required: true },
  value: { type: String, required: true },
})

const ServiceCode = model<IServiceCode>('ServiceCode', ServiceCodeSchema)

export default ServiceCode
