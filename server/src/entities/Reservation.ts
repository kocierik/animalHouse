import { Schema, model, Types } from 'mongoose';
import { JsonAddress } from '../json/JsonUser';
import { IAddress } from './User';


export interface ILocation {
  _id: Types.ObjectId
  name: string
  address: JsonAddress
}

export interface IReservation {
  _id: string
  animalName: string
  serviceName: string
  userId: string
  date: Date
  information: string
  location: ILocation
}

const addressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zip: { type: Number, required: true },
})

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  address: {type: addressSchema, required: true }
})

export const reservationSchema = new Schema<IReservation>({
  animalName: { type: String, required: true },
  serviceName: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  information: { type: String, required: false },
  location: { type: locationSchema, required: true },
})

const Reservation = model<IReservation>('Reservation', reservationSchema)

export default Reservation
