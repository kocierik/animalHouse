import { Schema, model } from 'mongoose'

interface IReview {
  username: string
  comment?: string
  star: number
  date: Date
}


const reviewSchema = new Schema<IReview>({
  username: { type: String, required: true },
  comment: { type: String, required: false },
  star: { type: Number, required: true },
  date: { type: Date, required: true },
})

const Review = model<IReview>('Review', reviewSchema)

export default Review
