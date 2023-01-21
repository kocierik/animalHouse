export interface JsonCartItem {
  _id: string
  price: number
  productId: string
  color?: string
  size?: string
  type?: string
}

export const SwaggerCartItem = {
  type: 'object',
  required: ['productId'],
  properties: {
    _id: {
      type: 'string'
    },
    productId: {
      type: 'string'
    },
    color: {
      type: 'string'
    },
    size: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }
}
