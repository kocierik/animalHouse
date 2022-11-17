import { Router, Request, Response } from 'express'
import * as animalRoutes from '../routes/animal-routes'
import * as middlewares from '../routes/middlewares'
import * as userRoutes from '../routes/user-routes'
import * as communityRoutes from '../routes/community-routes'
import * as marketRoutes from '../routes/market-routes'
import * as adminRoutes from '../routes/admin-routes'
import * as Const from '../const'

export const appRouter = Router()
const version = Const.CURR_API_VERSION

// User
appRouter.post(version + '/users/register', middlewares.log, userRoutes.registerPost)
appRouter.post(version + '/users/login', middlewares.log, userRoutes.loginPost)
appRouter.get(version + '/users', middlewares.log, userRoutes.getAllUsers)
appRouter.get(version + '/users/current', middlewares.log, middlewares.verifyToken, userRoutes.getCurrentUser)
appRouter.get(version + '/users/:id', middlewares.log, userRoutes.getUser)
appRouter.put(
  version + '/users/:id/score',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.putScore
)
appRouter.get(
  version + '/users/:id/score/',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.getScore
)
appRouter.get(
  version + '/users/:id/cart',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.getCart
)
appRouter.put(
  version + '/users/:id/cart',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.putCart
)
appRouter.delete(
  version + '/users/:id/allCart',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.resetCart
)
appRouter.delete(
  version + '/users/:id/products/:pid/cart',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.deleteCart
)
appRouter.put(
  version + '/users/:id/animals',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.putAnimal
)
appRouter.put(
  version + '/users/:id/description',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.updateUserDescription
)
appRouter.put(
  version + '/users/:id/picture',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  middlewares.multerMiddleware('profile'),
  userRoutes.putPicture
)
appRouter.put(
  version + '/users/:id/animals',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.putAnimal
)
appRouter.delete(
  version + '/users/:uid/animals/:aid',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.deleteAnimal
)
appRouter.put(
  version + '/users/:uid/animals/:aid',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.updateAnimal
)
appRouter.put(
  version + '/users/:uid/animals/:id/picture',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  middlewares.multerMiddleware('profileAnimal'),
  userRoutes.putAnimalPicture
)

// Admins
appRouter.post(version + '/admins/login', middlewares.log, adminRoutes.postLogin)

// Animals
appRouter.get(version + '/animals/codes', middlewares.log, animalRoutes.getAnimalCodes)
appRouter.get(version + '/animals/:id', middlewares.log, middlewares.verifyToken, animalRoutes.getAnimalCodes)

// Community
appRouter.get(version + '/community/game/', middlewares.log, communityRoutes.getGames)
appRouter.get(version + '/community/game/scoreboard', middlewares.log, communityRoutes.getScoreboard)

// Products
appRouter.get(version + '/products/', middlewares.log, marketRoutes.getProducts) //retrieve all products
appRouter.get(version + '/products/:id', middlewares.log, marketRoutes.getProduct) //search
appRouter.delete(version + '/products/:id', middlewares.log, marketRoutes.deleteProduct) //remove
appRouter.post(version + '/products', middlewares.log, marketRoutes.postProduct) //insert
appRouter.get(version + '/products/:id/reviews', middlewares.log, marketRoutes.getReviews)
appRouter.post(version + '/products/:id/reviews', middlewares.log, marketRoutes.postReview)
appRouter.get(version + '/products/:id/reviews/sum-up', middlewares.log, marketRoutes.getProductSumUp)
