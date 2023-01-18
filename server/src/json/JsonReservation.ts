export interface JsonReservation {
  _id: string
  serviceName: string
  userId: string
  date: string
  information: string
  locationId: string
}

export const SwaggerReservation = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    animalId: {
      type: 'string',
    },
    serviceName: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    information: {
      type: 'string',
    },
    locationId: {
      type: 'string',
    },
  },
}
