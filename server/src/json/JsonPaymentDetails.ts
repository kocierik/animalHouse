import { JsonAddress } from './JsonAddress'

export interface JsonPaymentDetails {
  cardName: string
  cardNumber: string
  address: JsonAddress
}

export const SwaggerPaymentDetails = {
  type: 'object',
  properties: {
    cardName: { type: 'string' },
    cardNumber: { type: 'string' },
    address: {
      type: 'object',
      schema: {
        $ref: '#/definitions/Address'
      }
    }
  }
}
