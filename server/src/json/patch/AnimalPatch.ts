export interface AnimalPatch {
  name?: string
  age?: number
  type?: string
}

export const SwaggerAnimalPatch = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true,
    },
    type: {
      type: 'string',
      nullable: true,
    },
    age: {
      type: 'number',
      nullable: true,
    },
  },
}
