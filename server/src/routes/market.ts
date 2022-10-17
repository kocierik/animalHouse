import { Request, Response } from 'express'
import Product from '../entities/Product'
import { JsonProduct } from '../json/JsonProduct'
import JsonError from '../json/JsonError'
import { STATUS_OK, STATUS_NOT_FOUND } from '../const'

export const getProducts = async (_: Request, res: Response) => {
  return res.json(await Product.find({}))
}

export const getProduct = async (req: Request, res: Response) => {
  let query = { _id: req.params.id };
  return res.status(STATUS_OK).json(await Product.find(query));
}

export const deleteProduct = async (req: Request, res: Response) => {
  //TODO: check admin token + check input
  if (JSON.stringify((await Product.find({ _id: req.params.id }))) == "[]")
    return res.status(STATUS_NOT_FOUND).json(new JsonError(`${req.params.it} is not a valid product id`));
  Product.deleteOne({ _id: req.params.id }, function() {
    return res.status(STATUS_OK).send('product removed successfully');
  });
}

export const postProduct = async (req: Request, res: Response) => {
  //TODO: check admin token + check input

  let productCreation = req.body as JsonProduct;
  const product = new Product();


  product.name = productCreation.name;
  product.price = productCreation.price;
  product.categoryId = productCreation.categoryId;
  product.description = productCreation.description;
  product.animalTargets = productCreation.animalTargets;
  product.image = productCreation.image;
  product.colors = productCreation.colors;
  product.sizes = productCreation.sizes;
  product.types = productCreation.types;
  product.details = productCreation.details;
  console.log(product);
  await product.save();
  return res.status(STATUS_OK).json((product));
}

