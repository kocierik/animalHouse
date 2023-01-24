export interface JsonPost{
  _id: string
  text: string
  date: string
  userId: string
  forumId: string
  likes: number
  valid: boolean
}

export interface JsonPostCreation{
  text: string
  forumId: string
}

export const SwaggerPost = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    text: {
      type: 'string'
    },
    likes: {
      type: 'number'
    },
    date: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    forumId: {
      type: 'string'
    },
    valid: {
      type: 'boolean'
    }
  }
}

export const SwaggerPostCreation = {
  type: 'object',
  properties: {
    text: {
      type: 'string'
    },
    forumId: {
      type: 'string'
    },
  }
}