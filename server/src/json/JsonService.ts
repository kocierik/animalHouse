export interface JsonService {
  title: string
  description: string
  color: string
}

export const SwaggerReservation = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
  },
}
