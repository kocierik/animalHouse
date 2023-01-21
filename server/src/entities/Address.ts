import { Schema, model } from 'mongoose'

export interface IAddress {
  country: string
  city: string
  street: string
  zip: string
}

export const addressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zip: { type: String, required: true }
})

export const Address = model<IAddress>('Address', addressSchema)
