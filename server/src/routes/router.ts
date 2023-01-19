import { Router, Request, Response } from 'express'
import * as animalRoutes from '../routes/animal-routes'
import * as middlewares from '../routes/middlewares'
import * as userRoutes from '../routes/user-routes'
import * as communityRoutes from '../routes/community-routes'
import * as marketRoutes from '../routes/market-routes'
import * as adminRoutes from '../routes/admin-routes'
import * as reservationRoutes from '../routes/reservation-routes'
import * as locationRoutes from '../routes/location-routes'
import * as serviceRoutes from '../routes/service.routes'

import * as Const from '../const'

export const appRouter = Router()
const version = Const.CURR_API_VERSION

// User
appRouter.post(version + '/users/register', middlewares.log, userRoutes.registerPost)
appRouter.post(version + '/users/login', middlewares.log, userRoutes.loginPost)
appRouter.get(version + '/users', middlewares.log, userRoutes.getAllUsers)
appRouter.get(version + '/users/current', middlewares.log, middlewares.verifyToken, userRoutes.getCurrentUser)
appRouter.get(version + '/users/:id', middlewares.log, userRoutes.getUser)

appRouter.patch(
  version + '/users/:id',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.patchUser
)
appRouter.put(
  version + '/users/:id/scores',
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
  userRoutes.putInCart
)
appRouter.delete(
  version + '/users/:id/cart',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.deleteCart
)

appRouter.put(
  version + '/users/:id/picture',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  middlewares.multerMiddleware('profile'),
  userRoutes.postPicture
)

appRouter.put(
  version + 'animals/:id/picture',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  middlewares.multerMiddleware('profileAnimal'),
  userRoutes.putAnimalPicture
)
appRouter.get(
  version + '/users/:id/orders',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.getUserOrders
)

appRouter.post(
  version + '/users/:id/orders',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  userRoutes.postUserOrders
)

// Admins
appRouter.post(version + '/admins/login', middlewares.log, adminRoutes.postLogin)

// Animals
appRouter.get(version + '/animals/codes', middlewares.log, animalRoutes.getAnimalCodes)
appRouter.get(version + '/animals/:id', middlewares.log, middlewares.verifyToken, animalRoutes.getAnimalCodes)
appRouter.get(version + '/animals/:id/info', middlewares.log, middlewares.verifyToken, animalRoutes.getAnimal)
appRouter.get(version + '/users/:id/animals', middlewares.log, animalRoutes.findAnimalsUser)

appRouter.put(
  version + '/animals/:aid/edit',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  animalRoutes.updateAnimal
)
appRouter.delete(
  version + '/animals/:aid/delete',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  animalRoutes.deleteAnimal
)
appRouter.post(
  version + '/animals/:id',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  animalRoutes.postAnimal
)
appRouter.patch(version + '/animal/:id', middlewares.log, middlewares.verifyToken, animalRoutes.patchAnimal)

// Community
appRouter.get(version + '/community/games/', middlewares.log, communityRoutes.getGames)
appRouter.get(version + '/community/games/scoreboard', middlewares.log, communityRoutes.getScoreboard)

// Products
appRouter.get(version + '/products/', middlewares.log, marketRoutes.getProducts) //retrieve all products
appRouter.post(version + '/products', middlewares.log, middlewares.verifyToken, marketRoutes.postProduct) //insert
appRouter.get(version + '/products/:id', middlewares.log, marketRoutes.getProduct) //search
appRouter.delete(version + '/products/:id', middlewares.log, middlewares.verifyToken, marketRoutes.deleteProduct) //remove
appRouter.patch(version + '/products/:id', middlewares.log, middlewares.verifyToken, marketRoutes.patchProduct) //edit product
appRouter.put(version + '/products/:id/picture', middlewares.log, middlewares.verifyToken, middlewares.multerMiddleware('product'), marketRoutes.putProductPicture) //put picture
appRouter.get(version + '/products/:id/reviews', middlewares.log, marketRoutes.getReviews)
appRouter.post(version + '/products/:id/reviews', middlewares.log, marketRoutes.postReview)
appRouter.get(version + '/products/:id/reviews/sum-up', middlewares.log, marketRoutes.getProductSumUp)
// TODO fix category to categories
appRouter.get(version + '/products/categories', middlewares.log, marketRoutes.getProductCategoriesName)
appRouter.get(version + '/products/category/:id', middlewares.log, marketRoutes.getProductCategory) //search



// Reservations
appRouter.get(
  version + '/users/:id/reservations',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  reservationRoutes.getReservations
)
appRouter.post(
  version + '/users/:id/reservations',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  reservationRoutes.postReservation
)
appRouter.delete(
  version + '/reservations/:id',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  reservationRoutes.deleteReservation
)
appRouter.get(
  version + '/animals/:id/reservations',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  reservationRoutes.getAnimalReservations
)
appRouter.get(
  version + '/reservations/:id',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  reservationRoutes.getSingleReservation
)
appRouter.put(
  version + '/reservations/:id',
  middlewares.log,
  middlewares.verifyToken,
  middlewares.verifyUser,
  reservationRoutes.putReservation
)

// Location
appRouter.get(version + '/locations', middlewares.log, locationRoutes.getLocations)
appRouter.get(version + '/locations/:id', middlewares.log, locationRoutes.getLocationById)

// Service
appRouter.get(version + '/services', middlewares.log, serviceRoutes.getAllServices)
appRouter.get(version + '/services/names/:id', middlewares.log, serviceRoutes.getSingleServicesName)
