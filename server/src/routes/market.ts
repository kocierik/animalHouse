import { STATUS_OK, STATUS_BAD_REQUEST } from '../const';
import JsonError from '../json/JsonError'
import { Request, Response } from 'express'
import Product from '../entities/Product'

export const getProducts = async (_: Request, res: Response) => {
  return res.json(await Product.find({}))
}

export const getProduct = async (req: Request, res: Response) => {
  const pathId = req.params.id
    if (pathId) {
      // Check if a product with that id exists
      if (await Product.exists({ _id: pathId }))
        return res.status(STATUS_OK).json(await Product.findById( pathId ))
      else return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid product id ${pathId}`))
    } else {
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid product id ${pathId}`))
    }
}