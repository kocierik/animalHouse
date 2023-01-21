import { Schema, model } from 'mongoose'

export interface IGame {
  name: string
}

const gameSchema = new Schema<IGame>({
  name: { type: String, required: true }
})

export const Game = model<IGame>('Game', gameSchema)
