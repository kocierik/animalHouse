export interface JsonAddress {
  country: string
  city: string
  street: string
  zip: number
}

export interface ILocation {
  name: string
  address: JsonAddress
}

export interface JsonReservation {
  animalName: string
  serviceName: string
  userId: string
  date: string
  information: string
  location: ILocation
}

export const SwaggerReservation = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    animalName: {
      type: 'string',
    },
    serviceName: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    date: {
      type: 'number',
    },
    information: {
      type: 'string',
    },
    location: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
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
      }
    },
  },
}
