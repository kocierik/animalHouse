export interface JsonCartItemCreation {
  productId: string
  color?: string
  size?: string
  type?: string
}

export const SwaggerCartItemCreation = {
  type: 'object',
  required: ['productId'],
  properties: {
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
