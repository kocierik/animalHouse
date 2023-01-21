export interface LocationPatch {
  name?: string
  latitude?: string
  longitude?: string
  country?: string
  city?: string
  street?: string
  zip?: string
}

export const SwaggerLocationPatch = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true,
    },
    latitude: {
      type: 'string',
      nullable: true,
    },
    longitude: {
      type: 'string',
      nullable: true,
    },
    country: {
      type: 'string',
      nullable: true,
    },
    city: {
      type: 'string',
      nullable: true,
    },
    street: {
      type: 'string',
      nullable: true,
    },
    zip: {
      type: 'string',
      nullable: true,
    },
  },
}
