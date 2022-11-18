import { JsonAddress } from "./JsonAddress"


export interface ILocation {
  name: string
  address: JsonAddress
}

export const SwaggerLocation = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    address: {
      type: 'object',
      properties: {
        country: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        street: {
          type: 'string'
        },
        zip: {
          type: 'number'
        }
      }
    }
  },
}
