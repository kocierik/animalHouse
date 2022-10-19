import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../const'
import JsonError from '../json/JsonError'
import { Request, Response } from 'express'
import Product from '../entities/Product'
import { JsonReview } from '../json/JsonReview'


export const getReviews = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (pathId) {
    // Check if a product with that id exists
    if (await Product.exists({ _id: pathId })) return res.status(STATUS_OK).json(await Product.findById(pathId))
    else return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid product id ${pathId}`))
  } else {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid product id ${pathId}`))
  }
}