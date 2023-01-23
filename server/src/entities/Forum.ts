import { Schema, model } from 'mongoose'

export interface IForum {
  _id: string
  name: string
  description: string
}

const forumSchema = new Schema<IForum>({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

export const Forum = model<IForum>('Forum', forumSchema)
