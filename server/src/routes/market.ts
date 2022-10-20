import { Request, Response } from 'express'
import { JsonProduct } from '../json/JsonProduct'
import JsonError from '../json/JsonError'
import * as Const from '../const'
import * as ProductService from '../services/productService'

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

