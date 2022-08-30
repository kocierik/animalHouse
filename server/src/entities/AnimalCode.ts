import { Schema, model } from 'mongoose'

interface IAnimalCode {
  code: number,
  value: string
}

const animalCodeSchema = new Schema<IAnimalCode>({
  code: {type: Number, required: true},
  value: {type: String, required: true}
})

const AnimalCode = model<IAnimalCode>('AnimalCode', animalCodeSchema)

export default AnimalCode
