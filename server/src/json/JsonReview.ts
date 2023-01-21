export interface JsonReview {
  username: string
  productId: string
  comment: string
  star: number
  date: Date
}

export const SwaggerReview = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    productId: {
      type: 'string'
    },
    comment: {
      type: 'string'
    },
    star: {
      type: 'number'
    },
    date: {
      type: 'string'
    }
  }
}
