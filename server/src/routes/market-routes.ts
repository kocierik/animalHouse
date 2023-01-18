import { Request, Response } from 'express'
import { JsonProduct } from '../json/JsonProduct'
import JsonError from '../json/JsonError'
import * as Const from '../const'
import * as ProductService from '../services/product-service'
import { JsonReview } from '../json/JsonReview'
import { ProductPatch } from '@/json/patch/ProductPatch'

/**
 * @swagger
 *  /products:
 *    get:
 *        tags:
 *        - products
 *        summary: Retrieve all products
 *        responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Product"
 * */
export const getProducts = async (_: Request, res: Response) => res.json(await ProductService.findAllProduct())

/**
 * @swagger
 *
 *  {
 *     "/products/{id}": {
 *      get : {
 *        tags: [ products ],
 *        summary : Searches the specified product,
 *        parameters : [{
 *            in: path,
 *            name: id,
 *            type: string,
 *            required: true,
 *            description: Id of the product to be searched
 *          }],
 *        responses: {
 *          200: {
 *            description: successful operation,
 *            schema: {
 *              type: array,
 *              items: {
 *                $ref: "#/components/schemas/Product"
 *               }
 *             }
 *           }
 *         }
 *      }
 *     }
 *  }
 * */
export const getProduct = async (req: Request, res: Response) =>
  res.status(Const.STATUS_OK).json(await ProductService.findProductByid(req.params.id))

/**
 * @swagger
 *   /products/{id}: {
 *    delete: {
 *      tags: [products],
 *      summary: Deletes a product based on the received id,
 *      parameters: [
 *       {
 *        in: path,
 *        name: id,
 *        type: string,
 *        required: true,
 *        description: Id of the product to be deleted
 *        }
 *       ],
 *      responses: {
 *        200: {
 *          description: successful operation
 *          }
 *        }
 *     }
 *   }
 * */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    /* check if it exists */
    await ProductService.findProductByid(req.params.id)
    await ProductService.deleteProduct(req.params.id)
    return res.status(Const.STATUS_OK)
  } catch (err) {
    if (err instanceof JsonError) return res.status(Const.STATUS_NOT_FOUND).json(err)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`${req.params.it} is not a valid product id`))
  }
}
/**
 * @swagger
 *   /products/{id}: {
 *    patch: {
 *     tags: [ products ],
 *     summary: Modify a product based on the received id,
 *     parameters: [
 *       {
 *         in : path,
 *        name: id,
 *        type: string,
 *        required: true,
 *        description: Id of the product to be deleted
 *       },
 *       {
 *         in: body,
 *        schema: {
 *          $ref: "#/components/schemas/ProductPatch"
 *         }
 *       }
 *     ],
 *      responses: {
 *        200: {
 *          description: successful operation
 *       }
 *      }
 *     }
 *   }
 * */
export const patchProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body as ProductPatch
    return res.status(Const.STATUS_OK).json(ProductService.patchProduct(id, body))
  } catch (err) {
    if (err instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(err)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}

/**
 * @swagger
 *  /products:
 *    post:
 *        tags:
 *        - products
 *        summary: Creates a new product
 *        parameters:
 *          - in: body
 *            name: body
 *            description: UserCreation
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  email:
 *                    type: string
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *        responses:
 *          200:
 *            description: Success
 *
 * */
 /* TODO levare user creation*/
export const postProduct = async (req: Request, res: Response) => {
  //TODO: check admin token + check input
  let productCreation = req.body as JsonProduct
  return res.status(Const.STATUS_OK).json(await ProductService.createProduct(productCreation))
}

/**
 * @swagger
 *  /products/{id}/reviews:
 *    get:
 *        tags:
 *        - products
 *        summary: Retrive reviews about a product
 *        parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id of the product to be searched
 *        responses:
 *          200:
 *            description: successful operation
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Review"
 * */
export const getReviews = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (pathId) {
    // Check existing review
    return res.status(Const.STATUS_OK).json(await ProductService.reviewById(pathId))
  } else {
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Url Product id doesn't exist ${pathId}`))
  }
}

/**
 * @swagger
 *  /products/{id}/reviews:
 *    post:
 *      tags:
 *      - products
 *      summary: Create a review
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id of the product to be searched
 *      - in: body
 *        name: body
 *        description: ReviewCreation
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              username:
 *                type: string
 *              productId:
 *                type: string
 *              comment:
 *                type: string
 *              star:
 *                type: number
 *              date:
 *                type: string
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            $ref: "#/components/schemas/Review"
 * */
export const postReview = async (req: Request, res: Response) => {
  try {
    const pathId = req.params.id
    const reviewCreation = req.body as JsonReview

    // Check existing product
    if (pathId) {
      if (!reviewCreation.star)
        return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`insert a valid number of star`))

      const data = await ProductService.createReview(reviewCreation)
      return res.status(Const.STATUS_OK).json(data)
    } else {
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Url Product id doesn't exist ${pathId}`))
    }
  } catch (error) {
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(error.message))
  }
}

/**
 * @swagger
 *  /products/{id}/reviews/sum-up:
 *    post:
 *      tags:
 *      - products
 *      summary: Get the sum up of the product reviews
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id of the product
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            $ref: "#/components/schemas/ReviewSumUp"
 * */
export const getProductSumUp = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await ProductService.getProductReviewSumUp(req.path.id))
  } catch (err) {
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}



/**
 * @swagger
 *  /products/category/{id}:
 *    get:
 *      tags:
 *      - products
 *      summary: Get the product category
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id of the category product
 *      responses:
 *        200:
 *          description: Success
 * */
export const getProductCategory = async (req: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await ProductService.getProductCategory(req.params.id))
  } catch (err) {
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}


/**
 * @swagger
 *  /products/categories:
 *    get:
 *      tags:
 *      - products
 *      summary: Get all the product categories
 *      responses:
 *        200:
 *          description: Success
 * */
export const getProductCategoriesName = async (_: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await ProductService.getProductCategoriesName())
  } catch (err) {
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }
}