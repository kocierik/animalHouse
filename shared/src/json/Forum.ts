export interface IForum {
  _id?: string
  name: string
  description: string
  picture?: string
}

export interface IPostCreation {
  text: string
  forumId: string
}

export interface IPost {
  _id?: string
  text: string
  date: string
  userId: string
  userLikes: string[]
  forumId: string
  valid: boolean
  likes: number
}
