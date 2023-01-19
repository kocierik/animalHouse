import { Schema, model, Types } from 'mongoose'
import { addressSchema } from './Address'
import { ILocation } from './Location'


export interface IReservation {
  _id: string
  animalId: string
  serviceId: string
  userId: string
  date: string
  information: string
  locationId: string
}


const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  address: { type: addressSchema, required: true }
})

export const reservationSchema = new Schema<IReservation>({
  animalId: { type: String, required: true },
  serviceId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  information: { type: String, required: false },
  locationId: { type: String, required: true },
})

const Reservation = model<IReservation>('Reservation', reservationSchema)

export default Reservation
