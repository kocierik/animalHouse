import { Schema, model } from 'mongoose'

export interface IPost {
  _id: string
  text: string
  date: string
  userId: string
  forumId: string
  valid: boolean
}

const postSchema = new Schema<IPost>({
  text: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
  forumId: { type: String, required: true },
  valid: { type: Boolean, default: true},
})

export const Post = model<IPost>('Post', postSchema)

