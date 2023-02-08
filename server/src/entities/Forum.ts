import { Schema, model } from 'mongoose'

export interface IForum {
  _id: string
  name: string
  description: string
  picture: string
}

const forumSchema = new Schema<IForum>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: false },
})

export const Forum = model<IForum>('Forum', forumSchema)
