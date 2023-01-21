import { Schema, model, Types } from 'mongoose'
import type { JsonAddress } from '../json/JsonAddress'
import { addressSchema } from './Address'

export interface ILocation {
  _id: string
  name: string
  address: JsonAddress
  latitude?: string
  longitude?: string
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  address: { type: addressSchema, required: true },
  latitude: { type: String, required: false },
  longitude: { type: String, required: false }
})

const Location = model<ILocation>('Location', locationSchema)

export default Location
