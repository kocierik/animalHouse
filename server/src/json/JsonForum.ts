export interface JsonForum {
  _id: string
  name: string
  description: string
  picture?: string
}

export const SwaggerForum = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    picture: {
      type: 'string',
    },
  }
}
