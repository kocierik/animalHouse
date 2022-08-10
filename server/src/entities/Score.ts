import { Schema, model } from 'mongoose'

interface IScore {
  guid: string,
  userguid: string,
  gameguid: string,
  value: number
}

const scoreSchema = new Schema<IScore>({
  guid: {type: String, required: true},
  userguid: { type: String, required: true },
  gameguid: { type: String, required: true },
  value: { type: Number, required: true}
})

const Score = model<IScore>('Score', scoreSchema)

export default Score
