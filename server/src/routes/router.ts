import express, { Router, Request, Response } from 'express'
import * as animalRoutes from '../routes/animal-routes'
import * as middlewares from '../routes/middlewares'
import * as userRoutes from '../routes/user-routes'
import * as communityRoutes from '../routes/community-routes'
import * as marketRoutes from '../routes/market-routes'
import * as adminRoutes from '../routes/admin-routes'
import * as reservationRoutes from "../routes/reservation-routes"
import * as locationRoutes from "../routes/location-routes"
import * as Const from '../const'
import { resolve } from 'path'

export const appRouter = Router()

// STATIC 
export const pubDir = resolve(__dirname + Const.PUBLIC_DIR)
const frontofficeDir = resolve(__dirname + Const.FRONTOFFICE_DIR)
const backofficeDir = resolve(__dirname + Const.BACKOFFICE_DIR)
const gameDir = resolve(__dirname + Const.GAME_DIR)
const pictureDir = resolve(__dirname + Const.PICTURE_DIR)

console.log('[INFO] Public dir is at ' + pubDir)
console.log('[INFO] Pictures dir is at ' + pictureDir)
console.log('[INFO] Frontoffice dir is at ' + frontofficeDir)
console.log('[INFO] Backoffice dir is at ' + backofficeDir)
console.log('[INFO] Game dir is at ' + gameDir)

appRouter.use(express.static(pubDir))
appRouter.use("/frontoffice", express.static(frontofficeDir))
appRouter.use("/game", express.static(gameDir))

appRouter.get(
  "/frontoffice/*",
  (_: Request, res: Response) => res.sendFile(`${frontofficeDir}/index.html`)
)

// appRouter.get(
//   "/game/*",
//   (_: Request, res: Response) => res.sendFile(`${gameDir}/index.html`)
// )

appRouter.use("/backoffice", express.static(backofficeDir))
appRouter.use("/pictures", express.static(pictureDir))

// REST API
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
appRouter.patch(version + '/animal/:id', middlewares.log, middlewares.verifyToken, animalRoutes.patchAnimal)

// Community
appRouter.get(version + '/community/game/', middlewares.log, communityRoutes.getGames)
appRouter.get(version + '/community/game/scoreboard', middlewares.log, communityRoutes.getScoreboard)

// Products
appRouter.get(version + '/products/', middlewares.log, marketRoutes.getProducts) //retrieve all products
appRouter.get(version + '/products/:id', middlewares.log, marketRoutes.getProduct) //search
appRouter.get(version + '/products/category/:id', middlewares.log, marketRoutes.getProductCategory) //search
appRouter.delete(version + '/products/:id', middlewares.log, marketRoutes.deleteProduct) //remove
appRouter.patch(version + '/products/:id', middlewares.log, middlewares.verifyToken, marketRoutes.patchProduct)
appRouter.post(version + '/products', middlewares.log, marketRoutes.postProduct) //insert TODO add ADMIN middleware
appRouter.get(version + '/products/:id/reviews', middlewares.log, marketRoutes.getReviews)
appRouter.post(version + '/products/:id/reviews', middlewares.log, marketRoutes.postReview)
appRouter.get(version + '/products/:id/reviews/sum-up', middlewares.log, marketRoutes.getProductSumUp)
appRouter.get(version + '/products/categories', middlewares.log, marketRoutes.getProductCategoriesName)


// Reservations
appRouter.get(version + '/users/:id/reservations', middlewares.log, middlewares.verifyToken, middlewares.verifyUser, reservationRoutes.getReservations)
appRouter.post(version + '/users/:id/reservations', middlewares.log, middlewares.verifyToken, middlewares.verifyUser, reservationRoutes.postReservation)
appRouter.delete(version + '/reservations/:id', middlewares.log, middlewares.verifyToken, middlewares.verifyUser, reservationRoutes.deleteReservation)

// Location
appRouter.get(version + '/locations', middlewares.log, locationRoutes.getLocation) 
