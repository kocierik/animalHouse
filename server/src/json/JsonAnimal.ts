export interface JsonAnimal {
  _id: string
  name: string
  age: number
  type: string
  userId: string
}

export const SwaggerAnimal = {
  type: "object",
  properties: {
    _id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    type: {
      type: "string"
    },
    userId: {
      type: "string"
    },
    age: {
      type: "number"
    }
  }
}
