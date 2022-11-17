export interface JsonProduct {
  name: string
  price: number
  categoryId: string
  description: string
  animalTargets: string[]
  image?: JsonPicture
  colors?: string[]
  sizes?: string[]
  types?: string[]
  details?: string
}

export interface JsonPicture {
  size: number
  filename: string
  mimetype: string
}

export const SwaggerProduct = {
  Product: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
      categoryId: {
        type: 'string',
      },
      image: {
        type: 'object',
        properties: {
          size: {
            type: 'integer',
          },
          filename: {
            type: 'string',
          },
          mimetype: {
            type: 'string',
          },
        },
      },
      animalTargets: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      colors: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      sizes: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      details: {
        type: 'string',
      },
    },
  },
}
