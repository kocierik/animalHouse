import * as JsonAnimal from "./JsonAnimal"


export interface JsonUserCreation {
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
  country: string
  city: string
  street: string
  zip: number
}

export interface JsonUser {
  _id: string,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  animals: JsonAnimal.JsonAnimal[],
  address: JsonAddress
}

export interface JsonAddress {
  country: string,
  city: string
  street: string
  zip: number
}

export interface JsonLogin {
  username: string
  password: string
}

export const SwaggerUser = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64"
    },
    username: {
      type: "string"
    },
    firstName: {
      type: "string"
    },
    lastName: {
      type: "string"
    },
    email: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    pets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "integer"
          },
          name: {
            type: "string"
          }
        }
      }
    },
    address: {
      type: "object",
      properties: {
        country: {
          type: "string"
        },
        city: {
          type: "string"
        },
        street: {
          type: "string"
        },
        cap: {
          type: "integer"
        }
      }
    }
  }
}
