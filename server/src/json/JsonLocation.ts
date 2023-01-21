import { JsonAddress } from './JsonAddress'

export interface JsonLocation {
  _id: string
  name: string
  address: JsonAddress
  latitude?: string
  longitude?: string
}

export interface JsonLocationCreation {
  name: string
  address: JsonAddress
  latitude?: string
  longitude?: string
}

export const SwaggerLocation = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
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
          type: 'string'
        }
      }
    },
    latitude: {
      type: 'string'
    },
    longitude: {
      type: 'string'
    }
  }
}

export const SwaggerLocationCreation = {
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
          type: 'string'
        }
      }
    },
    latitude: {
      type: 'string'
    },
    longitude: {
      type: 'string'
    }
  }
}
