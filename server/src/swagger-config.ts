import { SwaggerAnimal } from './json/JsonAnimal'
import { SwaggerCart } from './json/JsonCart'
import { SwaggerCartItem } from './json/JsonCartItem'
import { SwaggerCartItemCreation } from './json/JsonCartItemCreation'
import { SwaggerForum } from './json/JsonForum'
import { SwaggerLocation, SwaggerLocationCreation } from './json/JsonLocation'
import { SwaggerOrder } from './json/JsonOrder'
import { SwaggerPaymentDetails } from './json/JsonPaymentDetails'
import { SwaggerPost, SwaggerPostCreation } from './json/JsonPost'
import { SwaggerProduct } from './json/JsonProduct'
import { SwaggerReviewSumUp } from './json/JsonProductSumUp'
import { SwaggerReservation } from './json/JsonReservation'
import { SwaggerReview } from './json/JsonReview'
import { SwaggerAddress, SwaggerUser } from './json/JsonUser'
import { SwaggerAnimalPatch } from './json/patch/AnimalPatch'
import { SwaggerLocationPatch } from './json/patch/LocationPatch'
import { SwaggerProductPatch } from './json/patch/ProductPatch'
import { SwaggerUserPatch } from './json/patch/UserPatch'

const swaggerOptions = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Animal House',
      version: '2.0.0',
      description: 'Animal houz back& api'
    },
    host: 'localhost:8080',
    basePath: '/api/v2',
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization'
      }
    },
    definitions: {
      User: SwaggerUser,
      UserPatch: SwaggerUserPatch,
      Animal: SwaggerAnimal,
      AnimalPatch: SwaggerAnimalPatch,
      Address: SwaggerAddress,
      Product: SwaggerProduct,
      ProductPatch: SwaggerProductPatch,
      ReviewSumUp: SwaggerReviewSumUp,
      Review: SwaggerReview,
      Cart: SwaggerCart,
      CartItem: SwaggerCartItem,
      CartItemCreation: SwaggerCartItemCreation,
      Order: SwaggerOrder,
      PaymentDetails: SwaggerPaymentDetails,
      Reservation: SwaggerReservation,
      Location: SwaggerLocation,
      LocationPatch: SwaggerLocationPatch,
      LocationCreation: SwaggerLocationCreation,
      Forum: SwaggerForum,
      Post: SwaggerPost,
      PostCreation: SwaggerPostCreation,
    },
    components: {
      tags: [
        { name: 'users' },
        { name: 'products' },
        { name: 'community' },
        { name: 'animals' },
        { name: 'reservations' },
        { name: 'locations' }
      ]
    }
  },
  // TODO questo è un accrocchio
  apis: ['src/doc/*.yml', 'server/src/routes/*.ts']
}

export default swaggerOptions
