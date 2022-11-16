import { Schema, model } from 'mongoose'

interface IReservationCode {
  code: number
  value: string
}

const ReservationCodeSchema = new Schema<IReservationCode>({
  code: { type: Number, required: true },
  value: { type: String, required: true },
})

const ReservationCode = model<IReservationCode>('ReservationCode', ReservationCodeSchema)

export default ReservationCode
