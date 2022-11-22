import { SwaggerAnimal } from './json/JsonAnimal'
import { SwaggerCart } from './json/JsonCart'
import { SwaggerProduct } from './json/JsonProduct'
import { SwaggerCartItem} from './json/JsonCartItem'
import { SwaggerReviewSumUp } from './json/JsonProductSumUp'
import { SwaggerReview } from './json/JsonReview'
import { SwaggerUser } from './json/JsonUser'
import { SwaggerCartItemCreation } from './json/JsonCartItemCreation'

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
      tags: [{ name: 'users' }, { name: 'products' }, { name: 'community' }, { name: 'animals' }],
      schemas: {
        User: SwaggerUser,
        Animal: SwaggerAnimal,
        Product: SwaggerProduct,
        ReviewSumUp: SwaggerReviewSumUp,
        Review: SwaggerReview,
        Cart: SwaggerCart,
        CartItem: SwaggerCartItem,
        CartItemCreation: SwaggerCartItemCreation,
      },
    },
  },
  apis: ['src/routes/*.ts'],
}

export default swaggerOptions
