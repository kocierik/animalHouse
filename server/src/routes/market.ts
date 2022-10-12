import { Request, Response } from 'express'
import Product from '../entities/Product'

export const getProducts = async (_: Request, res: Response) => {
  return res.json(await Product.find({}))
}
