import { JsonCartItem } from './JsonCartItem'

export interface JsonCart {
  _id: string
  userId: string
  active: boolean
  cartItems: JsonCartItem[]
}

export const SwaggerCart = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    active: {
      type: 'boolean'
    },
    cartItems: {
      type: 'array',
      items: {
          $ref: '#/definitions/CartItem'
      }
    }
  }
}
