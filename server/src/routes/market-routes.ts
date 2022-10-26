import { Request, Response } from 'express'
import { JsonProduct } from '../json/JsonProduct'
import JsonError from '../json/JsonError'
import * as Const from '../const'
import * as ProductService from '../services/product-service'
import { JsonReview } from '../json/JsonReview'

export const getProducts = async (_: Request, res: Response) =>
  res.json(await ProductService.findAllProduct())

export const getProduct = async (req: Request, res: Response) =>
  res.status(Const.STATUS_OK).json(await ProductService.findProductByid(req.params.id))

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    /* check if it exists */
    await ProductService.findProductByid(req.params.id)
    await ProductService.deleteProduct(req.params.id)
    return res.status(Const.STATUS_OK)
  } catch (err) {
    if (err instanceof JsonError)
      return res.status(Const.STATUS_NOT_FOUND).json(err)
    else
      return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`${req.params.it} is not a valid product id`));
  }
}

export const postProduct = async (req: Request, res: Response) => {
  //TODO: check admin token + check input
  let productCreation = req.body as JsonProduct;
  return res.status(Const.STATUS_OK).json(await ProductService.createProduct(productCreation))
}

export const getReviews = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (pathId) {
    // Check existing review
    return res.status(Const.STATUS_OK).json(await ProductService.reviewById(pathId))
  } else {
    return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(`Url Product id doesn't exist ${pathId}`))
  }
}

export const postReview = async (req: Request, res: Response) => {
  try {
    
    const pathId = req.params.id
    const reviewCreation = req.body as JsonReview
    
    // Check existing product
    if (pathId) {
      if(!reviewCreation.star)
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




