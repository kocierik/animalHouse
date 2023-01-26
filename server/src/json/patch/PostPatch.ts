export interface PostPatch {
  likes?: number
  userLikes: string[]
}

export const SwaggerPostPatch = {
  type: 'object',
  properties: {
    likes: {
      type: 'number',
      nullable: true
    },
    userLikes: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
  }
}