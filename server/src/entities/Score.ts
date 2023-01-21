import { Schema, model } from 'mongoose'

interface IScore {
  userId: string
  gameId: string
  value: number
}

const scoreSchema = new Schema<IScore>({
  userId: { type: String, required: true },
  gameId: { type: String, required: true },
  value: { type: Number, required: true }
})

const Score = model<IScore>('Score', scoreSchema)

export default Score
