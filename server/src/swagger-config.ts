import { SwaggerAnimal } from './json/JsonAnimal'
import { SwaggerLocation } from './json/JsonLocation'
import { SwaggerUserPatch } from './json/patch/UserPatch'
import { SwaggerProduct } from './json/JsonProduct'
import { SwaggerReviewSumUp } from './json/JsonProductSumUp'
import { SwaggerReservation } from './json/JsonReservation'
import { SwaggerReview } from './json/JsonReview'
import { SwaggerUser } from './json/JsonUser'
import { SwaggerAnimalPatch } from './json/patch/AnimalPatch'
import { SwaggerProductPatch } from './json/patch/ProductPatch'

const swaggerOptions = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Animal House',
      version: '2.0.0',
      description: 'Animal houz back& api',
    },
    host: 'localhost:8080',
    basePath: '/v1',
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
    components: {
      tags: [{ name: 'users' }, { name: 'products' }, { name: 'community' }, { name: 'animals' }, { name: 'reservations'}, {name: 'locations'}],
      schemas: {
        User: SwaggerUser,
        Animal: SwaggerAnimal,
        Product: SwaggerProduct,
        ReviewSumUp: SwaggerReviewSumUp,
        Review: SwaggerReview,
        Reservation: SwaggerReservation,
        Location: SwaggerLocation,
        UserPatch: SwaggerUserPatch,
        AnimalPatch: SwaggerAnimalPatch,
        ProductPatch: SwaggerProductPatch,
        ProductInstance: {
          type: 'object',
          required: ['productId'],
          properties: {
            productId: {
              type: 'string',
            },
            color: {
              type: 'string',
            },
            size: {
              type: 'string',
            },
            type: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['src/doc/*.yml', 'src/routes/*.ts'],
}

export default swaggerOptions
