import { Schema, model, Types } from 'mongoose';

export interface IReservation {
  _id: Types.ObjectId
  animalId: string
  serviceName: string
  userId: string
  date: string
  information: string
  locationId: string
}

export const reservationSchema = new Schema<IReservation>({
  animalId: {type: String, required: true},
  serviceName: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  information: { type: String, required: false },
  locationId: { type: String, required: true },
})

const Reservation = model<IReservation>('Reservation', reservationSchema)

export default Reservation
