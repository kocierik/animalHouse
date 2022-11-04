import { SwaggerReviewSumUp } from "./json/JsonProductSumUp";

const swaggerOptions = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Animal House',
      version: '2.0.0',
      description: 'Animal houz back& api'
    },
    host: "localhost:8080",
    basePath: "/v1",
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "authorization",
      }
    },
    components: {
      tags: [
        { name: "users" },
        { name: "products" },
        { name: "community" },
        { name: "animals" },
      ],
      schemas: {
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "username": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "pets": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  }
                }
              }
            },
            "address": {
              "type": "object",
              "properties": {
                "country": {
                  "type": "string"
                },
                "city": {
                  "type": "string"
                },
                "street": {
                  "type": "string"
                },
                "cap": {
                  "type": "integer"
                }
              }
            }
          }
        },
        "Animal": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "userId": {
              "type": "string"
            },
            "age": {
              "type": "number"
            }
          }
        },
        "Product": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "categoryId": {
              "type": "string"
            },
            "image": {
              "type": "string"
            },
            "animalTargets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "colors": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "sizes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "details": {
              "type": "string"
            }
          }
        },
        "ProductInstance": {
          "type": "object",
          "required": [
            "productId"
          ],
          "properties": {
            "productId": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "size": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          }
        },
        "Review": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "productId": {
              "type": "string"
            },
            "comment": {
              "type": "string"
            },
            "star": {
              "type": "number"
            },
            "date": {
              "type": "string"
            }
          }
        },
        ReviewSumUp: SwaggerReviewSumUp
      }
    }
  },
  apis: ['src/routes/*.ts'],
};

export default swaggerOptions
