import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../const'
import JsonError from '../json/JsonError'
import { Request, Response } from 'express'
import Product from '../entities/Product'
import { JsonProduct } from '../json/JsonProduct'
import Review from '../entities/Review'
import JsonProductSumUp from '../json/JsonProductSumUp'

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

export const getProductSumUp = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ productId: req.path.id })
    const avg = reviews.map(x => x.star).reduce((old, curr) => old + curr, 0) / reviews.length
    const percentages = [1, 2, 3, 4, 5].map(y => reviews.filter(x => x.star == y).length / reviews.length * 100)

    const result: JsonProductSumUp = {
      average: avg,
      total: reviews.length,
      percentage: percentages.map(x => `${x}%`)
    }
    return res.status(STATUS_OK).json(result)
  } catch (err) {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(err.message))
  }

}

