export interface IForum {
  _id?: string
  name: string
  description: string
}

export interface IPostCreation {
  text: string
  forumId: string
}

export interface IPost {
  text: string
  date: string
  userId: string
  forumId: string
  valid: boolean
}