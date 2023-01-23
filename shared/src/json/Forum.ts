export interface IForum {
  name: string
  description: string
}

export interface IPostCreation {
  text: string
  forumId: string
}