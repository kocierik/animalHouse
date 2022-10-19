import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../const'
import JsonError from '../json/JsonError'
import { Request, Response } from 'express'
import Product from '../entities/Product'
import { JsonReview } from '../json/JsonReview'
import Review from '../entities/Review'


export const getReviews = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (pathId) {
    // Check existing review
    if(res.status(STATUS_OK).json(await Review.find({productId: pathId}))){
      return res.status(STATUS_OK).json(await Review.find({productId: pathId}))
    } else return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid  product id ${pathId}`))
  } else {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Product id doesn't exist ${pathId}`))
  }
}