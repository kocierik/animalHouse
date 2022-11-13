export interface JsonUserPatch {
  username?: string
  password?: string
  email?: string
  firstName?: string
  lastName?: string
  country?: string
  city?: string
  street?: string
  zip?: number
}

export const SwaggerUserPatch = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      nullable: true
    },
    password: {
      type: 'string',
      nullable: true
    },
    email: {
      type: 'string',
      nullable: true
    },
    firstName: {
      type: 'string',
      nullable: true
    },
    lastName: {
      type: 'string',
      nullable: true
    },
    country: {
      type: 'string',
      nullable: true
    },
    city: {
      type: 'string',
      nullable: true
    },
    street: {
      type: 'string',
      nullable: true
    },
    zip: {
      type: 'string',
      nullable: true
    },
  }
}
