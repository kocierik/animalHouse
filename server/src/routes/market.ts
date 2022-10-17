import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../const'
import JsonError from '../json/JsonError'
import { Request, Response } from 'express'
import Product from '../entities/Product'
import { JsonProduct } from '../json/JsonProduct'

export const getProducts = async (_: Request, res: Response) => {
  return res.json(await Product.find({}))
}

export const getProduct = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (pathId) {
    // Check if a product with that id exists
    if (await Product.exists({ _id: pathId })) return res.status(STATUS_OK).json(await Product.findById(pathId))
    else return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid product id ${pathId}`))
  } else {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid product id ${pathId}`))
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  //TODO: check admin token + check input
  if (JSON.stringify(await Product.find({ _id: req.params.id })) == '[]')
    return res.status(STATUS_NOT_FOUND).json(new JsonError(`${req.params.it} is not a valid product id`))
  Product.deleteOne({ _id: req.params.id }, function() {
    return res.status(STATUS_OK).send('product removed successfully')
  })
}

export const postProduct = async (req: Request, res: Response) => {
  //TODO: check admin token + check input

  let productCreation = req.body as JsonProduct
  const product = new Product()

  product.name = productCreation.name
  product.price = productCreation.price
  product.categoryId = productCreation.categoryId
  product.description = productCreation.description
  product.animalTargets = productCreation.animalTargets
  product.images = [productCreation.image] // TODO multiple images
  product.colors = productCreation.colors
  product.sizes = productCreation.sizes
  product.types = productCreation.types
  product.details = productCreation.details
  console.log(product)
  await product.save()
  return res.status(STATUS_OK).json(product)
}
