import { SwaggerAnimal } from './json/JsonAnimal'
import { SwaggerCart } from './json/JsonCart'
import { SwaggerCartItem } from './json/JsonCartItem'
import { SwaggerCartItemCreation } from './json/JsonCartItemCreation'
import { SwaggerLocation } from './json/JsonLocation'
import { SwaggerOrder } from './json/JsonOrder'
import { SwaggerPaymentDetails } from './json/JsonPaymentDetails'
import { SwaggerProduct } from './json/JsonProduct'
import { SwaggerReviewSumUp } from './json/JsonProductSumUp'
import { SwaggerReservation } from './json/JsonReservation'
import { SwaggerReview } from './json/JsonReview'
import { SwaggerAddress, SwaggerUser } from './json/JsonUser'
import { SwaggerAnimalPatch } from './json/patch/AnimalPatch'
import { SwaggerProductPatch } from './json/patch/ProductPatch'
import { SwaggerUserPatch } from './json/patch/UserPatch'

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
        Address: SwaggerAddress,
        Product: SwaggerProduct,
        ReviewSumUp: SwaggerReviewSumUp,
        Review: SwaggerReview,
        Cart: SwaggerCart,
        CartItem: SwaggerCartItem,
        CartItemCreation: SwaggerCartItemCreation,
        Order: SwaggerOrder,
        PaymentDetails: SwaggerPaymentDetails,
        Reservation: SwaggerReservation,
        Location: SwaggerLocation,
        UserPatch: SwaggerUserPatch,
        AnimalPatch: SwaggerAnimalPatch,
        ProductPatch: SwaggerProductPatch,
      },
    },
  },
  apis: ['src/doc/*.yml', 'src/routes/*.ts'],
}

export default swaggerOptions
