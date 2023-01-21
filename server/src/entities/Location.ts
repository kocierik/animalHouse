import { Schema, model, Types } from 'mongoose'
import type { JsonAddress } from '../json/JsonAddress'
import { addressSchema } from './Address'

export interface ILocation {
  _id: Types.ObjectId
  name: string
  address: JsonAddress
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  address: { type: addressSchema, required: true }
})

const Location = model<ILocation>('Location', locationSchema)

export default Location
