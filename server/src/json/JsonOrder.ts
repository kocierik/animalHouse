import { JsonAddress } from './JsonAddress'
import { JsonCartItem } from './JsonCartItem'

export interface JsonOrder {
  _id: string
  cartId: string
  userId: string
  cartItems: JsonCartItem[]
  executionDate: string
  cardName: string
  cardNumber: string
  address: JsonAddress
}

export const SwaggerOrder = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    cartId: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    cartItems: {
      type: 'array',
      items: {
        $ref: '#/definitions/CartItem'
      }
    },
    executionDate: {
      type: 'string'
    },
    cardName: {
      type: 'string'
    },
    cardNumber: {
      type: 'string'
    },
    address: {
      type: 'object',
      schema: {
        $ref: '#/definitions/Address'
      }
    }
  }
}
