import { Schema, model } from 'mongoose'

interface IGame {
  guid: string,
  name: string
}

const gameSchema = new Schema<IGame>({
  guid: {type: String, required: true},
  name: {type: String, required: true}
})

export const Game = model<IGame>('Game', gameSchema)

