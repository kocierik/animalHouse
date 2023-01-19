export interface ProductPatch {
  name?: string
  description?: string
  price?: number
  categoryId?: string
  colors?: string[]
  sizes?: string[]
  types?: string[]
  animalTargets?: string[]
  details?: string
}

export const SwaggerProductPatch = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true,
    },
    description: {
      type: 'string',
      nullable: true,
    },
    price: {
      type: 'number',
      nullable: true,
    },
    categoryId: {
      type: 'string',
      nullable: true,
    },
    colors: {
      type: 'array',
      nullable: true,
      items: 'string',
    },
    sizes: {
      type: 'array',
      nullable: true,
      items: 'string',
    },
    types: {
      type: 'array',
      nullable: true,
      items: 'string',
    },
    animalTargets: {
      type: 'array',
      nullable: true,
      items: 'string',
    },
    details: {
      type: 'array',
      nullable: true,
      items: 'string',
    },
  },
}
