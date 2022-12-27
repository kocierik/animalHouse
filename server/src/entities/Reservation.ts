import { Schema, model, Types } from 'mongoose'

export interface IReservation {
  _id: string
  animalId: string
  serviceId: string
  userId: string
  date: string
  information: string
  locationId: string
}

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
